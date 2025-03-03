import { Loader2, Search, SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";

import { Button } from "./ui/button";

import { useState } from "react";
import { useLocationSearch } from "../hooks/useWeatherData";
import { CommandSeparator } from "cmdk";
import { useNavigate } from "react-router-dom";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: locations, isLoading } = useLocationSearch(query);
  const handleSelect = (cityData: string) => {
    const [lat, lon, country, name] = cityData.split("|");
    navigate(`/city/${name}??lat=${lat}&lon=${lon}`);
  };
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => setOpen(true)}
        className="w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-1 h-4 w-4"></Search>
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput value={query} onValueChange={setQuery} placeholder="Search Cities..." />
        <CommandList>
          {query.length > 2 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}

          <CommandGroup heading="Favorites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandSeparator></CommandSeparator>
          <CommandGroup heading="Recent Searches">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandSeparator></CommandSeparator>
          {locations && locations?.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-2">
                  <Loader2 className="w-4 h-4 animate-spin"></Loader2>
                </div>
              )}
              {locations.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.country}|${location.name}`}
                    onSelect={handleSelect}
                  >
                    <SearchIcon className="mr-2 w-4 h-4"></SearchIcon>
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">, {location.state}</span>
                    )}
                    <span className="text-sm text-muted-foreground">, {location.country}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
