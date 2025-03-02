import type { ForecastData } from "../api/types";

interface WeatherForecastProps {
  data: ForecastData;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  return <div>{data.city.country}</div>;
};

export default WeatherForecast;
