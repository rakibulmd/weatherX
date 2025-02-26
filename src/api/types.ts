export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherConditions {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface WeatherData {
  coord: Coordinates;
  weather: WeatherConditions[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: WeatherData["main"];
    weather: WeatherData["weather"];
    clouds: { all: number };
    wind: { speed: number; deg: number };
    visibility: number;
    pop: number;
    sys: { pod: string };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface GeocodingResponse {
  name: string;
  country: string;
  state?: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
}
