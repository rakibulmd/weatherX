import { RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";

const WeatherDashboard = () => {
  return (
    <div>
      {/* favourite cities */}
      <div>
        <h1>My Location</h1>
        <Button variant={"outline"} size={"icon"}>
          <RefreshCw></RefreshCw>
        </Button>
      </div>
      {/* {current and hourly weather} */}
    </div>
  );
};

export default WeatherDashboard;
