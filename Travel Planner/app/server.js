import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());


let ai = null;
function getGeminiClient() {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. Using mock fallback data generator.");
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

function cleanGeminiJsonResponse(text) {
  if (!text) return "{}";
  let cleaned = text.trim();
  // Strip starting ```json or ``` markdown block
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.replace(/\s*```$/i, "");
  }
  return cleaned.trim();
}

// Curated travel photography lookup to ensure gorgeous, relevant and highly representative cover images for every country
function getPerfectCountryImage(name, category = "Cultural") {
  if (!name) return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";
  
  const key = name.toLowerCase().trim().replace(/[^a-z0-9]/g, "");

  if (!key) {
    const query = `${name.toLowerCase().trim()},${category.toLowerCase().trim()},landscape,scenic`;
    return `https://images.unsplash.com/featured/1200x800/?${encodeURIComponent(query)}`;
  }

  const lookup = {
    "egypt": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
    "france": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    "japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    "italy": "https://images.unsplash.com/photo-1529260830199-4455210982b6?auto=format&fit=crop&w=1200&q=80",
    "switzerland": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "iceland": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "brazil": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    "australia": "https://images.unsplash.com/photo-1523482596682-cd93a6e54520?auto=format&fit=crop&w=1200&q=80",
    "turkey": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    "unitedstates": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
    "usa": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
    "unitedkingdom": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80",
    "uk": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80",
    "england": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80",
    "spain": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80",
    "greece": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "india": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    "china": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    "mexico": "https://images.unsplash.com/photo-1512813583145-baaa340ef29f?auto=format&fit=crop&w=1200&q=80",
    "canada": "https://images.unsplash.com/photo-1489440543227-06c602ee0735?auto=format&fit=crop&w=1200&q=80",
    "germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    "southafrica": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
    "thailand": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    "netherlands": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    "saudiarabia": "https://images.unsplash.com/photo-1586724237569-f38559db835c?auto=format&fit=crop&w=1200&q=80",
    "ksa": "https://images.unsplash.com/photo-1586724237569-f38559db835c?auto=format&fit=crop&w=1200&q=80",
    "unitedarabemirates": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    "uae": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    "jordan": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80",
    "morocco": "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80",
    "indonesia": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    "bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    "vietnam": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    "singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    "newzealand": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    "russia": "https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=1200&q=80",
    "peru": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    "norway": "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80",
    "austria": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80",
    "portugal": "https://images.unsplash.com/photo-1509840141065-e275de347f09?auto=format&fit=crop&w=1200&q=80",
    "sweden": "https://images.unsplash.com/photo-1509142623311-2e6730704ebb?auto=format&fit=crop&w=1200&q=80",
    "ireland": "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    "argentina": "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
    "chile": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    "colombia": "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?auto=format&fit=crop&w=1200&q=80",
    "malaysia": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "philippines": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    "kenya": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    "tanzania": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    "southkorea": "https://images.unsplash.com/photo-1538669715515-58398c880a4f?auto=format&fit=crop&w=1200&q=80",
    "korea": "https://images.unsplash.com/photo-1538669715515-58398c880a4f?auto=format&fit=crop&w=1200&q=80",
    "maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    "costarica": "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1200&q=80",
    "croatia": "https://images.unsplash.com/photo-1555992336-03a23c7b20eb?auto=format&fit=crop&w=1200&q=80",
    "czechrepublic": "https://images.unsplash.com/photo-1541343072074-ce7ab6ad02d1?auto=format&fit=crop&w=1200&q=80",
    "czechia": "https://images.unsplash.com/photo-1541343072074-ce7ab6ad02d1?auto=format&fit=crop&w=1200&q=80",
    "denmark": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "belgium": "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1d3?auto=format&fit=crop&w=1200&q=80",
    "finland": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "hungary": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    "poland": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    "cuba": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    "lebanon": "https://images.unsplash.com/photo-1547886596-4301be69d98c?auto=format&fit=crop&w=1200&q=80",
    "syria": "https://images.unsplash.com/photo-1551041777-ed07f83b4ae5?auto=format&fit=crop&w=1200&q=80",
    "algeria": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
    "tunisia": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    "oman": "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80",
    "qatar": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    "kuwait": "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
    "bahrain": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    "iraq": "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    "yemen": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    "afghanistan": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
    "nepal": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    "cambodia": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80",
    "georgia": "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
    "srilanka": "https://images.unsplash.com/photo-1588598126707-11116de0360a?auto=format&fit=crop&w=1200&q=80",
    "palestine": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80",
    "ukraine": "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=1200&q=80"
  };

  if (lookup[key]) {
    return lookup[key];
  }

  // Also check if name contains any of the keys
  for (const countryKey in lookup) {
    if (key.includes(countryKey) || countryKey.includes(key)) {
      return lookup[countryKey];
    }
  }

  // Dynamic high-quality keyword search fallback using Unsplash featured photo service
  // This automatically provides unique, expressive, and breathtakingly representative covers for any customized/AI country.
  const query = `${name.toLowerCase().trim()},${category.toLowerCase().trim()},landscape,scenic`;
  return `https://images.unsplash.com/featured/1200x800/?${encodeURIComponent(query)}`;
}

// Highly stylized dynamic photo locator for sights and landmarks
function getPerfectLandmarkImage(name, countryName, category = "Historical") {
  const query = `${name.toLowerCase().trim()},${countryName.toLowerCase().trim()},landmark,sight`;
  return `https://images.unsplash.com/featured/800x600/?${encodeURIComponent(query)}`;
}

// Highly stylized dynamic photo locator for luxury travel hotels/lodges
function getPerfectHotelImage(name, countryName) {
  const query = `${name.toLowerCase().trim()},luxury-hotel,resort,room`;
  return `https://images.unsplash.com/featured/800x600/?${encodeURIComponent(query)}`;
}

// Dynamic Weather Fetching from live WeatherAPI (with fallback to Open-Meteo)
async function getLiveWeather(query) {
  const apiKey = process.env.WEATHER_API_KEY || "57b611ff57214271960181036262306";
  try {
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(query)}&days=5&aqi=no&alerts=no`;
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error(`WeatherAPI status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.current || !data.forecast || !data.forecast.forecastday) {
      throw new Error(`Invalid WeatherAPI response structure`);
    }

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const formattedWeather = {
      temp: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      icon: data.current.condition.icon.startsWith("//") ? "https:" + data.current.condition.icon : data.current.condition.icon,
      humidity: Math.round(data.current.humidity),
      windSpeed: Math.round(data.current.wind_kph),
      forecast: data.forecast.forecastday.map(item => {
        const d = new Date(item.date);
        const dayName = daysOfWeek[d.getDay()];
        return {
          day: dayName,
          temp: Math.round(item.day.avgtemp_c),
          condition: item.day.condition.text,
          icon: item.day.condition.icon.startsWith("//") ? "https:" + item.day.condition.icon : item.day.condition.icon
        };
      })
    };
    return formattedWeather;
  } catch (err) {
    console.warn(`WeatherAPI failed for "${query}", falling back to Open-Meteo:`, err.message);
    
    // Fallback to original Open-Meteo implementation
    try {
      // 1. Geocode the query name to latitude and longitude
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) {
        throw new Error(`Geocoding status: ${geoRes.status}`);
      }
      const geoData = await geoRes.json();
      if (!geoData || !geoData.results || geoData.results.length === 0) {
        throw new Error(`Location not found for query: ${query}`);
      }

      const { latitude, longitude } = geoData.results[0];

      // 2. Fetch current weather and 5-day forecast from Open-Meteo
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        throw new Error(`Open-Meteo status: ${weatherRes.status}`);
      }
      const weatherData = await weatherRes.json();
      if (!weatherData || !weatherData.current || !weatherData.daily) {
        throw new Error(`Invalid weather data structure for query: ${query}`);
      }

      const wmoMapping = {
        0: { condition: "Sunny", icon: "☀️" },
        1: { condition: "Mainly Clear", icon: "🌤️" },
        2: { condition: "Partly Cloudy", icon: "⛅" },
        3: { condition: "Overcast", icon: "☁️" },
        45: { condition: "Foggy", icon: "🌫️" },
        48: { condition: "Rime Fog", icon: "🌫️" },
        51: { condition: "Light Drizzle", icon: "🌧️" },
        53: { condition: "Drizzle", icon: "🌧️" },
        55: { condition: "Heavy Drizzle", icon: "🌧️" },
        56: { condition: "Light Freezing Drizzle", icon: "🌧️❄️" },
        57: { condition: "Freezing Drizzle", icon: "🌧️❄️" },
        61: { condition: "Light Rain", icon: "🌧️" },
        63: { condition: "Moderate Rain", icon: "🌧️" },
        65: { condition: "Heavy Rain", icon: "🌧️" },
        66: { condition: "Light Freezing Rain", icon: "🌧️❄️" },
        67: { condition: "Freezing Rain", icon: "🌧️❄️" },
        71: { condition: "Light Snow", icon: "❄️" },
        73: { condition: "Moderate Snow", icon: "❄️" },
        75: { condition: "Heavy Snow", icon: "❄️" },
        77: { condition: "Snow Grains", icon: "❄️" },
        80: { condition: "Light Showers", icon: "🌧️" },
        81: { condition: "Showers", icon: "🌧️" },
        82: { condition: "Violent Showers", icon: "🌧️" },
        85: { condition: "Snow Showers", icon: "❄️" },
        86: { condition: "Heavy Snow Showers", icon: "❄️" },
        95: { condition: "Thunderstorm", icon: "⛈️" },
        96: { condition: "Thunderstorm with Hail", icon: "⛈️" },
        99: { condition: "Heavy Thunderstorm with Hail", icon: "⛈️" }
      };

      const getWeatherInfo = (code) => wmoMapping[code] || { condition: "Partly Cloudy", icon: "⛅" };

      const currentInfo = getWeatherInfo(weatherData.current.weather_code);
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const formattedWeather = {
        temp: Math.round(weatherData.current.temperature_2m),
        condition: currentInfo.condition,
        icon: currentInfo.icon,
        humidity: Math.round(weatherData.current.relative_humidity_2m),
        windSpeed: Math.round(weatherData.current.wind_speed_10m),
        forecast: weatherData.daily.time.slice(0, 5).map((dateStr, idx) => {
          const d = new Date(dateStr);
          const dayName = daysOfWeek[d.getDay()];
          const dailyCode = weatherData.daily.weather_code[idx];
          const info = getWeatherInfo(dailyCode);
          const avgTemp = Math.round((weatherData.daily.temperature_2m_max[idx] + weatherData.daily.temperature_2m_min[idx]) / 2);
          return {
            day: dayName,
            temp: avgTemp,
            condition: info.condition,
            icon: info.icon
          };
        })
      };
      return formattedWeather;
    } catch (fallbackErr) {
      console.error(`Fallback weather also failed for "${query}":`, fallbackErr.message);
      return null;
    }
  }
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Endpoint: Live Weather Fetcher
app.get("/api/weather", async (req, res) => {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }
  const weather = await getLiveWeather(q);
  if (!weather) {
    return res.status(404).json({ error: "Weather data not found for given location." });
  }
  res.json(weather);
});

