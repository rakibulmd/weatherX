import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/themeContext";
import WeatherDashboard from "./pages/weatherDashboard";
import CityWeather from "./pages/cityWeather";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/city/:cityName" element={<CityWeather />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
