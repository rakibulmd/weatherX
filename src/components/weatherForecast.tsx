import { format } from "date-fns";
import type { ForecastData, WeatherConditions } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface dailyForecast {
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: WeatherConditions;
  date: number;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "dd-MM-yyyy");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      if (forecast.main.temp_min < acc[date].temp_min) {
        acc[date].temp_min = forecast.main.temp_min;
      }
      if (forecast.main.temp_max > acc[date].temp_max) {
        acc[date].temp_max = forecast.main.temp_max;
      }
    }
    return acc;
  }, {} as Record<string, dailyForecast>);
  const daysForecast = Object.values(dailyForecast).slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-days Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {daysForecast.map((day) => (
            <div key={day.date} className="grid grid-cols-3 gap-4 rounded-lg border p-4">
              <div className="">
                <p>{format(new Date(day.date * 1000), "EEE, MMM, d")}</p>
                <p className="text-muted-foreground capitalize text-sm">
                  {day.weather.description}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="h-4 w-4 mr-1"></ArrowDown>
                  {day.temp_min.toFixed(0)}°C
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="h-4 w-4 mr-1"></ArrowUp>
                  {day.temp_max.toFixed(0)}°C
                </span>
              </div>
              <div className="flex justify-end gap-4">
                <span className="flex items-center">
                  <Droplets className="h-4 w-4 mr-1 text-blue-500"></Droplets>
                  {day.humidity}%
                </span>
                <span className="flex items-center">
                  <Wind className="h-4 w-4 mr-1 text-blue-500"></Wind>
                  {day.wind} m/s
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
