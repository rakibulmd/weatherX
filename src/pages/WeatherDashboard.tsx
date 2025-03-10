import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { useGeoLocation } from "../hooks/useGeoLocation";
import LoadingSkeleton from "../components/loadingSkeletion";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { useForecastQuery, useReverseGeoCodeQuery, useWeatherQuery } from "../hooks/useWeatherData";
import CurrentWeather from "../components/currentWeather";
import HourlyWeather from "../components/hourlyWeather";
import WeatherDetails from "../components/weatherDetails";
import WeatherForecast from "../components/weatherForecast";

const WeatherDashboard = () => {
  const {
    coordinate,
    error: locationError,
    loading: locationLoading,
    getLocation,
  } = useGeoLocation();

  const locationQuery = useReverseGeoCodeQuery(coordinate);
  const weatherQuery = useWeatherQuery(coordinate);
  const forecastQuery = useForecastQuery(coordinate);

  const handleRefresh = () => {
    getLocation();
    if (coordinate) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (locationLoading) {
    return <LoadingSkeleton></LoadingSkeleton>;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="h-4 w-4 mr-2"></MapPin>
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinate) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Access Required</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="h-4 w-4 mr-2"></MapPin>
            Please enable location access to see your local weather information!
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Weather Information Error</AlertTitle>
        <AlertDescription>
          <p>Failed to fetch weather information</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCw className="h-4 w-4 mr-2"></RefreshCw>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton></LoadingSkeleton>;
  }

  return (
    <div className="space-y-4">
      {/* favourite cities */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching || forecastQuery.isFetching ? "animate-spin" : ""
            }`}
          ></RefreshCw>
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
          <HourlyWeather data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
