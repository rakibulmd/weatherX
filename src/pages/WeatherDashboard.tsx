import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { useGeoLocation } from "../hooks/useGeoLocation";
import LoadingSkeleton from "../components/loadingSkeletion";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const WeatherDashboard = () => {
  const {
    coordinate,
    error: locationError,
    loading: locationLoading,
    getLocation,
  } = useGeoLocation();
  console.log(coordinate);
  const handleRefresh = () => {
    getLocation();
    if (coordinate) {
      // reload weather data
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

  return (
    <div className="space-y-4">
      {/* favourite cities */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4"></RefreshCw>
        </Button>
      </div>
      {/* {current and hourly weather} */}
    </div>
  );
};

export default WeatherDashboard;
