import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
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

// Dynamic Weather Fetching from live Open-Meteo (completely free, keyless, and reliable)
async function getLiveWeather(query) {
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
  } catch (err) {
    console.error(`Could not fetch live weather from Open-Meteo for "${query}":`, err.message);
    return null;
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
      model: "gemini-3.5-flash",
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

    const data = JSON.parse(response.text || "{}");
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
      model: "gemini-3.5-flash",
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

    const data = JSON.parse(response.text || "{}");
    if (data.error || !data.itinerary || !Array.isArray(data.itinerary)) {
      throw new Error(data.error ? JSON.stringify(data.error) : "Invalid response structure from Gemini ITINERARY API");
    }
    res.json(data);
  } catch (error) {
    console.warn("Gemini Itinerary API had an issue. Falling back to beautifully generated mock itinerary. Details:", error.message);
    
    // Mock daily itinerary
    const mockDays = [];
    for (let i = 1; i <= Number(days); i++) {
      mockDays.push({
        day: i,
        theme: `Exploring Scenic Landmarks of ${destination}`,
        activities: [
          {
            time: "Morning (09:00 AM)",
            activity: "Iconic Area Trek & Landscape Views",
            location: "Historic Town Center",
            description: "Embark on an early morning panoramic walk traversing architectural treasures, capturing pristine morning sunshine with local tea."
          },
          {
            time: "Afternoon (01:00 PM)",
            activity: "Market Walkabout & Traditional Tasting",
            location: "Locals' Souk / Gastro Food Court",
            description: "Taste traditional signature dishes cooked by generational families, learning historic spice secrets while browsing artisanal souvenirs."
          },
          {
            time: "Evening (06:00 PM)",
            activity: "Stargazing Sunset Cruise",
            location: "Panoramic Mountain Lookout or Riverfront",
            description: "Relax during a marvelous sunset viewing session, reflecting on local history while tasting dynamic local grape mocktails."
          }
        ]
      });
    }

    const mockItinerary = {
      destination,
      durationDays: Number(days),
      style: style || "Exploration & Leisure",
      budgetSelection: budget || "Moderate",
      summary: `Relax and enjoy this highly curated, scenic journey through ${destination}. Balanced with classic landmarks, peaceful breaks, and delicious local secrets.`,
      packingList: [
        "Comfortable leather dynamic walking shoes",
        "Sunblock lotion & premium polarizing sunglasses",
        "Reliable compact water canteen",
        "Camera device or smartphone stand"
      ],
      localPhrases: [
        { phrase: "Hello / Peace", translation: "Greeting of respect", pronunciation: "Ahlan / Ciao / Sawasdee" },
        { phrase: "Thank You Very Much", translation: "Expression of high gratitude", pronunciation: "Shukran / Grazie / Arigatou" },
        { phrase: "How Much is This?", translation: "Inquiring about asset price", pronunciation: "Kam Hada? / Quanto costa?" }
      ],
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

