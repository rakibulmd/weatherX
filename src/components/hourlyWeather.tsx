import { format } from "date-fns";
import type { ForecastData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface HourlyWeatherProps {
  data: ForecastData;
}

const HourlyWeather = ({ data }: HourlyWeatherProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    temp: Math.round(item.main.temp),
    time: format(new Date(item.dt * 1000), "ha"),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" stroke="#888" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}°C`}
                fontSize={12}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg bg-background p-2 border shadow-sm text-xs text-muted-foreground">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span>Temp</span>
                            <span className="font-bold text-foreground">{payload[0].value}°</span>
                          </div>
                          <div className="flex flex-col">
                            <span>Feels Like</span>
                            <span className="font-bold text-foreground">{payload[1].value}°</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#82ca9d"
                strokeDasharray="5, 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyWeather;
