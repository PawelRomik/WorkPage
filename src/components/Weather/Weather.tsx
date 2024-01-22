import { useEffect, useState } from "react";
import weatherIcons from "../../data/weatherIcons";
import "./Weather.style.scss";

interface WeatherData {
	temp: number;
	icon: keyof typeof weatherIcons | "";
}

const Weather = () => {
	const [data, setData] = useState<WeatherData>({ temp: 0, icon: "" });

	const fetchLocation = async () => {
		try {
			const locationResponse = await fetch("https://json.geoiplookup.io/");
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
		const fetchWeather = async () => {
			try {
				const location = await fetchLocation();

				const apiKey = import.meta.env.VITE_WEATHER_API;
				const response = await fetch(
					`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
				);

				if (!response.ok) {
					throw new Error("Failed to fetch weather api");
				}

				const result = await response.json();

				const currentHour = new Date().getHours();
				const currentHourData = result.days[0].hours[currentHour];

				const modifiedData = {
					temp: currentHourData.temp,
					icon: currentHourData.icon,
				};

				setData(modifiedData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchWeather();
		const intervalId = setInterval(fetchWeather, 3600000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		data.icon && (
			<div className='weather'>
				<img src={weatherIcons[data.icon]} className='weatherIcon' alt={`Weather Icon - ${data.icon}`} />
				<p>{data.temp} &#8451;</p>
			</div>
		)
	);
};

export default Weather;
