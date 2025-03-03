import { useQuery } from "@tanstack/react-query";
import { Coordinates } from "../api/types";
import { weatherAPI } from "../api/weather";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  geoCode: (coords: Coordinates) => ["geoCode", coords] as const,
  locationSearch: (query: string) => ["locationSearch", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getCurrentWeather(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useReverseGeoCodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.geoCode(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.reverseGeocode(coordinates) : null),
    enabled: !!coordinates,
  });
}
export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.locationSearch(query),
    queryFn: () => weatherAPI.searchCity(query),
    enabled: query.length >= 3,
  });
}