// Endpoint: AI-Generated Country/Destination Explorer
app.post(["/api/explore", "/api/countries/explore-ai"], async (req, res) => {
  const destination = req.body.destination || req.body.query;
  if (!destination) {
    return res.status(400).json({ error: "Destination parameter is required." });
  }

  try {
    const client = getGeminiClient();
    
    const prompt = `Perform extensive travel research on the destination: "${destination}".
     Generate highly detailed metadata including flag emoji, currency, main language, best visiting seasons, estimated flight time from London/Europe hubs, typical current weather, history summary, an insider locals' secret, visa summary advice for standard passport holders, respectful etiquette guidelines, exactly 4 amazing famous landmarks, and exactly 3 recommended luxury hotels/lodges. Format the result strictly matching the provided JSON schema. Ensure the category is exactly one of: "Beach", "Cultural", "Adventure", "Nature", "Winter". Choose the closest match. Give realistic values, temperature in Celsius, and 5-day forecast.`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["id", "name", "description", "flag", "bestSeason", "flightDuration", "currency", "language", "rating", "category", "weather", "history", "localSecret", "visaRequirement", "cultureTips", "landmarks", "hotels"],
          properties: {
            id: { type: Type.STRING, description: "lowercase slugged id, e.g. 'france' or 'egypt'" },
            name: { type: Type.STRING, description: "Capitalized common name of the country or city, e.g. 'France'" },
            description: { type: Type.STRING, description: "Bespoke, atmospheric description of the country, maximum two sentences." },
            flag: { type: Type.STRING, description: "A single flag emoji, e.g. 🇫🇷" },
            bestSeason: { type: Type.STRING, description: "Best peak months or season, e.g. 'June – September'" },
            flightDuration: { type: Type.STRING, description: "Estimate, e.g. 'Approx. 2-3 hours'" },
            currency: { type: Type.STRING, description: "Name and abbreviation, e.g. 'Euro (EUR, €)'" },
            language: { type: Type.STRING, description: "Primary spoken language, e.g. 'French'" },
            rating: { type: Type.NUMBER, description: "Rating score between 4.5 and 5.0" },
            category: { type: Type.STRING, description: "Must be exactly Beach, Cultural, Adventure, Nature, or Winter" },
            weather: {
              type: Type.OBJECT,
              required: ["temp", "condition", "humidity", "windSpeed", "forecast"],
              properties: {
                temp: { type: Type.INTEGER, description: "Average typical temperature in Celsius, e.g. 21" },
                condition: { type: Type.STRING, description: "Weather condition statement, e.g. 'Clear Sky'" },
                humidity: { type: Type.INTEGER, description: "Humidity percentage, e.g. 55" },
                windSpeed: { type: Type.INTEGER, description: "Wind speed in km/h, e.g. 12" },
                forecast: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ["day", "temp", "condition"],
                    properties: {
                      day: { type: Type.STRING, description: "3-letter abbreviation of weekday, e.g. 'Mon'" },
                      temp: { type: Type.INTEGER, description: "Forecast temperature in Celsius" },
                      condition: { type: Type.STRING, description: "E.g. Sunny, Rain, Cloudy" }
                    }
                  }
                }
              }
            },
            history: { type: Type.STRING, description: "Elegant, concise 2-sentence summary of historical importance." },
            localSecret: { type: Type.STRING, description: "A highly intriguing off-the-beaten-path travel secret or spot." },
            visaRequirement: { type: Type.STRING, description: "Typical visa terms for international travelers, e.g. '90-day visa exemption / e-Visa'" },
            cultureTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of exactly 4 specific social etiquette hints or warnings."
            },
            landmarks: {
              type: Type.ARRAY,
              description: "Exactly 4 amazing landmarks or sights in this destination.",
              items: {
                type: Type.OBJECT,
                required: ["name", "location", "description", "rating", "annualVisitors", "unesco", "category", "funFact"],
                properties: {
                  name: { type: Type.STRING, description: "Name of the landmark" },
                  location: { type: Type.STRING, description: "City or region, e.g. 'Giza'" },
                  description: { type: Type.STRING, description: "One sentence atmospheric description." },
                  rating: { type: Type.NUMBER, description: "Rating score between 4.5 and 5.0" },
                  annualVisitors: { type: Type.STRING, description: "Estimated visitors, e.g. '14 Million'" },
                  unesco: { type: Type.BOOLEAN, description: "Is it a UNESCO World Heritage site?" },
                  category: { type: Type.STRING, description: "Category of landmark: Historical, Cultural, Nature, Scenic, Beach etc." },
                  funFact: { type: Type.STRING, description: "Intriguing insider's fun fact or secret, e.g. 'Constructed without any cement.'" }
                }
              }
            },
            hotels: {
              type: Type.ARRAY,
              description: "Exactly 3 excellent recommended luxury hotels/lodges in this destination.",
              items: {
                type: Type.OBJECT,
                required: ["name", "location", "pricePerNight", "rating", "stars", "reviewsCount", "amenities"],
                properties: {
                  name: { type: Type.STRING, description: "Name of the hotel" },
                  location: { type: Type.STRING, description: "Specific district or street" },
                  pricePerNight: { type: Type.INTEGER, description: "Approximate price per night in USD, between 80 and 800" },
                  rating: { type: Type.NUMBER, description: "Rating score out of 10, e.g. 9.4" },
                  stars: { type: Type.INTEGER, description: "Star level from 3 to 5" },
                  reviewsCount: { type: Type.INTEGER, description: "Total review count, e.g. 340" },
                  amenities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Exactly 4 specific representative amenities, e.g. Infinity Pool."
                  }
                }
              }
            }
          }
        }
      }
    });

    const cleanedText = cleanGeminiJsonResponse(response.text);
    const data = JSON.parse(cleanedText);
    if (data.error || !data.id || !data.name) {
      throw new Error(data.error ? JSON.stringify(data.error) : "Invalid response structure from Gemini API");
    }
    // Inject a customized Cover Image
    data.coverImage = getPerfectCountryImage(data.name, data.category);

    if (data.landmarks && Array.isArray(data.landmarks)) {
      data.landmarks = data.landmarks.map((lm, i) => ({
        ...lm,
        id: lm.id || `lm-${data.id}-${i}`,
        countryId: data.id,
        countryName: data.name,
        image: getPerfectLandmarkImage(lm.name, data.name, lm.category)
      }));
      data.landmarksCount = data.landmarks.length;
    } else {
      data.landmarks = [];
      data.landmarksCount = 0;
    }

    if (data.hotels && Array.isArray(data.hotels)) {
      data.hotels = data.hotels.map((ht, i) => ({
        ...ht,
        id: ht.id || `ht-${data.id}-${i}`,
        countryId: data.id,
        image: getPerfectHotelImage(ht.name, data.name)
      }));
      data.hotelsCount = data.hotels.length;
    } else {
      data.hotels = [];
      data.hotelsCount = 0;
    }

    try {
      const liveWeather = await getLiveWeather(data.name || destination);
      if (liveWeather) {
        data.weather = liveWeather;
      }
    } catch (we) {
      console.warn("Could not load live weather in success route:", we.message);
    }

    res.json(data);
  } catch (error) {
    console.warn("Gemini Explore API was handled gracefully. Falling back to structured mock data. Details:", error.message);
    
    // Return beautiful mock-live data for any country since the key is not configured or there is a generation error
    const destinationClean = destination || "Destination";
    const isBeach = ["bali", "egypt", "brazil", "spain", "maldives", "mexico"].some(word => destinationClean.toLowerCase().includes(word));
    
    // Create a safe database/list identifier for non-Latin text (like Arabic) as well
    let safeId = destinationClean.toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!safeId || safeId === "-") {
      safeId = "dest-" + Math.floor(1000 + Math.random() * 9000);
    }

    const mockData = {
      id: safeId,
      name: destinationClean.charAt(0).toUpperCase() + destinationClean.slice(1),
      description: `Experience the captivating magic of ${destinationClean} with its outstanding landmarks, vibrant culinary scenes, and wonderful local hospitality.`,
      flag: "🌍",
      bestSeason: "April – October (Perfect weather)",
      flightDuration: "Approx. 5-7 hours",
      currency: "Local Currency ($)",
      language: "Official Language",
      rating: 4.8,
      category: isBeach ? "Beach" : "Cultural",
      coverImage: getPerfectCountryImage(destinationClean, isBeach ? "Beach" : "Cultural"),
      weather: {
        temp: 22,
        condition: "Sunny & Pleasant",
        humidity: 48,
        windSpeed: 10,
        forecast: [
          { day: "Today", temp: 22, condition: "Sunny" },
          { day: "Tomorrow", temp: 24, condition: "Sunny" },
          { day: "Next Day", temp: 21, condition: "Partly Cloudy" },
          { day: "Future Day 1", temp: 19, condition: "Cloudy" },
          { day: "Future Day 2", temp: 23, condition: "Sunny" }
        ]
      },
      history: "A rich historic background detailing cultural developments, regional lineages, and modern artistic expansions.",
      localSecret: "A lovely local street cafe district down a hidden path featuring traditional sweets and panoramic views.",
      visaRequirement: "Check online regarding your specific passport restrictions.",
      cultureTips: [
        "Be sure to greet shopkeepers politely upon entering.",
        "Keep high cash handy for local rural transport nodes.",
        "Dress appropriately when entering historic monuments or religious grounds.",
        "Tipping etiquette varies: ask before adding to card settlements."
      ]
    };

    const countryName = mockData.name;
    const countryId = mockData.id;

    mockData.landmarks = [
      {
        id: `lm-${countryId}-1`,
        name: `${countryName} Grand Palace`,
        countryId: countryId,
        countryName: countryName,
        location: `Central ${countryName}`,
        description: `An spectacular architectural masterpiece surrounded by gorgeous royal gardens and containing centuries of deep national history.`,
        image: getPerfectLandmarkImage(`${countryName} Grand Palace`, countryName, "Historical"),
        rating: 4.9,
        annualVisitors: "2.4 Million",
        unesco: true,
        category: "Historical",
        funFact: "Legend says the foundation stone was laid by ancient celestial builders."
      },
      {
        id: `lm-${countryId}-2`,
        name: `${countryName} Sacred Temple`,
        countryId: countryId,
        countryName: countryName,
        location: `Old Town, ${countryName}`,
        description: `A peaceful spiritual sanctuary nestled amid rolling hills, famous for its intricate stone carvings and meditative atmosphere.`,
        image: getPerfectLandmarkImage(`${countryName} Sacred Temple`, countryName, "Cultural"),
        rating: 4.8,
        annualVisitors: "1.1 Million",
        unesco: false,
        category: "Cultural",
        funFact: "Thousands of miniature brass bells ring automatically in soft evening breezes."
      },
      {
        id: `lm-${countryId}-3`,
        name: `Mount ${countryName} Summit`,
        countryId: countryId,
        countryName: countryName,
        location: `Highlands, ${countryName}`,
        description: `A colossal, breathtaking natural peak offering panoramic 360-degree views of pristine rivers and surrounding alpine meadows.`,
        image: getPerfectLandmarkImage(`Mount ${countryName} Summit`, countryName, "Nature"),
        rating: 4.9,
        annualVisitors: "850,000",
        unesco: false,
        category: "Nature",
        funFact: "The peak remains partially covered in pristine snow even throughout high summers."
      },
      {
        id: `lm-${countryId}-4`,
        name: `${countryName} Seaside Cliffs`,
        countryId: countryId,
        countryName: countryName,
        location: `Coastal Region, ${countryName}`,
        description: `Dramatic wind-sculpted golden cliffs overlooking crystal blue oceans, featuring hidden caves and beautiful sunset viewpoints.`,
        image: getPerfectLandmarkImage(`${countryName} Seaside Cliffs`, countryName, "Scenic"),
        rating: 4.7,
        annualVisitors: "1.5 Million",
        unesco: true,
        category: "Scenic",
        funFact: "Rare seabirds nest in the steep golden crevices along the pristine coast."
      }
    ];

    mockData.hotels = [
      {
        id: `ht-${countryId}-1`,
        name: `The Grand Royal Resort & Spa`,
        countryId: countryId,
        location: `1 Ocean Drive, ${countryName}`,
        image: getPerfectHotelImage(`Grand Resort`, countryName),
        pricePerNight: 350,
        rating: 9.8,
        stars: 5,
        reviewsCount: 1450,
        amenities: ["Infinity Pool", "Award-Winning Spa", "Ocean-View Suites", "Private Helipad"]
      },
      {
        id: `ht-${countryId}-2`,
        name: `Clifftop Heritage Lodge`,
        countryId: countryId,
        location: `Mountaintop Road, ${countryName}`,
        image: getPerfectHotelImage(`Heritage Lodge`, countryName),
        pricePerNight: 210,
        rating: 9.4,
        stars: 4,
        reviewsCount: 680,
        amenities: ["Panoramic Terrace", "Fireplace Lounge", "Guided Eco-Tours", "Local Organic Winery"]
      },
      {
        id: `ht-${countryId}-3`,
        name: `Urban Escape Boutique Hotel`,
        countryId: countryId,
        location: `Downtown Avenue, ${countryName}`,
        image: getPerfectHotelImage(`Boutique Hotel`, countryName),
        pricePerNight: 160,
        rating: 9.1,
        stars: 4,
        reviewsCount: 1120,
        amenities: ["Rooftop SkyBar", "Complimentary Bikes", "Artisanal Cafe", "Smart Room Controls"]
      }
    ];

    mockData.landmarksCount = mockData.landmarks.length;
    mockData.hotelsCount = mockData.hotels.length;

    try {
      const liveWeather = await getLiveWeather(destinationClean);
      if (liveWeather) {
        mockData.weather = liveWeather;
      }
    } catch (we) {
      console.warn("Could not load live weather in fallback route:", we.message);
    }

    return res.json(mockData);
  }
});

