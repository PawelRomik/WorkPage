import { useEffect, useState } from "react";
import weatherIcons from "../../data/weatherIcons";
import { weatherStyles } from "./Weather.styles";
import LocalStorageNames from "../../utils/localstorageNames";
import { useTranslation } from "react-i18next";
import { launchToast } from "../../utils/toastFunction";

type WeatherData = {
	temp: number;
	icon: keyof typeof weatherIcons | "";
};

const { localWeatherData, localWeatherLastFetchTime } = LocalStorageNames;

const Weather = () => {
	const { t } = useTranslation();
	const [error, changeError] = useState(0);
	const [data, setData] = useState<WeatherData>({
		temp: 0,
		icon: "",
	});

	const fetchLocation = async () => {
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
	};

	useEffect(() => {
		const fetchInterval = 3600000;
		const fetchWeather = async () => {
			try {
				const lastFetchTime = localStorage.getItem(localWeatherLastFetchTime);
				const currentTime = new Date().getTime();

				if (!lastFetchTime || currentTime - parseInt(lastFetchTime) >= fetchInterval) {
					const location = await fetchLocation();
					if (!location) {
						changeError(1);
						launchToast("error", t("Weather.weatherFetchLocalizationError"));
						return;
					}

					const apiKey = import.meta.env.VITE_WEATHER_API;
					if (!apiKey) {
						changeError(1);
						launchToast("error", t("Weather.weatherNoApiKey"));
						return;
					}

					const response = await fetch(
						`${import.meta.env.VITE_WEATHER_API_URL}VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
					);

					if (!response.ok) {
						changeError(1);
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
		};
		if (error === 0) {
			fetchWeather();
		}

		const intervalId = setInterval(fetchWeather, fetchInterval);
		return () => clearInterval(intervalId);
	}, [t, error]);

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

export default Weather;
