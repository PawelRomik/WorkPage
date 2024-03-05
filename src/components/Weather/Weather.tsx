import { useEffect, useState, useMemo } from "react";
import weatherIcons from "../../data/weatherIcons";
import "./Weather.style.scss";
import { toast } from "react-toastify";
import LocalStorageNames from "../../utils/localstorageNames";
import { useTranslation } from "react-i18next";

interface WeatherData {
	temp: number;
	icon: keyof typeof weatherIcons | "";
}

const Weather = () => {
	const { localWeatherData, localWeatherLastFetchTime } = useMemo(() => LocalStorageNames, []);
	const { t } = useTranslation();
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
						toast.warn(t("Weather.weatherFetchLocalizationError"));
						return;
					}

					const apiKey = import.meta.env.VITE_WEATHER_API;
					if (!apiKey) {
						toast.warn(t("Weather.weatherNoApiKey"));
						return;
					}

					const response = await fetch(
						`${import.meta.env.VITE_WEATHER_API_URL}VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
					);

					if (!response.ok) {
						toast.error(t("Weather.weatherFetchWeatherError"));
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

		fetchWeather();
		const intervalId = setInterval(fetchWeather, fetchInterval);
		return () => clearInterval(intervalId);
	}, [localWeatherData, localWeatherLastFetchTime, t]);

	if (!data.icon) {
		return null;
	}

	return (
		<div className='weather'>
			<img src={weatherIcons[data.icon]} className='weatherIcon' alt={`Weather Icon - ${data.icon}`} />
			<p>{data.temp} &#8451;</p>
		</div>
	);
};

export default Weather;
