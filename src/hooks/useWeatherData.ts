import { useState, useEffect, useCallback } from "react";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainProbability: number;
  feelsLike: number;
  location: string;
  description: string;
}

interface CityCoordinates {
  lat: number;
  lon: number;
}

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
  rain?: {
    "1h"?: number;
  };
  clouds: {
    all: number;
  };
}

const useWeatherData = (
  city: string = "Palembang",
  coordinates?: CityCoordinates
) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("API key not found");
      }

      // Current weather API call - use coordinates if available, otherwise use city name
      let apiUrl;
      if (coordinates) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
      } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},ID&appid=${apiKey}&units=metric`;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data: OpenWeatherResponse = await response.json();

      // Calculate rain probability based on clouds and weather conditions
      let rainProbability = 0;
      const cloudsPercentage = data.clouds.all;
      const weatherMain = data.weather[0].main.toLowerCase();

      if (weatherMain.includes("rain")) {
        rainProbability = Math.min(85 + cloudsPercentage * 0.15, 95);
      } else if (weatherMain.includes("cloud")) {
        rainProbability = Math.min(30 + cloudsPercentage * 0.5, 75);
      } else if (weatherMain.includes("drizzle")) {
        rainProbability = Math.min(60 + cloudsPercentage * 0.25, 80);
      } else {
        rainProbability = Math.max(10, cloudsPercentage * 0.3);
      }

      const weatherInfo: WeatherData = {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        rainProbability: Math.round(rainProbability),
        feelsLike: Math.round(data.main.feels_like),
        location: data.name,
        description: data.weather[0].description,
      };

      setWeatherData(weatherInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Weather API Error:", err);

      // Fallback data in case of error
      setWeatherData({
        temperature: 28,
        humidity: 85,
        rainProbability: 75,
        feelsLike: 30,
        location: "Palembang",
        description: "Data tidak tersedia",
      });
    } finally {
      setLoading(false);
    }
  }, [city, coordinates]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return { weatherData, loading, error, refetch: fetchWeatherData };
};

export default useWeatherData;