// Endpoint: AI Day-by-Day Itinerary Planner Generator
app.post(["/api/itinerary", "/api/itinerary/generate"], async (req, res) => {
  const destination = req.body.destination || req.body.countryName;
  const days = req.body.days || req.body.durationDays;
  const style = req.body.style;
  const budget = req.body.budget || req.body.budgetSelection;

  if (!destination || !days) {
    return res.status(400).json({ error: "Destination and days are required." });
  }

  try {
    const client = getGeminiClient();

    const prompt = `Create a fully tailored, premium, day-by-day travel itinerary for: "${destination}".
    Duration: ${days} days.
    Style: ${style || "Adventure & Exploration"}.
    Budget Tier: ${budget || "Moderate"}.
    Provide a concise overall summary, a checklist of 4-5 recommended packing items, exactly 3 helpful local phrases with translation and pronunciation, and a day-by-day structural activity breakdown (consisting of exactly 3 activities per day: morning, afternoon, evening).
    Return the response strictly structured according to the supplied JSON schema. Do not include any trailing or preamble markdown block.`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["destination", "durationDays", "style", "budgetSelection", "summary", "packingList", "localPhrases", "itinerary"],
          properties: {
            destination: { type: Type.STRING },
            durationDays: { type: Type.INTEGER },
            style: { type: Type.STRING },
            budgetSelection: { type: Type.STRING },
            summary: { type: Type.STRING, description: "A high-level introductory summary, max 3 sentences." },
            packingList: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            localPhrases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["phrase", "translation", "pronunciation"],
                properties: {
                  phrase: { type: Type.STRING, description: "Greeting/phrase in local script or alphabet" },
                  translation: { type: Type.STRING },
                  pronunciation: { type: Type.STRING }
                }
              }
            },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["day", "theme", "activities"],
                properties: {
                  day: { type: Type.INTEGER },
                  theme: { type: Type.STRING, description: "Theme/motto for this day, e.g. Ancient Whispers" },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ["time", "activity", "location", "description"],
                      properties: {
                        time: { type: Type.STRING, description: "e.g. 'Morning (9:00 AM)'" },
                        activity: { type: Type.STRING },
                        location: { type: Type.STRING },
                        description: { type: Type.STRING, description: "A beautiful detailed active sentence description of the action." }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const cleanedText = cleanGeminiJsonResponse(response.text);
    const data = JSON.parse(cleanedText);
    if (data.error || !data.itinerary || !Array.isArray(data.itinerary)) {
      throw new Error(data.error ? JSON.stringify(data.error) : "Invalid response structure from Gemini ITINERARY API");
    }
    res.json(data);
  } catch (error) {
    console.warn("Gemini Itinerary API had an issue. Falling back to beautifully generated mock itinerary. Details:", error.message);
    
    const destLower = (destination || "").toLowerCase();
    let mockDays = [];
    let customPackingList = [
      "Comfortable leather walking shoes",
      "Sunblock lotion & protective sunglasses",
      "Reliable compact water canteen",
      "Camera device or smartphone stand"
    ];
    let customPhrases = [
      { phrase: "Hello / Peace", translation: "Greeting of respect", pronunciation: "Ahlan / Ciao / Sawasdee" },
      { phrase: "Thank You", translation: "Expression of gratitude", pronunciation: "Shukran / Grazie / Arigatou" },
      { phrase: "How Much?", translation: "Inquiring about price", pronunciation: "Kam Hada? / Quanto costa? / Ikura?" }
    ];
    let customSummary = `Relax and enjoy this highly curated, scenic journey through ${destination}. Balanced with classic landmarks, peaceful breaks, and delicious local secrets.`;

    if (destLower.includes("egypt")) {
      customSummary = `Unravel the ancient mysteries of Egypt on this spectacular ${days}-day journey from majestic Giza Pyramids to bustling historic souks.`;
      customPackingList = [
        "Lightweight breathable cotton clothing",
        "Protective sun hat & sunglasses",
        "Hand sanitizer & pocket tissues",
        "Sturdy walking sandals or sneakers"
      ];
      customPhrases = [
        { phrase: "السلام عليكم (Salam Alaikum)", translation: "Peace be upon you / Hello", pronunciation: "Sah-lahm ah-lay-koom" },
        { phrase: "شكراً (Shukran)", translation: "Thank you", pronunciation: "Shoo-kran" },
        { phrase: "بكام ده؟ (Be-Kam da?)", translation: "How much is this?", pronunciation: "Bee-kam dah" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Pyramids & Sphinx Ancient Wonders",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Pyramids of Giza Complex Guided Tour",
                location: "Giza Plateau",
                description: "Stand in complete awe of the Great Pyramid of Giza and the majestic Sphinx, hearing stories of ancient Pharaohs with a private Egyptologist."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Historic Egyptian Museum Treasures",
                location: "Tahrir Square, Cairo",
                description: "Browse the world's greatest collection of ancient Egyptian relics, marveling at the solid-gold treasures of King Tutankhamun."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Khan El-Khalili Souk Walk & Mint Tea",
                location: "Islamic Cairo District",
                description: "Navigate vibrant medieval market alleys filled with glowing lanterns, bargaining for beautiful spices and resting at the famous El Fishawy cafe."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Islamic Cairo Citadels & Nile Feluccas",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Salah El-Din Citadel & Alabaster Mosque",
                location: "Citadel Hill, Cairo",
                description: "Step inside the grand Mosque of Muhammad Ali with high dome ceilings and enjoy sweeping panoramic views of the Cairo skyline."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Al-Azhar Gardens Walk & Traditional Koshary Lunch",
                location: "El Darb El Ahmar",
                description: "Enjoy a lovely lunch of savory local koshary, walking through tranquil landscaped public gardens lined with ancient Mamluk walls."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Sunset Nile Felucca Boat Ride",
                location: "Nile River Bank, Garden City",
                description: "Catch the cool evening breeze aboard a traditional wooden sailboat, drifting gently on the Nile River as city lights sparkle."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("japan")) {
      customSummary = `Embark on a harmonious ${days}-day journey across Japan, blending ancient Shinto shrines, gorgeous public gardens, and neon futuristic cityscapes.`;
      customPackingList = [
        "Slip-on shoes for quick temple removals",
        "Pocket Wi-Fi device or local eSIM card",
        "Small hand towel (for temple water cleansing)",
        "Suica/Pasmo transit card application"
      ];
      customPhrases = [
        { phrase: "こんにちは (Konnichiwa)", translation: "Hello / Good afternoon", pronunciation: "Kohn-nee-chee-wah" },
        { phrase: "ありがとうございます (Arigatou Gozaimasu)", translation: "Thank you very much", pronunciation: "Ah-ree-gah-toh goh-zai-mahs" },
        { phrase: "いくらですか (Ikura desu ka?)", translation: "How much is this?", pronunciation: "Ee-koo-rah dess kah" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Historic Asakusa Temples & Shinjuku Neon Alleys",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Senso-ji Temple & Nakamise Shopping",
                location: "Asakusa, Tokyo",
                description: "Explore Tokyo's oldest Buddhist temple, passing through the grand Kaminarimon Gate and browsing traditional wooden souvenir shops."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Shibuya Crossing & Hachiko Statue",
                location: "Shibuya, Tokyo",
                description: "Cross the world's busiest pedestrian scramble intersection, capturing epic photos and trying futuristic capsule toy stations."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Omoide Yokocho Izakaya Food Tour",
                location: "Shinjuku, Tokyo",
                description: "Squeeze into lantern-lit retro alleyways, tasting sizzling yakitori skewers, fresh ramen noodles, and refreshing local beverages."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Serene Meiji Forests & Digital Art Wonders",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Meiji Jingu Shrine forest walk",
                location: "Harajuku, Tokyo",
                description: "Wander through a magnificent evergreen forest leading to a sacred Shinto shrine, paying respects at the historic wooden torii gate."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "TeamLab Planets Immersive Digital Art",
                location: "Toyosu, Tokyo",
                description: "Walk barefoot through crystal infinite lights and water filled with projection-mapped floating koi fish for a sensory masterpiece."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Tokyo Skytree Observatory Sunset Views",
                location: "Sumida, Tokyo",
                description: "Savor premium sunset vistas from the world's tallest tower, looking out at the endless neon horizon and peak silhouette of Mount Fuji."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("france") || destLower.includes("paris")) {
      customSummary = `Experience the ultimate romantic essence of France during this tailored ${days}-day Parisian holiday complete with gorgeous art and world-class cafes.`;
      customPackingList = [
        "Chic and stylish comfortable walking shoes",
        "Lightweight scarf or stylish trench coat",
        "Compact pocket umbrella",
        "Reusable canvas tote bag for local bakeries"
      ];
      customPhrases = [
        { phrase: "Bonjour", translation: "Hello / Good day", pronunciation: "Bahn-zhoor" },
        { phrase: "Merci beaucoup", translation: "Thank you very much", pronunciation: "Mair-see boh-koo" },
        { phrase: "Combien ça coûte?", translation: "How much does it cost?", pronunciation: "Kohm-byah sah koot" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Eiffel Highlights & Louvre Fine Arts",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Eiffel Tower Summit Ascent & Park Walk",
                location: "Champ de Mars, Paris",
                description: "Take the elevators up the historic iron lattice tower, soaking in breathtaking panoramic vistas of the winding Seine River."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "The Louvre Museum Masterpieces Tour",
                location: "Palais Royal, Paris",
                description: "Browse the historic palace halls to discover timeless masterpieces including the Mona Lisa, Venus de Milo, and Winged Victory."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Seine River Sunset Scenic Cruise",
                location: "Port de la Bourdonnais",
                description: "Board a glass-canopied cruise boat, sipping dynamic drinks as the sunset lights illuminate iconic stone bridges and Notre-Dame."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Charming Montmartre Village & Le Marais Bakeries",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Sacré-Cœur Basilica & Artists Quarter",
                location: "Montmartre, Paris",
                description: "Stroll beautiful hilly cobblestone streets past old windmills, listening to buskers and taking photos at the Place du Tertre."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Champs-Élysées Stroll & Arc de Triomphe Climb",
                location: "Avenue des Champs-Élysées",
                description: "Walk the grand avenue, climbing to the top of Napoleon's triumphant arch to marvel at the radiating star-shaped street plan."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Le Marais Historic District Dinner",
                location: "Rue des Rosiers, Paris",
                description: "Wander through the fashionable historic Jewish and LGBTQ+ quarter, enjoying delicious savory crepes, duck confit, or crisp croissants."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("italy") || destLower.includes("rome")) {
      customSummary = `Savor the rich history, unparalleled architecture, and culinary mastery of Italy with a customized ${days}-day historic tour.`;
      customPackingList = [
        "Modest clothing covering shoulders & knees (for churches)",
        "Refillable water canteen for ancient street fountains",
        "Comfortable leather walking shoes",
        "Polarized anti-glare sunglasses"
      ];
      customPhrases = [
        { phrase: "Buongiorno / Ciao", translation: "Good morning / Hello", pronunciation: "Bwohn-joor-noh / Chow" },
        { phrase: "Grazie mille", translation: "Thank you very much", pronunciation: "Graht-syee mee-lay" },
        { phrase: "Quanto costa?", translation: "How much does it cost?", pronunciation: "Kwahn-toh kohs-tah" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Roman Empire Antiquities & Fountain Trails",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Colosseum & Roman Forum Guided Walk",
                location: "Piazza del Colosseo, Rome",
                description: "Walk inside the giant ancient gladiatorial amphitheater, stepping onto the arena floor while learning about Rome's history."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Trevi Fountain Coin Toss & Pantheon Visit",
                location: "Historic Center, Rome",
                description: "Toss a coin over your shoulder to ensure your return, then stroll to marvel at the 2000-year-old Pantheon's majestic dome."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Trastevere Cobblestone Culinary Walkabout",
                location: "Trastevere District, Rome",
                description: "Explore narrow ivy-draped lanes, enjoying authentic homemade Roman pasta cacio e pepe or carbonara in a cozy trattoria."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Vatican Renaissance Art & Panoramic Hilltops",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Vatican Museums & Sistine Chapel Tour",
                location: "Vatican City",
                description: "Marvel at the world's premier Renaissance art collection, culminating in Michelangelo's stunning ceiling frescoes in the Sistine Chapel."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Piazza Navona Fountain Walk & Gelato Tasting",
                location: "Piazza Navona, Rome",
                description: "Stroll around spectacular baroque Bernini fountains, cooling down with delicious artisanal dark chocolate and pistachio gelato."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Janiculum Hill Sunset Skyline View",
                location: "Gianicolo Hill, Rome",
                description: "Gather at the hilltop terrace to watch the entire Roman cityscape, domes, and ancient monuments glow deep gold in the sunset."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("greece") || destLower.includes("athens")) {
      customSummary = `Bask in the dazzling sunshine of Greece on this ${days}-day odyssey across whitewashed island cliffs and historic Acropolis paths.`;
      customPackingList = [
        "Suntan lotion & high SPF sunscreen",
        "Light flowing linen garments",
        "Swimwear & high traction water shoes",
        "Hat with protective face shade"
      ];
      customPhrases = [
        { phrase: "Γειά σας (Ya sas)", translation: "Hello / Good health to you", pronunciation: "Yah sahs" },
        { phrase: "Ευχαριστώ (Efcharisto)", translation: "Thank you", pronunciation: "Ef-khah-rees-toh" },
        { phrase: "Πόσο κάνει; (Poso kanei?)", translation: "How much is this?", pronunciation: "Poh-soh kah-nee" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Athens Antiquities & Historic Plaka Lanes",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Acropolis Hill & Parthenon Architectural Guided Tour",
                location: "Acropolis Hill, Athens",
                description: "Climb the sacred rock of the Acropolis, witnessing the marble Parthenon and panoramic city views with an expert guide."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Ancient Agora Promenade & Greek Souvlaki Lunch",
                location: "Monastiraki, Athens",
                description: "Walk the ruins where Socrates and Plato spoke, and refuel on charcoal-grilled souvlaki and cold Greek salad."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Sunset Walk of Plaka Neighborhood",
                location: "Plaka Old Town, Athens",
                description: "Stroll the narrow bougainvillea-draped pedestrian streets under the illuminated Acropolis, stopping for traditional music and olives."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Scenic Island Cliffs & Beachfront Leisure",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Oceanfront Coastal Stroll & Sea Caves Exploration",
                location: "Island Seashores",
                description: "Breathe in the fresh Mediterranean breeze while walking the shoreline, spotting hidden azure sea caves."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Seafood Lunch & Coastal Village Exploration",
                location: "Traditional Fishing Port",
                description: "Indulge in fresh octopus and calamari caught this morning, exploring winding white alleyways of the port town."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Golden Hour Panoramic Sunset Lounge",
                location: "Oia Cliffside Lookout",
                description: "Secure a gorgeous vantage spot on the cliffs to watch the sun sink below the Aegean, casting gold light on blue-domed churches."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("morocco") || destLower.includes("marrakech")) {
      customSummary = `Delve into the sights, exotic sounds, and rich aromatic scents of Morocco on this customized ${days}-day cultural caravan adventure.`;
      customPackingList = [
        "Light scarf or pashmina to cover shoulders",
        "Comfortable sandals for clay souk paths",
        "Local currency cash (dirhams) for souk tipping",
        "A travel adapter for European type plugs"
      ];
      customPhrases = [
        { phrase: "السلام عليكم (Salam Alaykum)", translation: "Hello / Peace", pronunciation: "Sah-lahm ah-lay-koom" },
        { phrase: "شكراً (Shukran)", translation: "Thank you", pronunciation: "Shoo-kran" },
        { phrase: "بشحال هذا؟ (Bshal hada?)", translation: "How much is this?", pronunciation: "Be-sh-hal ha-da" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Medina Souks & Bahia Palace Majesty",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Bahia Palace & Mosaic Courtyards Guided Tour",
                location: "Marrakech Medina",
                description: "Marvel at the complex floor-to-ceiling tiling, cedar wood carvings, and peaceful orange orchards of this 19th-century royal palace."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Aromatic Spice Souks & Traditional Tagine Lunch",
                location: "Souk Semmarine",
                description: "Get beautifully lost inside busy lanes filled with towering colorful spice cones, tasting slow-cooked lemon chicken tagine."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Jemaa el-Fnaa Plaza Vibrant Sunset Show",
                location: "Main Square Terrace, Marrakech",
                description: "Sip hot Moroccan mint tea from a rooftop café overlooking the square as snake charmers, storytellers, and food stalls come alive."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Serene Gardens & Historic Mosques",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Jardin Majorelle Botanical Oasis Visit",
                location: "Gueliz District",
                description: "Wander through tranquil, neon-blue Yves Saint Laurent gardens, filled with towering cacti, clear lily ponds, and exotic birds."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Koutoubia Mosque Gardens Stroll",
                location: "Avenue Mohammed V",
                description: "Admire the historic 12th-century Moorish minaret, smelling wild roses in the vast public gardens surrounding the mosque."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Traditional Hammam Spa & Olive Tasting",
                location: "Mellah Quarter",
                description: "Enjoy a historic black-soap eucalyptus scrub and steam massage, followed by savory preserved lemons and spicy red olives."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("thailand") || destLower.includes("bangkok")) {
      customSummary = `Discover the vibrant gold temples, emerald rain forests, and rich street-food scents of Thailand on this spectacular ${days}-day escape.`;
      customPackingList = [
        "Lightweight clothes covering knees and shoulders (for temples)",
        "Powerful organic mosquito repellent spray",
        "Waterproof wet bag for boat excursions",
        "Highly breathable running sneakers"
      ];
      customPhrases = [
        { phrase: "สวัสดีครับ/ค่ะ (Sawasdee krub/ka)", translation: "Hello / Greetings", pronunciation: "Sah-wah-dee khrup (male) / kah (female)" },
        { phrase: "ขอบคุณครับ/ค่ะ (Khob khun krub/ka)", translation: "Thank you", pronunciation: "Khob-khoon khrup / kah" },
        { phrase: "เท่าไหร่ครับ/ค่ะ (Tao rai krub/ka?)", translation: "How much does it cost?", pronunciation: "Tao-rai khrup / kah" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Majestic Grand Temples & Spicy Pad Thai Secrets",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Grand Palace & Reclining Buddha Tour",
                location: "Phra Nakhon, Bangkok",
                description: "Admire the intricate gold leaf towers and the legendary 46-meter long gold Reclining Buddha inside Wat Pho with an expert guide."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Chao Phraya Longtail Canal Boat Ride & Local Lunch",
                location: "Thonburi Canals",
                description: "Ride a traditional wooden longtail boat through floating communities, enjoying hot Tom Yum soup and mango sticky rice."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Wat Arun Temple Sunset View & Night Market",
                location: "Chao Phraya River Bank",
                description: "Watch the porcelain-encrusted towers of Wat Arun glow under sunset floodlights, before shopping at the Asiatique open-air night market."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Tropical Jungles & Emerald Lagoons",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Rainforest Nature Walk & Wildlife Spotting",
                location: "National Park Wilderness",
                description: "Follow quiet bamboo paths past hidden cascading waterfalls, watching for colorful tropical birds and playful gibbons."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Canoe Paddle & Fresh Coconut Refreshment",
                location: "Emerald Bay Beachfront",
                description: "Paddle through majestic limestone karsts, drinking sweet milk from fresh, ice-cold green coconuts."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Seaside Fire-Dance Show & Fresh Seafood Feast",
                location: "Andaman Coast Beach",
                description: "Dine barefoot on garlic butter prawns and grilled snapper right on the sand, while talented local artists perform fire-dancing."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("switzerland") || destLower.includes("swiss")) {
      customSummary = `Traverse pristine snow-draped alpine peaks, mirror-smooth glacial lakes, and charming clocktower villages during this elite ${days}-day Swiss adventure.`;
      customPackingList = [
        "Warm layered fleece & windproof outer jacket",
        "Refillable aluminum water flask",
        "Swiss rail pass card (printed/digital)",
        "Sturdy waterproof hiking boots"
      ];
      customPhrases = [
        { phrase: "Grüezi", translation: "Hello (Swiss-German)", pronunciation: "Grew-et-see" },
        { phrase: "Merci vilmal", translation: "Thank you very much", pronunciation: "Merci feel-mahl" },
        { phrase: "Wie viel kostet das?", translation: "How much does this cost?", pronunciation: "Vee feel kos-tet dahs" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Peak Matterhorn Excursion & Swiss Fondue Bliss",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Gornergrat Cogwheel Railway to Matterhorn Vistas",
                location: "Zermatt Station",
                description: "Ride Europe's highest open-air cogwheel train up to 3,089 meters, taking pictures of the pyramid-shaped Matterhorn peak."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Alpine Meadow Hike & Lake Riffelsee Reflection",
                location: "Gornergrat Nature Trails",
                description: "Hike a well-marked alpine flower path down to Lake Riffelsee, capturing the reflection of the Matterhorn in the still water."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Traditional Swiss Cheese Fondue Dinner",
                location: "Zermatt Village Center",
                description: "Gather in a rustic, wood-paneled chalet to dip crusty rustic bread cubes into rich, bubbling Gruyère and Vacherin cheese fondue."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Glacial Lakes & Medieval Old Towns",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Lake Lucerne Scenic Steamboat Cruise",
                location: "Lucerne Pier",
                description: "Board a historic paddle steamboat, cruising past dramatic forested fjord-like cliffs and majestic Swiss peaks."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Chapel Bridge Walk & Lucerne Chocolate Tasting",
                location: "Old Town Lucerne",
                description: "Walk across the famous 14th-century wooden Chapel Bridge, stopping at a Swiss confiserie to taste premium artisan dark truffles."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Mount Pilatus Dragon Ride Cableway Sunset",
                location: "Pilatus Kulm",
                description: "Ascend via high-speed aerial cable car to the summit of Pilatus, watching the sunset splash gold paint over central Swiss lakes."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("brazil") || destLower.includes("rio")) {
      customSummary = `Immerse in the rhythmic samba pulses, lush rainforest heights, and sparkling white coastlines of Brazil during this ${days}-day holiday.`;
      customPackingList = [
        "Vibrant light casual summer clothing",
        "Suntan cream & protective sunglasses",
        "Secure lightweight cross-body pouch",
        "Flip-flops (Havaianas style) for beaches"
      ];
      customPhrases = [
        { phrase: "Olá / Tudo bem?", translation: "Hello / How is everything?", pronunciation: "Oh-lah / Too-doo bang" },
        { phrase: "Obrigado/a", translation: "Thank you", pronunciation: "Oh-bree-gah-doo (male) / dah (female)" },
        { phrase: "Quanto custa?", translation: "How much does it cost?", pronunciation: "Kwan-too koos-tah" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Christ the Redeemer & Sunset Sugarloaf Cableways",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Corcovado Mountain Train & Christ Statue Tour",
                location: "Tijuca National Park, Rio",
                description: "Ride the vintage cog train climbing through dense tropical rainforest to the iconic 38-meter tall Christ the Redeemer monument."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Copacabana Shore Walk & Feijoada Lunch",
                location: "Copacabana Beach, Rio",
                description: "Walk the mosaic wave promenade, and dig into a traditional lunch of rich black bean and pork stew (feijoada) with farofa."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Sugarloaf Mountain Double Cable Car Sunset",
                location: "Urca, Rio de Janeiro",
                description: "Ascend the iconic granite peaks by high-speed cable cars, watching the sun set over Guanabara Bay while enjoying a lime caipirinha."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Ipanema Beats & Botanical Garden Walks",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Rio Jardim Botânico Orchid Houses Promenade",
                location: "Jardim Botânico District",
                description: "Stroll beneath towering row-avenues of imperial palms, discovering delicate orchid greenhouses and hearing local bird calls."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Ipanema Beach Relax & Coconut Water",
                location: "Ipanema Beach, Rio",
                description: "Unwind on soft white sand, listening to Bossanova melodies and drinking cold coconut water direct from green coconuts."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Selarón Steps & Lapa Samba Night",
                location: "Lapa District, Rio",
                description: "Visit the colorful tiled staircase by artist Jorge Selarón, before heading to a live music club to hear sizzling, authentic Samba beats."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("australia") || destLower.includes("sydney")) {
      customSummary = `Soak in the spectacular coastlines, iconic oceanfront architecture, and rugged native bushlands of Australia during this ${days}-day escape.`;
      customPackingList = [
        "Highly effective SPF 50+ sun cream (Aussie sun is strong)",
        "Sturdy walking hat & sunglasses",
        "Swimwear & quick-dry microfiber towel",
        "Comfortable sneakers or active sandals"
      ];
      customPhrases = [
        { phrase: "G'day / How ya going?", translation: "Hello / How are you?", pronunciation: "G-day / How-ya-goin" },
        { phrase: "Cheers", translation: "Thank you / Celebration", pronunciation: "Cheerz" },
        { phrase: "How much is this, mate?", translation: "Inquiring about price", pronunciation: "How-much-is-this-mayte" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Sydney Opera Icons & Spectacular Ferry Cruises",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Sydney Opera House Architectural Tour",
                location: "Bennelong Point, Sydney",
                description: "Walk inside the grand sails of the famous landmark, learning the dramatic history of architect Jørn Utzon's masterpiece."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Manly Ferry Harbour Cruise & Fish 'n Chips",
                location: "Circular Quay to Manly",
                description: "Take the iconic public ferry across Sydney Harbour, capturing photos of the Harbour Bridge and enjoying hot fish 'n chips by the shore."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "The Rocks Historical Walk & Sunset Drink",
                location: "The Rocks District, Sydney",
                description: "Explore Sydney's oldest historic neighborhood with cobblestone paths and old sandstone pubs, enjoying a craft pint during sunset."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Bondi Shoreline Walks & Wildlife Sanctuaries",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Bondi to Bronte Spectacular Coastal Walk",
                location: "Bondi Beach, Sydney",
                description: "Trace high sandstone cliffs overlooking the deep blue Pacific Ocean, witnessing crashing surf and natural coastal pools."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Taronga Zoo Native Wildlife Visits & Ferry",
                location: "Mosman, Sydney",
                description: "Cross the harbour to visit Taronga Zoo, standing close to native koalas, red kangaroos, and wallabies with the skyline behind."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Darling Harbour Sunset Seafood Dining",
                location: "Darling Harbour Wharf",
                description: "Savor premium freshly shucked Sydney rock oysters and local barramundi fish at a waterfront terrace while twilight city lights ignite."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("turkey") || destLower.includes("istanbul")) {
      customSummary = `Journey through the rich ancient empires, historic spices, and spectacular mosque minarets of Turkey during this customized ${days}-day itinerary.`;
      customPackingList = [
        "Headscarf for ladies & long pants/dresses (for mosques)",
        "Comfortable slip-on shoes for quick temple removals",
        "Local cash Turkish Lira (TRY) for bazaar bargaining",
        "Hand sanitizer & moist sanitizing wipes"
      ];
      customPhrases = [
        { phrase: "Merhaba", translation: "Hello", pronunciation: "Mair-hah-bah" },
        { phrase: "Teşekkür ederim", translation: "Thank you", pronunciation: "Teh-sheh-kure eh-deh-reem" },
        { phrase: "Ne kadar?", translation: "How much is this?", pronunciation: "Neh kah-dar" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Hagia Sophia Mosque Jewels & Grand Bazaar Spice Trails",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Hagia Sophia & Blue Mosque Architecture Tour",
                location: "Sultanahmet, Istanbul",
                description: "Explore the giant glittering gold mosaics and massive dome of Hagia Sophia, crossing the plaza to witness the elegant Blue Mosque."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Grand Bazaar Hidden Vaults & Turkish Kebabs",
                location: "Fatih, Istanbul",
                description: "Wander the world's largest covered market, negotiating for hand-woven Turkish carpets and enjoying juicy lamb adana kebabs."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Sunset Bosphorus Strait Sightseeing Cruise",
                location: "Eminönü Pier, Istanbul",
                description: "Glide gently between Europe and Asia on a sunset boat, drinking hot Turkish tea while watching palace facades glow gold."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Topkapi Royal Palaces & Underground Basilica Cisterns",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Topkapi Palace Ottoman Sultans Harem Tour",
                location: "Sultanahmet Hill",
                description: "Step inside the grand palace of Ottoman rulers, admiring imperial treasuries, sacred relics, and panoramic views of the Golden Horn."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Basilica Cistern Medusa Pillars Walk",
                location: "Yerebatan Avenue",
                description: "Descend into the cool, dark Byzantine underground water reservoir, walking pathways illuminated by soft red light over giant pillars."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Galata Tower Sunset Views & Turkish Delight",
                location: "Beyoğlu District",
                description: "Ascend the medieval stone tower to enjoy spectacular 360-degree views of Istanbul, and taste sweet pomegranate and pistachio Turkish delight."
              }
            ]
          });
        }
      }
    } else if (destLower.includes("united states") || destLower.includes("usa") || destLower.includes("america") || destLower.includes("york")) {
      customSummary = `Embark on an iconic ${days}-day adventure in the United States, exploring world-renowned central park landmarks, soaring skyscrapers, and dynamic local culture.`;
      customPackingList = [
        "Lightweight comfortable walking sneakers",
        "Credit/debit card (most US shops are cash-free)",
        "A heavy duty power bank charger for your phone",
        "Weather-appropriate jacket or light hoodie"
      ];
      customPhrases = [
        { phrase: "Hello / Good morning", translation: "Greeting", pronunciation: "Heh-low / Gud mor-ning" },
        { phrase: "Thank you", translation: "Expressing gratitude", pronunciation: "Thangk yoo" },
        { phrase: "How much is this?", translation: "Asking for price", pronunciation: "How much iz thiz" }
      ];

      for (let i = 1; i <= Number(days); i++) {
        if (i % 2 !== 0) {
          mockDays.push({
            day: i,
            theme: "Skyscraper Skylines & Central Park Lakes",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Skyscraper Observation Deck Panorama Views",
                location: "Midtown Tower, New York",
                description: "Ascend high-speed elevators to the rooftop observation deck, looking out at the endless grid of skyscrapers and historic suspension bridges."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Central Park Bicycle Loop & Deli Lunch",
                location: "Central Park, Manhattan",
                description: "Pedal along tranquil winding paths, past beautiful lake views and Bethesda Fountain, eating a classic hot pastrami deli sandwich."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Times Square Neon Walk & Broadway Theater",
                location: "Broadway Theatre District",
                description: "Marvel at the giant glowing billboard screens of Times Square before settling into comfortable seats to watch a spectacular theatrical show."
              }
            ]
          });
        } else {
          mockDays.push({
            day: i,
            theme: "Scenic Museums & Historic Landmarks",
            activities: [
              {
                time: "Morning (09:00 AM)",
                activity: "Metropolitan Museum of Fine Arts Gallery Stroll",
                location: "Museum Mile, Manhattan",
                description: "Browse thousands of years of human artistry, from massive Egyptian Temple reconstructions to beautiful impressionist paintings."
              },
              {
                time: "Afternoon (01:00 PM)",
                activity: "Statue of Liberty Ferry Cruise & Island Walk",
                location: "Battery Park Pier",
                description: "Board the ferry crossing the harbour to Liberty Island, walking right beneath the giant copper torch-bearing statue."
              },
              {
                time: "Evening (06:00 PM)",
                activity: "Brooklyn Bridge Sunset Walk & Pizza Dinner",
                location: "DUMBO Waterfront, Brooklyn",
                description: "Walk the historic wooden planks of the Brooklyn Bridge during sunset, ending on the Brooklyn side to enjoy delicious brick-oven pizza."
              }
            ]
          });
        }
      }
    } else {
      // Elegant Generic default
      for (let i = 1; i <= Number(days); i++) {
        mockDays.push({
          day: i,
          theme: `Exploring Scenic Landmarks of ${destination}`,
          activities: [
            {
              time: "Morning (09:00 AM)",
              activity: "Panoramic Landmark Discovery Tour",
              location: "Historic Quarter",
              description: "Embark on an early morning panoramic walk traversing historic architectural gems, capturing pristine morning sunshine with local tea."
            },
            {
              time: "Afternoon (01:00 PM)",
              activity: "Artisanal Market Exploration & Food Tasting",
              location: "Locals' Market & Bistro Center",
              description: "Taste traditional signature dishes cooked by generational families, learning historic culinary secrets while browsing handmade local souvenirs."
            },
            {
              time: "Evening (06:00 PM)",
              activity: "Stargazing Sunset Cruise",
              location: "Panoramic Mountain Lookout or Scenic Waterfront",
              description: "Relax during a marvelous sunset viewing session, reflecting on local history and enjoying dynamic signature local refreshments."
            }
          ]
        });
      }
    }

    const mockItinerary = {
      destination,
      durationDays: Number(days),
      style: style || "Exploration & Leisure",
      budgetSelection: budget || "Moderate",
      summary: customSummary,
      packingList: customPackingList,
      localPhrases: customPhrases,
      itinerary: mockDays
    };
    return res.json(mockItinerary);
  }
});

// Setup Vite & Static Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Destinations Travel Hub running on HTTP host: http://localhost:${PORT}`);
  });
}

startServer();
