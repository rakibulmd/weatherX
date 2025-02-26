import { useEffect, useState } from "react";
import { Coordinates } from "../api/types";

interface GeoLocationState {
  coordinate: Coordinates | null;
  error: string | null;
  loading: boolean;
}

export function useGeoLocation() {
  const [locationData, setLocationData] = useState<GeoLocationState>({
    coordinate: null,
    error: null,
    loading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, loading: true, error: null }));
    if (!navigator.geolocation) {
      setLocationData({
        coordinate: null,
        error: "Gelocation is not supported / not enabled by your browser",
        loading: false,
      });
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinate: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage: string = "Unknown error";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
            break;
        }
        setLocationData({ coordinate: null, error: errorMessage, loading: false });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(getLocation, []);

  return {
    ...locationData,
    getLocation,
  };
}
