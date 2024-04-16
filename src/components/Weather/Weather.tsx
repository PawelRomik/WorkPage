import { useCallback, useEffect, useState } from "react";
import { weatherIcons } from "../../data/weatherIcons";
import { weatherStyles } from "./Weather.styles";
import { LocalStorageNames } from "../../utils/localstorageNames";
import { useTranslation } from "react-i18next";
import { launchToast } from "../../utils/toastFunction";

type WeatherData = {
	temp: number;
	icon: keyof typeof weatherIcons | "";
};
const fetchInterval = 3600000;
const { localWeatherData, localWeatherLastFetchTime } = LocalStorageNames;

export const Weather = () => {
	const { t } = useTranslation();
	const [error, setError] = useState(0);
	const [data, setData] = useState<WeatherData>({
		temp: 0,
		icon: "",
	});

	const fetchLocation = useCallback(async () => {
		try {
			const locationResponse = await fetch(import.meta.env.VITE_GEOLOCATION_API_URL);
			if (!locationResponse.ok) {
				throw new Error("Failed to fetch location");
			}

			const locationResult = await locationResponse.json();
			return locationResult.country_name;
		} catch (error) {
			console.error(error);
		}
	}, []);
	const fetchWeather = useCallback(async () => {
		try {
			const lastFetchTime = localStorage.getItem(localWeatherLastFetchTime);
			const currentTime = new Date().getTime();

			if (!lastFetchTime || currentTime - parseInt(lastFetchTime) >= fetchInterval) {
				const location = await fetchLocation();
				if (!location) {
					setError(1);
					launchToast("error", t("Weather.weatherFetchLocalizationError"));
					return;
				}

				const apiKey = import.meta.env.VITE_WEATHER_API;
				if (!apiKey) {
					setError(1);
					launchToast("error", t("Weather.weatherNoApiKey"));
					return;
				}

				const response = await fetch(
					`${import.meta.env.VITE_WEATHER_API_URL}/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
				);

				if (!response.ok) {
					setError(1);
					launchToast("error", t("Weather.weatherFetchWeatherError"));
					return;
				}

				const result = await response.json();

				const currentHour = new Date().getHours();
				const currentHourData = result.days[0].hours[currentHour];

				const modifiedData = {
					temp: currentHourData.temp,
					icon: currentHourData.icon,
				};

				setData(modifiedData);
				localStorage.setItem(localWeatherLastFetchTime, currentTime.toString());
				localStorage.setItem(localWeatherData, JSON.stringify(modifiedData));
			} else {
				const storedData = localStorage.getItem(localWeatherData);
				if (storedData) {
					setData(JSON.parse(storedData));
				}
			}
		} catch (error) {
			console.error(error);
		}
	}, [fetchLocation, t]);

	useEffect(() => {
		if (error === 0) {
			fetchWeather();
		}

		const intervalId = setInterval(fetchWeather, fetchInterval);
		return () => clearInterval(intervalId);
	}, [error, fetchWeather]);

	if (!data.icon) {
		return null;
	}

	return (
		<div className='weather' css={weatherStyles}>
			<img src={weatherIcons[data.icon]} className='weatherIcon' alt={`Weather Icon - ${data.icon}`} />
			<p>{data.temp} &#8451;</p>
		</div>
	);
};
