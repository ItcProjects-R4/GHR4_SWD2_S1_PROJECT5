
import { useState} from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MapPin, 
  Compass, 
  Sparkles, 
  ArrowLeft, 
  Heart, 
  Sun, 
  Wind, 
  Droplets, 
  Globe, 
  Luggage, 
  SlidersHorizontal,
  Bookmark,
  BadgeAlert,
  X,
  Phone
} from "lucide-react";

import {
  PRELOADED_COUNTRIES,
  PRELOADED_LANDMARKS,
  PRELOADED_HOTELS
} from "../../data";
import { useLocation} from "react-router-dom";
import { useEffect } from "react";

export default function Destinations() {
const location = useLocation();
// useEffect(() => {
//   if (location.state && location.state.countryData) {
//     viewCountryDetails(location.state.countryData);
//   }
// }, [location.state]);


const [activeTab, setActiveTab] = useState("countries");

const [hotelPhone] = useState(() => {
  const prefix = Math.floor(Math.random() * 900) + 100;
  const suffix = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${suffix}`;
});  
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Lists & Dynamic Management
  const [countries, setCountries] = useState(PRELOADED_COUNTRIES);
  const [landmarks, setLandmarks] = useState(PRELOADED_LANDMARKS);
  const [hotels, setHotels] = useState(PRELOADED_HOTELS);
  
  // Search & Filtering States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  
  // Interaction Lists
  const [wishlist, setWishlist] = useState([]);
  const [bookedHotels, setBookedHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelActiveTab, setHotelActiveTab] = useState("overview");
  
  // AI Explore search state (Full world discovery)
  const [aiSearchQuery, setAiSearchQuery] = useState("");
  const [isAiExploring, setIsAiExploring] = useState(false);
  const [aiError, setAiError] = useState(null);

  // Custom AI Itinerary Generator Status
  const [itineraryDays, setItineraryDays] = useState(3);
  const [itineraryStyle, setItineraryStyle] = useState("Leisure & Sightseeing");
  const [itineraryBudget, setItineraryBudget] = useState("Comfort / Moderate");
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [itineraryError, setItineraryError] = useState(null);

  // User alerts (Toasts)
  const [toastMessage, setToastMessage] = useState(null);

  // Robust error-proof image fallback handler
  const handleImageError = (e, type, keyName = "") => {
    const target = e.currentTarget;
    target.onerror = null; 
    if (type === 'country') {
      // Direct high-quality verified Unsplash CDN fallback assets
      const fallbacks = [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70", // Beach
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=70", // Cultural
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=70", // Adventure
        "https://images.unsplash.com/photo-1472214222541-d510753a4707?auto=format&fit=crop&w=800&q=70", // Nature
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=70", // City/Flag
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=70"  // Winter
      ];
      let index = 0;
      if (keyName) {
        let hash = 0;
        const normalized = keyName.toLowerCase().trim();
        for (let i = 0; i < normalized.length; i++) {
          hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
        }
        index = Math.abs(hash) % fallbacks.length;
      }
      target.src = fallbacks[index];
    } else if (type === 'landmark') {
      target.src = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=70";
    } else {
      target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=70";
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle saving to wishlist
  const toggleWishlist = (id, name) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
      triggerToast(`Removed "${name}" from your dream wishlist.`);
    } else {
      setWishlist([...wishlist, id]);
      triggerToast(`Saved "${name}" into your dream wishlist!`);
    }
  };

  // Toggle hotel booking simulation
  const bookHotel = (id, name) => {
    if (bookedHotels.includes(id)) {
      setBookedHotels(bookedHotels.filter(item => item !== id));
      triggerToast(`Cancelled reservation for ${name}.`);
    } else {
      setBookedHotels([...bookedHotels, id]);
      triggerToast(`Successfully booked room at ${name}! Reservation Confirmed.`);
    }
  };

  // AI-Powered World Explorer Search (Calls Backend Gemini)
  const handleAiExplore = async (e) => {
    e.preventDefault();
    if (!aiSearchQuery.trim()) return;

    const normalQuery = aiSearchQuery.trim().toLowerCase();
    const existing = countries.find(c => 
      c.name.toLowerCase() === normalQuery || 
      c.id.toLowerCase() === normalQuery.replace(/[^a-z0-9]/g, "-")
    );

    if (existing) {
      setSelectedCountry(existing);
      setGeneratedItinerary(null);
      setAiSearchQuery("");
      triggerToast(`Loaded travel details for ${existing.name}!`);
      return;
    }

    setIsAiExploring(true);
    setAiError(null);

    try {
      const response = await fetch("/api/explore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: aiSearchQuery })
      });

      if (!response.ok) {
        throw new Error("Failed to explore destination via AI.");
      }

      const newCountryData = await response.json();
      
      // Update our list with newly generated smart country
      setCountries(prev => {
        const filtered = prev.filter(c => c.id !== newCountryData.id);
        return [newCountryData, ...filtered];
      });

      // Inject landmark and hotels generated by Gemini safely
      if (newCountryData.landmarks?.length) {
        setLandmarks(prev => [...newCountryData.landmarks, ...prev]);
      }
      if (newCountryData.hotels?.length) {
        setHotels(prev => [...newCountryData.hotels, ...prev]);
      }

      setSelectedCountry(newCountryData);
      setGeneratedItinerary(null); // Clear previous country static itinerary state
      setAiSearchQuery("");
      triggerToast(`✨ AI generated fresh travel details for ${newCountryData.name}!`);
    } catch (err) {
      setAiError(err.message || "An unexpected error occurred while contacting the AI helper.");
    } finally {
      setIsAiExploring(false);
    }
  };


  // AI-Powered Custom Day-by-Day Itinerary generator
  const triggerItineraryGenerator = async (countryName) => {
    setIsGeneratingItinerary(true);
    setItineraryError(null);
    setGeneratedItinerary(null);

    try {
      const response = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          durationDays: itineraryDays,
          style: itineraryStyle,
          budget: itineraryBudget,
          destination: countryName
        })
      });

      if (!response.ok) {
        throw new Error("Server had trouble designing your itinerary.");
      }

      const result = await response.json();
      setGeneratedItinerary(result);
      triggerToast(`✨ Designed custom ${result.durationDays}-Day itinerary in ${result.destination}!`);
    } catch (err) {
      setItineraryError(err.message || "Could not generate custom schedule.");
    } finally {
      setIsGeneratingItinerary(false);
    }
  };

 
  // Navigation callbacks
  const viewCountryDetails = async (country) => {
    setSelectedCountry(country);
    setGeneratedItinerary(null); // Reset itinerary preview for clean slate
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      // Fallback for custom sandboxes or virtual browsers that restrict scrollTo
      try {
        window.scrollTo(0, 0);
      } catch (err) {
      console.error("scrollTo fallback failed:", err);
    }
    }
   
    try {
      const response = await fetch(`/api/weather?q=${encodeURIComponent(country.name)}`);
      if (response.ok) {
        const liveWeather = await response.json();
        if (liveWeather && liveWeather.forecast) {
          setSelectedCountry(prev => {
            if (prev && prev.id === country.id) {
              return {
                ...prev,
                weather: liveWeather
              };
            }
            return prev;
          });
        }
      }
    } catch (err) {
      console.warn("Could not fetch live weather on country change:", err);
    }
  };



  // Filter & Search Logics
  const filteredCountries = countries
    .filter(country => {
      const lowerSearch = searchTerm.toLowerCase().trim();
      if (!lowerSearch) {
        const matchesCategory = selectedCategory === "All" || country.category === selectedCategory;
        return matchesCategory;
      }

      const matchesCountryCore = country.name.toLowerCase().includes(lowerSearch) ||
                                 country.description.toLowerCase().includes(lowerSearch) ||
                                 country.category.toLowerCase().includes(lowerSearch) ||
                                 country.language.toLowerCase().includes(lowerSearch) ||
                                 country.currency.toLowerCase().includes(lowerSearch);
      
      const matchesLandmark = landmarks.some(lm => 
        lm.countryId === country.id && 
        (lm.name.toLowerCase().includes(lowerSearch) || 
         lm.location.toLowerCase().includes(lowerSearch) ||
         lm.description.toLowerCase().includes(lowerSearch))
      );

      const matchesHotel = hotels.some(h => 
        h.countryId === country.id && 
        (h.name.toLowerCase().includes(lowerSearch) || 
         h.location.toLowerCase().includes(lowerSearch))
      );

      const matchesSearch = matchesCountryCore || matchesLandmark || matchesHotel;
      const matchesCategory = selectedCategory === "All" || country.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      if (sortBy === "rating") return b.rating - a.rating;
      return b.landmarksCount + b.hotelsCount - (a.landmarksCount + a.hotelsCount);
    });

  const filteredLandmarks = landmarks.filter(lm => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    const matchesSearch = lm.name.toLowerCase().includes(lowerSearch) || 
                          lm.location.toLowerCase().includes(lowerSearch) ||
                          lm.countryName.toLowerCase().includes(lowerSearch) ||
                          lm.description.toLowerCase().includes(lowerSearch) ||
                          lm.category.toLowerCase().includes(lowerSearch);
    return matchesSearch;
  });

  const filteredHotels = hotels.filter(hotel => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    const country = countries.find(c => c.id === hotel.countryId);
    const countryName = country ? country.name : "";
    const matchesSearch = hotel.name.toLowerCase().includes(lowerSearch) || 
                          hotel.location.toLowerCase().includes(lowerSearch) ||
                          countryName.toLowerCase().includes(lowerSearch) ||
                          hotel.amenities.some(am => am.toLowerCase().includes(lowerSearch));
    return matchesSearch;
  });

  const categories = ["All", "Beach", "Cultural", "Adventure", "Nature", "Winter"];

  return (
    <div id="travel-app-root" className="min-vh-100 bg-light text-dark d-flex flex-column">
      
      {/* Dynamic Toast Alerts using framer animation */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="position-fixed top-0 start-50 translate-middle-x z-3 bg-dark text-white px-4 py-3 rounded-pill shadow-lg d-flex align-items-center gap-2 border border-secondary"
            style={{ maxWidth: "90%" }}
          >
            <Sparkles className="text-warning shrink-0" style={{ width: "18px", height: "18px" }} />
            <span className="small font-sans fw-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>



      {/* MAIN LAYOUT */}
      <main className="flex-grow-1 pb-5">
        
        <AnimatePresence mode="wait">
          {selectedCountry ? (
            
            /* VIEW 1: COUNTRY DETAILS SHOWN */
            <motion.div
              key="country-details-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="container-xl pt-4"
              id="country-details-pane"
            >
              {/* Back button */}
              <button
                onClick={() => setSelectedCountry(null)}
                className="btn btn-white border rounded-3 text-dark mb-4 py-2 px-3 shadow-sm d-inline-flex align-items-center gap-2 fw-medium"
                style={{ fontSize: "13px" }}
              >
                <ArrowLeft className="text-primary" style={{ width: "16px", height: "16px" }} />
                <span>Back to Travel Dashboard</span>
              </button>

              {/* COVER SCENIC IMAGE WITH FALLBACKS */}
              <div className="position-relative overflow-hidden shadow rounded-4 mb-4 bg-light" style={{ height: "380px" }}>
                <img 
                  src={selectedCountry.coverImage} 
                  alt={selectedCountry.name} 
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, 'country', selectedCountry.name)}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                
                {/* Visual smooth gradient protection overlay */}
                <div className="position-absolute inset-0 gradient-overlay" style={{ top: 0, bottom: 0, left: 0, right: 0 }} />

                {/* Country core detail positioning */}
                <div className="position-absolute bottom-0 start-0 w-100 p-3 p-md-4 text-white z-2">
                  <div className="row align-items-end g-3">
                    <div className="col-12 col-md-8 text-start">
                      <span className="badge bg-primary mb-2 text-uppercase font-mono">
                        <Compass style={{ width: "11px", height: "11px", marginRight: "4px" }} />
                        {selectedCountry.category} Vacation
                      </span>
                      <h1 className="h2 m-0 text-white fw-bold d-flex align-items-center gap-2">
                        {selectedCountry.name} <span style={{ fontSize: "1.75rem" }}>{selectedCountry.flag}</span>
                      </h1>
                      <p className="m-0 mt-2 text-white-50 small" style={{ lineHeight: "1.5" }}>
                        {selectedCountry.description}
                      </p>
                    </div>

                    {/* Badges details layout */}
                    <div className="col-12 col-md-4 d-flex justify-content-start justify-content-md-end gap-2">
                      <div className="bg-white text-dark rounded-3 px-3 py-2 text-center shadow-sm" style={{ minWidth: "90px" }}>
                        <span className="text-muted text-uppercase font-mono block d-block mb-1" style={{ fontSize: "8px" }}>Expert Rating</span>
                        <span className="fw-bold text-warning fs-6">★ {selectedCountry.rating}</span>
                      </div>
                      <div className="bg-white text-dark rounded-3 px-3 py-2 text-center shadow-sm" style={{ minWidth: "100px" }}>
                        <span className="text-muted text-uppercase font-mono block d-block mb-1" style={{ fontSize: "8px" }}>Est Flight</span>
                        <span className="fw-bold text-dark text-truncate d-block" style={{ fontSize: "11px" }}>{selectedCountry.flightDuration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* THREE-COLUMN COMPACT LAYOUT FOR FACTS, WEATHER & SECRETS */}
              <div className="row g-4 mb-4">
                
                {/* 1. FACTUAL DIRECTORY SHEET */}
                <div className="col-12 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm p-3 rounded-4">
                    <h3 className="h6 fw-bold text-dark mb-3 pb-2 border-bottom d-flex align-items-center gap-2">
                      <Globe className="text-primary" style={{ width: "16px", height: "16px" }} />
                      Essential Facts Guide
                    </h3>

                    <div className="vstack gap-2" style={{ fontSize: "12px" }}>
                      <div className="d-flex justify-content-between align-items-center fact-item">
                        <span className="text-secondary font-mono">Official Language</span>
                        <span className="fw-bold text-dark">{selectedCountry.language}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center fact-item">
                        <span className="text-secondary font-mono">Local Currency</span>
                        <span className="fw-bold text-success">{selectedCountry.currency}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center fact-item">
                        <span className="text-secondary font-mono">Best Season</span>
                        <span className="fw-bold text-primary text-end truncate" style={{ maxWidth: "150px" }}>{(selectedCountry.bestSeason || "").split("(")[0] || "All Year"}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center fact-item">
                        <span className="text-secondary font-mono">Visa Guideline</span>
                        <span className="fw-bold text-secondary text-end truncate" style={{ maxWidth: "150px" }}>{selectedCountry.visaRequirement || "Exempt / e-Visa"}</span>
                      </div>
                    </div>

                    {/* Cultural safety etiquette instructions */}
                    <div className="mt-3 bg-warning bg-opacity-10 border border-warning-subtle rounded-3 p-3 text-start">
                      <span className="text-warning-emphasis fw-bold font-mono d-flex align-items-center gap-1 uppercase text-uppercase" style={{ fontSize: "10px" }}>
                        <BadgeAlert style={{ width: "14px", height: "14px" }} /> Etiquette Etchings
                      </span>
                      <div className="mt-2" style={{ fontSize: "11px", lineHeight: "1.4" }}>
                        {(selectedCountry.cultureTips || [
                          "Avoid standard tipping; general rates are already factored.",
                          "Dress modestly inside deep heritage spaces and structures.",
                          "Greet locals politely before requesting portrait features.",
                          "Keep offline maps downloaded while traveling rural trails."
                        ]).map((item, idx) => (
                          <p key={idx} className="m-0 mb-2 text-muted d-flex align-items-start gap-1">
                            <span className="text-warning fw-bold">•</span>
                            <span>{item}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. REGIONAL CLIMATE OUTLOOK */}
                <div className="col-12 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm p-3 rounded-4">
                    <h3 className="h6 fw-bold text-dark mb-3 pb-2 border-bottom d-flex align-items-center gap-2">
                      <Sun className="text-warning" style={{ width: "16px", height: "16px" }} />
                      Regional Climate
                    </h3>

                    {/* Temperature and atmosphere indicators */}
                    <div className="d-flex align-items-center justify-content-between p-3 bg-info bg-opacity-10 rounded-3 border border-info-subtle mb-3">
                      <div>
                        <span className="fs-3 fw-bold font-mono text-dark">{(selectedCountry.weather?.temp ?? "N/A")}°C</span>
                        <span className="text-uppercase text-muted font-mono d-block mt-1" style={{ fontSize: "9px" }}>{selectedCountry.weather?.condition ?? "Unmeasured"}</span>
                      </div>
                      <div className="bg-white rounded-3 shadow-sm d-flex align-items-center justify-content-center text-warning fw-bold" style={{ width: "42px", height: "42px" }}>
                        {selectedCountry.weather?.icon ? (
                          (typeof selectedCountry.weather.icon === "string" && selectedCountry.weather.icon.startsWith("http")) ? (
                            <img src={selectedCountry.weather.icon} alt={selectedCountry.weather.condition} style={{ width: "36px", height: "36px" }} referrerPolicy="no-referrer" />
                          ) : (
                            <span style={{ fontSize: "1.5rem" }}>{selectedCountry.weather.icon}</span>
                          )
                        ) : (
                          <span style={{ fontSize: "1.25rem" }}>⛅</span>
                        )}
                      </div>
                    </div>

                    <div className="row g-2 mb-3 text-start font-mono" style={{ fontSize: "11px" }}>
                      <div className="col-6">
                        <div className="bg-light p-2 rounded-3 border d-flex align-items-center gap-2">
                           <Droplets className="text-info shrink-0" style={{ width: "14px", height: "14px" }} />
                          <div>
                            <span className="text-muted d-block" style={{ fontSize: "8px" }}>Humidity</span>
                            <span className="fw-bold text-dark">{selectedCountry.weather?.humidity ?? "N/A"}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-light p-2 rounded-3 border d-flex align-items-center gap-2">
                           <Wind className="text-success shrink-0" style={{ width: "14px", height: "14px" }} />
                          <div>
                            <span className="text-muted d-block" style={{ fontSize: "8px" }}>Wind</span>
                            <span className="fw-bold text-dark">{selectedCountry.weather?.windSpeed ?? "N/A"} km/h</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 5 Day Forecast Grid */}
                    <div>
                      <span className="text-muted font-mono text-uppercase tracking-wider d-block mb-2 fw-bold" style={{ fontSize: "9px" }}>5-Day Outlook</span>
                      <div className="row g-1 text-center font-mono">
                        {selectedCountry.weather?.forecast?.map?.((fc, idx) => (
                          <div key={idx} className="col">
                            <div className="bg-light border rounded-3 p-1 d-flex flex-column align-items-center justify-content-between" style={{ minHeight: "82px" }}>
                              <span className="text-muted d-block text-uppercase" style={{ fontSize: "7.5px" }}>{fc.day}</span>
                              {fc?.icon ? (
                                (typeof fc.icon === "string" && fc.icon.startsWith("http")) ? (
                                  <img src={fc.icon} alt={fc.condition} style={{ width: "24px", height: "24px" }} referrerPolicy="no-referrer" />
                                ) : (
                                  <span style={{ fontSize: "14px" }}>{fc.icon}</span>
                                )
                              ) : (
                                <span style={{ fontSize: "10px" }}>⛅</span>
                              )}
                              <span className="fw-bold text-dark d-block mt-0.5" style={{ fontSize: "10.5px" }}>{fc?.temp}°</span>
                              <span className="text-muted text-truncate w-100" style={{ fontSize: "7px" }} title={fc?.condition}>{(fc?.condition || "Cloudy").split(" ")[0]}</span>
                            </div>
                          </div>
                        )) ?? <div className="col text-muted small p-2">Forecast not available</div>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. HERITAGE SECRETS */}
                <div className="col-12 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm p-3 rounded-4 d-flex flex-column justify-content-between">
                    <div>
                      <h3 className="h6 fw-bold text-dark mb-3 pb-2 border-bottom d-flex align-items-center gap-2">
                        <Bookmark className="text-success" style={{ width: "16px", height: "16px" }} />
                        History &amp; Local Secrets
                      </h3>

                      <div className="mb-3 text-start">
                        <h4 className="text-primary text-uppercase font-mono fw-bold mb-1" style={{ fontSize: "9px" }}>Chronicles &amp; Heritage</h4>
                        <p className="text-secondary small m-0" style={{ lineHeight: "1.4" }}>
                          {selectedCountry.history || "Boasting hundreds of years of independent administrative rule, sacred shrines, and pristine aesthetics, this is a beautiful spot."}
                        </p>
                      </div>

                      <div className="bg-success bg-opacity-10 border border-success-subtle p-3 rounded-3 text-start">
                        <h4 className="text-success-emphasis text-uppercase font-mono fw-bold mb-1" style={{ fontSize: "9px" }}>Off the Beaten Trail</h4>
                        <p className="text-dark small m-0 fst-italic" style={{ lineHeight: "1.4" }}>
                          " {selectedCountry.localSecret || "Seek out the beautiful local street café cluster up the steep mountain steps for fresh pastries and gorgeous sunset viewing."} "
                        </p>
                      </div>
                    </div>

                    <div className="text-muted font-mono text-center pt-3 mt-3 border-top" style={{ fontSize: "9px" }}>
                      Community sourced credentials verified
                    </div>
                  </div>
                </div>

              </div>

              {/* INTEGRATED SERVER-SIDE AI DAILY PLANNER BOX (GEMINI TRIGGER) */}
              <div id="ai-itinerary-generator-box" className="p-4 p-md-5 text-white rounded-4 mb-4 position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
                
                <div className="row g-4 align-items-stretch">
                  <div className="col-12 col-lg-8 text-start">
                    <span className="badge bg-white bg-opacity-10 border border-white border-opacity-10 text-info text-uppercase font-mono mb-2">
                      ✨ Live AI Companion
                    </span>
                    <h2 className="h4 text-white font-display fw-bold">
                      Design Custom Itinerary for {selectedCountry.name}
                    </h2>
                    <p className="text-white-50 small mb-4" style={{ maxW: "580px" }}>
                      Customize travel style, general budget target, and length. Our grounded model builds custom day-by-day sequence with local hacks and key phrases!
                    </p>

                    {/* Form selectors */}
                    <div className="row g-3 mb-4 text-dark font-mono text-start">
                      <div className="col-12 col-sm-4">
                        <label className="text-white-50 text-uppercase d-block mb-1 fw-bold" style={{ fontSize: "8px" }}>Length</label>
                        <select 
                          value={itineraryDays}
                          onChange={(e) => setItineraryDays(Number(e.target.value))}
                          className="form-select bg-dark text-white border-secondary small py-2 font-mono"
                          style={{ fontSize: "12px", borderRadius: "10px" }}
                        >
                          <option value="2">2 Days (Brief Tour)</option>
                          <option value="3">3 Days (Perfect Weekend)</option>
                          <option value="5">5 Days (Full Experience)</option>
                          <option value="7">7 Days (Comprehensive Escape)</option>
                        </select>
                      </div>

                      <div className="col-12 col-sm-4">
                        <label className="text-white-50 text-uppercase d-block mb-1 fw-bold" style={{ fontSize: "8px" }}>Desired Vibe</label>
                        <select 
                          value={itineraryStyle}
                          onChange={(e) => setItineraryStyle(e.target.value)}
                          className="form-select bg-dark text-white border-secondary small py-2 font-mono"
                          style={{ fontSize: "12px", borderRadius: "10px" }}
                        >
                          <option value="Leisure & Sightseeing">Leisure &amp; Sightseeing</option>
                          <option value="Culinary & Museum Tour">Culinary &amp; Culture</option>
                          <option value="High Adventure & Nature Trek">Wild Adventure</option>
                          <option value="Luxury & Thermal Rest">Luxury Relaxation</option>
                        </select>
                      </div>

                      <div className="col-12 col-sm-4">
                        <label className="text-white-50 text-uppercase d-block mb-1 fw-bold" style={{ fontSize: "8px" }}>Select Budget</label>
                        <select 
                          value={itineraryBudget}
                          onChange={(e) => setItineraryBudget(e.target.value)}
                          className="form-select bg-dark text-white border-secondary small py-2 font-mono"
                          style={{ fontSize: "12px", borderRadius: "10px" }}
                        >
                          <option value="Backpacker / Economical">Backpacker Econ</option>
                          <option value="Comfort / Standard">Comfort / Moderate</option>
                          <option value="Premium / No Constraints">Exclusive Luxury</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => triggerItineraryGenerator(selectedCountry.name)}
                      disabled={isGeneratingItinerary}
                      className="btn btn-primary-gradient px-4 py-3 rounded-3 text-white fw-bold font-mono transition-all border-0 shadow-sm"
                      style={{ fontSize: "12px" }}
                    >
                      {isGeneratingItinerary ? (
                        <span className="d-flex align-items-center gap-2">
                          <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true" />
                          <span>Gemini is planning your vacation...</span>
                        </span>
                      ) : (
                        <span className="d-flex align-items-center gap-2">
                          <Sparkles className="text-white animate-pulse" style={{ width: "16px", height: "16px" }} />
                          <span>Generate Custom Travel Plan</span>
                        </span>
                      )}
                    </button>

                    {itineraryError && (
                      <div className="mt-3 text-danger font-mono bg-danger bg-opacity-10 border border-danger-subtle p-2 rounded-3" style={{ fontSize: "11px" }}>
                        ⚠️ Planning Error: {itineraryError}
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-lg-4 text-start">
                    <div className="bg-white p-4 h-100 rounded-4 d-flex flex-column justify-content-between shadow-lg border border-white">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="badge bg-dark text-warning font-mono text-uppercase px-2.5 py-1.5" style={{ fontSize: "9px", letterSpacing: "0.5px" }}>Traveler Logic</span>
                          <Luggage className="text-primary" style={{ width: "18px", height: "18px" }} />
                        </div>
                        <p className="text-dark fw-bold m-0" style={{ lineHeight: "1.5", fontSize: "12.5px" }}>
                          "Your travel planner connects live environmental data, continental timings, and local recommendations to compose a logical day-by-day sequence for {selectedCountry.name}."
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-top border-light d-flex align-items-center justify-content-between text-success fw-bold font-mono">
                        <span style={{ fontSize: "11.5px" }}>✓ Curated Safely</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI RENDERED PLANNER DISPLAY CONTENT */}
                <AnimatePresence>
                  {generatedItinerary && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-top border-secondary border-opacity-50 text-start"
                    >
                      <div className="bg-black bg-opacity-40 p-3 p-md-4 rounded-3 border border-secondary border-opacity-40">
                        
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-3 pb-3 border-bottom border-secondary border-opacity-40">
                          <div>
                            <span className="text-info text-uppercase font-mono fw-bold tracking-wide" style={{ fontSize: "9px" }}>Personalized Companion Guide</span>
                            <h3 className="h5 text-white fw-bold m-0 mt-1">Your {generatedItinerary.durationDays}-Day Schedule</h3>
                          </div>
                          
                          <div className="d-flex gap-2 font-mono" style={{ fontSize: "10px" }}>
                            <span className="bg-secondary bg-opacity-25 border px-2 py-1 rounded text-white fw-bold">Vibe: {generatedItinerary.style}</span>
                            <span className="bg-success bg-opacity-25 border border-success-subtle px-2 py-1 rounded text-success fw-bold">Budget: {generatedItinerary.budgetSelection}</span>
                          </div>
                        </div>

                        {/* Summary overview */}
                        <p className="text-white small fw-medium p-3 bg-dark bg-opacity-40 rounded-3 border border-indigo-900 border-opacity-20 mb-4 animate-fade-in" style={{ lineHeight: "1.4" }}>
                          "{generatedItinerary.summary}"
                        </p>

                        <div className="row g-3 mb-4">
                          
                          {/* Left Checklist pane */}
                          <div className="col-12 col-md-4">
                            <div className="bg-dark p-3 rounded-3 border h-100">
                              <span className="text-info text-uppercase font-mono fw-bold d-block mb-2" style={{ fontSize: "9px" }}>🎒 Packing Essentials</span>
                              <ul className="list-unstyled text-white small p-0 m-0">
                                {generatedItinerary.packingList.map((item, idx) => (
                                  <li key={idx} className="mb-2 d-flex align-items-center gap-2">
                                    <span className="badge bg-primary rounded-circle p-0 text-white" style={{ width: "12px", height: "12px" }}>✓</span>
                                    <span className="fw-medium text-white">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Key local phrases */}
                          <div className="col-12 col-md-8">
                            <div className="bg-dark p-3 rounded-3 border h-100">
                              <span className="text-warning text-uppercase font-mono fw-bold d-block mb-2" style={{ fontSize: "9px" }}>🗣️ Local Express Greetings</span>
                              <div className="row g-2">
                                {generatedItinerary.localPhrases.map((item, idx) => (
                                  <div key={idx} className="col-12 col-sm-4">
                                    <div className="bg-black bg-opacity-30 border border-secondary border-opacity-20 rounded p-2 text-start">
                                      <span className="fw-extrabold text-white small d-block text-truncate">{item.phrase}</span>
                                      <span className="text-light text-opacity-95 d-block fw-semibold" style={{ fontSize: "10.5px" }}>"{item.translation}"</span>
                                      <span className="text-info font-mono d-block mt-1 fw-bold" style={{ fontSize: "9px" }}>Pronounce: {item.pronunciation}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Daily active timeline details */}
                        <div className="vstack gap-3 text-start">
                          <span className="text-white font-mono text-uppercase tracking-wider d-block fw-extrabold" style={{ fontSize: "9.5px" }}>Daily Sequences</span>
                          
                          {generatedItinerary.itinerary.map((day, idx) => (
                            <div key={idx} className="bg-dark bg-opacity-50 border border-secondary border-opacity-30 p-3 rounded-3">
                              <div className="d-flex align-items-center justify-content-between border-bottom border-secondary border-opacity-30 pb-2 mb-3">
                                <span className="small font-mono fw-extrabold text-info text-uppercase">DAY {day.day}</span>
                                <span className="small text-white font-display fw-extrabold text-opacity-95">{day.theme}</span>
                              </div>

                              <div className="row g-2">
                                {day.activities.map((act, actIdx) => (
                                  <div key={actIdx} className="col-12 col-sm-4">
                                    <div className="bg-black bg-opacity-30 border px-3 py-3 rounded-3 h-100 d-flex flex-column justify-content-between text-start">
                                      <div>
                                        <span className="text-warning font-mono d-block mb-1 text-uppercase fw-bold" style={{ fontSize: "9.5px", letterSpacing: "0.2px" }}>⏱ {act.time}</span>
                                        <h5 className="text-white small fw-extrabold mb-1.5 leading-tight" style={{ fontSize: "13px" }}>{act.activity}</h5>
                                        <p className="text-light d-flex align-items-center gap-1 mb-2 text-truncate fw-bold" style={{ fontSize: "11px" }}>
                                          <MapPin className="text-info shrink-0" style={{ width: "12px", height: "12px" }} />
                                          <span className="text-truncate">{act.location}</span>
                                        </p>
                                        <p className="text-white small m-0 leading-normal fw-normal" style={{ fontSize: "12.5px" }}>{act.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIGHTS & LANDMAKS OF COUNTRY */}
              <div className="my-5 text-start">
                <div className="mb-4">
                  <span className="badge bg-primary text-uppercase font-mono mb-1">Experiences Gallery</span>
                  <h3 className="h4 fw-bold text-dark font-display">Landmarks in {selectedCountry.name}</h3>
                </div>

                <div className="row g-4">
                  {landmarks
                    .filter(lm => lm.countryId === selectedCountry.id)
                    .map(lm => (
                      <div key={lm.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column justify-content-between">
                          <div>
                            <div className="position-relative bg-light" style={{ height: "190px" }}>
                              <img 
                                src={lm.image} 
                                alt={lm.name} 
                                referrerPolicy="no-referrer"
                                onError={(e) => handleImageError(e, 'landmark')}
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                              />
                              {lm.unesco && (
                                <span className="position-absolute bg-primary text-white font-mono fw-bold text-uppercase px-2 py-0.5 rounded" style={{ top: "12px", left: "12px", fontSize: "8px" }}>
                                  UNESCO Heritage
                                </span>
                              )}
                              <button
                                onClick={() => toggleWishlist(lm.id, lm.name)}
                                className="position-absolute border-0 rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm"
                                style={{ top: "12px", right: "12px", width: "32px", height: "32px", padding: 0 }}
                              >
                                <Heart style={{ width: "16px", height: "16px" }} className={wishlist.includes(lm.id) ? "fill-danger text-danger" : "text-muted"} />
                              </button>
                            </div>

                            <div className="p-3">
                              <span className="badge bg-info-subtle text-info-emphasis text-uppercase font-mono mb-2" style={{ fontSize: "8px" }}>
                                {lm.category}
                              </span>
                              <h4 className="h6 fw-bold text-dark mb-1">{lm.name}</h4>
                              <p className="text-secondary small d-flex align-items-center gap-1 mb-2" style={{ fontSize: "11px" }}>
                                <MapPin className="text-primary shrink-0" style={{ width: "12px", height: "12px" }} />
                                <span>{lm.location}</span>
                              </p>
                              <p className="text-secondary small mb-3 text-clamp-2">
                                {lm.description}
                              </p>

                              <div className="bg-light border p-2 rounded-3 text-start small text-dark" style={{ fontSize: "11px" }}>
                                <strong className="text-primary">Insiders secret: </strong>
                                {lm.funFact}
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center font-mono" style={{ fontSize: "11px" }}>
                            <span className="text-dark">Rating: <strong className="text-warning">★ {lm.rating}</strong></span>
                            <span className="text-muted">{lm.annualVisitors} Visitors / yr</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* RECOMMENDED LODGING STAYS OF SPECIFIC COUNTRY */}
              <div className="my-5 text-start">
                <div className="mb-4">
                  <span className="badge bg-primary text-uppercase font-mono mb-1">Handpicked Selection</span>
                  <h3 className="h4 fw-bold text-dark font-display">Recommended Lodges in {selectedCountry.name}</h3>
                </div>

                <div className="row g-4">
                  {hotels
                    .filter(ht => ht.countryId === selectedCountry.id)
                    .map(hotel => (
                      <div key={hotel.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column justify-content-between">
                          <div>
                            <div className="position-relative bg-light" style={{ height: "190px" }}>
                              <img 
                                src={hotel.image} 
                                alt={hotel.name} 
                                referrerPolicy="no-referrer"
                                onError={(e) => handleImageError(e, 'hotel')}
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                              />
                              <div className="position-absolute bg-white px-2 py-0.5 rounded shadow-sm border text-warning fw-bold font-mono" style={{ top: "12px", left: "12px", fontSize: "9px" }}>
                                {"★".repeat(Math.max(1, Math.min(5, Math.floor(hotel.stars) || 5)))}
                              </div>
                            </div>

                            <div className="p-3">
                              <div className="d-flex justify-content-between align-items-start gap-1 mb-1">
                                <h4 className="h6 fw-bold text-dark m-0 flex-grow-1">{hotel.name}</h4>
                                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle font-mono shrink-0">{hotel.rating}/10</span>
                              </div>
                              <p className="text-secondary small d-flex align-items-center gap-1 mb-2" style={{ fontSize: "11px" }}>
                                <MapPin className="text-primary shrink-0" style={{ width: "12px", height: "12px" }} />
                                <span>{hotel.location}</span>
                              </p>

                              <div className="d-flex flex-wrap gap-1 mb-3">
                                {hotel.amenities.map((am, i) => (
                                  <span key={i} className="badge bg-light border text-secondary font-mono" style={{ fontSize: "8px" }}>
                                    {am}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center text-start">
                            <div className="font-mono">
                              <span className="text-muted d-block uppercase text-uppercase" style={{ fontSize: "8px" }}>Base rate</span>
                              <span className="fw-bold text-dark fs-6 font-mono">${hotel.pricePerNight} <span className="text-muted fw-normal" style={{ fontSize: "9px" }}>/ night</span></span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedHotel(hotel);
                                setHotelActiveTab("overview");
                              }}
                              className="btn py-1.5 px-3 rounded-3 fw-bold font-mono small transition-all btn-primary-gradient text-white border-0 shadow-sm d-flex align-items-center gap-1"
                              style={{ fontSize: "11.5px" }}
                            >
                              <span>Hotel Info</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </motion.div>
          ) : (
            
            /* VIEW 2: PRIMARY TRAVEL DASHBOARD HOME */
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-100 d-flex flex-column pt-0"
              id="travel-dashboard"
            >
              
              {/* CURATED SCENIC HERO CONTAINER */}
              <div 
                id="hero-wrapper"
                className="position-relative w-100 py-5 mb-5 border-bottom border-light"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2200&q=90')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* Overlay protection */}
                <div className="position-absolute inset-0 bg-dark opacity-75" style={{ top: 0, bottom: 0, left: 0, right: 0 }} />

                <div className="position-relative z-2 container-xl px-4 text-start py-4">
                  <div className="row align-items-center g-4 justify-content-between">
                    
                    <div className="col-12 col-lg-7">
                      <span className="badge bg-white bg-opacity-10 text-white border border-white border-opacity-15 px-3 py-2 text-uppercase font-mono mb-3" style={{ fontSize: "9px" }}>
                        🗺️ Travel Journal &amp; Discovery Hub
                      </span>
                      <h2 className="display-5 font-display fw-black text-white m-0 tracking-tight leading-tight mb-2" style={{ textTransform: "none" }}>
                        Discover Your Next <span className="text-warning">Destination</span>
                      </h2>
                      <h3 className="h4 font-display text-white text-opacity-80 mb-3 fw-medium" style={{ letterSpacing: "-0.5px" }}>
                        Explore Countries, Culture &amp; Hidden Gems
                      </h3>
                      <p className="text-white-50 small mb-4" style={{ maxWidth: "520px", lineHeight: "1.6" }}>
                        Plan journeys around places you’ll love. Query standard destinations, or invoke the generative intelligence of <strong className="text-info">Gemini AI</strong> to research custom local itineraries, landmarks, and hotel guides in seconds!
                      </p>

                      {/* DYNAMIC WORLD AI DISCOVERY BOX FORM */}
                      <form onSubmit={handleAiExplore} className="input-group custom-input-group shadow-sm" style={{ maxWidth: "460px" }}>
                        <span className="input-group-text bg-transparent border-0 pe-1 ps-3 d-flex align-items-center justify-content-center">
                          <Globe className="text-muted" style={{ width: "16px", height: "16px" }} />
                        </span>
                        <input 
                          type="text" 
                          placeholder="Type or select any nation... e.g. Egypt, , Iceland"
                          value={aiSearchQuery}
                          onChange={(e) => setAiSearchQuery(e.target.value)}
                          className="form-control custom-input-control py-3"
                          style={{ boxShadow: "none" }}
                          list="world-countries"
                        />
                        <datalist id="world-countries">
                          <option value="Afghanistan" />
                          <option value="Albania" />
                          <option value="Algeria" />
                          <option value="Andorra" />
                          <option value="Angola" />
                          <option value="Antigua and Barbuda" />
                          <option value="Argentina" />
                          <option value="Armenia" />
                          <option value="Australia" />
                          <option value="Austria" />
                          <option value="Azerbaijan" />
                          <option value="Bahamas" />
                          <option value="Bahrain" />
                          <option value="Bangladesh" />
                          <option value="Barbados" />
                          <option value="Belarus" />
                          <option value="Belgium" />
                          <option value="Belize" />
                          <option value="Benin" />
                          <option value="Bhutan" />
                          <option value="Bolivia" />
                          <option value="Bosnia and Herzegovina" />
                          <option value="Botswana" />
                          <option value="Brazil" />
                          <option value="Brunei" />
                          <option value="Bulgaria" />
                          <option value="Burkina Faso" />
                          <option value="Burundi" />
                          <option value="Cabo Verde" />
                          <option value="Cambodia" />
                          <option value="Cameroon" />
                          <option value="Canada" />
                          <option value="Central African Republic" />
                          <option value="Chad" />
                          <option value="Chile" />
                          <option value="China" />
                          <option value="Colombia" />
                          <option value="Comoros" />
                          <option value="Congo" />
                          <option value="Costa Rica" />
                          <option value="Croatia" />
                          <option value="Cuba" />
                          <option value="Cyprus" />
                          <option value="Czech Republic" />
                          <option value="Denmark" />
                          <option value="Djibouti" />
                          <option value="Dominica" />
                          <option value="Dominican Republic" />
                          <option value="East Timor" />
                          <option value="Ecuador" />
                          <option value="Egypt" />
                          <option value="El Salvador" />
                          <option value="Equatorial Guinea" />
                          <option value="Eritrea" />
                          <option value="Estonia" />
                          <option value="Eswatini" />
                          <option value="Ethiopia" />
                          <option value="Fiji" />
                          <option value="Finland" />
                          <option value="France" />
                          <option value="Gabon" />
                          <option value="Gambia" />
                          <option value="Georgia" />
                          <option value="Germany" />
                          <option value="Ghana" />
                          <option value="Greece" />
                          <option value="Grenada" />
                          <option value="Guatemala" />
                          <option value="Guinea" />
                          <option value="Guinea-Bissau" />
                          <option value="Guyana" />
                          <option value="Haiti" />
                          <option value="Honduras" />
                          <option value="Hungary" />
                          <option value="Iceland" />
                          <option value="India" />
                          <option value="Indonesia" />
                          <option value="Iran" />
                          <option value="Iraq" />
                          <option value="Ireland" />
                          <option value="Israel" />
                          <option value="Italy" />
                          <option value="Ivory Coast" />
                          <option value="Jamaica" />
                          <option value="Japan" />
                          <option value="Jordan" />
                          <option value="Kazakhstan" />
                          <option value="Kenya" />
                          <option value="Kiribati" />
                          <option value="Kuwait" />
                          <option value="Kyrgyzstan" />
                          <option value="Laos" />
                          <option value="Latvia" />
                          <option value="Lebanon" />
                          <option value="Lesotho" />
                          <option value="Liberia" />
                          <option value="Libya" />
                          <option value="Liechtenstein" />
                          <option value="Lithuania" />
                          <option value="Luxembourg" />
                          <option value="Madagascar" />
                          <option value="Malawi" />
                          <option value="Malaysia" />
                          <option value="Maldives" />
                          <option value="Mali" />
                          <option value="Malta" />
                          <option value="Marshall Islands" />
                          <option value="Mauritania" />
                          <option value="Mauritius" />
                          <option value="Mexico" />
                          <option value="Micronesia" />
                          <option value="Moldova" />
                          <option value="Monaco" />
                          <option value="Mongolia" />
                          <option value="Montenegro" />
                          <option value="Morocco" />
                          <option value="Mozambique" />
                          <option value="Myanmar" />
                          <option value="Namibia" />
                          <option value="Nauru" />
                          <option value="Nepal" />
                          <option value="Netherlands" />
                          <option value="New Zealand" />
                          <option value="Nicaragua" />
                          <option value="Niger" />
                          <option value="Nigeria" />
                          <option value="North Korea" />
                          <option value="North Macedonia" />
                          <option value="Norway" />
                          <option value="Oman" />
                          <option value="Pakistan" />
                          <option value="Palau" />
                          <option value="Palestine" />
                          <option value="Panama" />
                          <option value="Papua New Guinea" />
                          <option value="Paraguay" />
                          <option value="Peru" />
                          <option value="Philippines" />
                          <option value="Poland" />
                          <option value="Portugal" />
                          <option value="Qatar" />
                          <option value="Romania" />
                          <option value="Russia" />
                          <option value="Rwanda" />
                          <option value="Saint Kitts and Nevis" />
                          <option value="Saint Lucia" />
                          <option value="Saint Vincent" />
                          <option value="Samoa" />
                          <option value="San Marino" />
                          <option value="Sao Tome and Principe" />
                          <option value="Saudi Arabia" />
                          <option value="Senegal" />
                          <option value="Serbia" />
                          <option value="Seychelles" />
                          <option value="Sierra Leone" />
                          <option value="Singapore" />
                          <option value="Slovakia" />
                          <option value="Slovenia" />
                          <option value="Solomon Islands" />
                          <option value="Somalia" />
                          <option value="South Africa" />
                          <option value="South Korea" />
                          <option value="South Sudan" />
                          <option value="Spain" />
                          <option value="Sri Lanka" />
                          <option value="Sudan" />
                          <option value="Suriname" />
                          <option value="Sweden" />
                          <option value="Switzerland" />
                          <option value="Syria" />
                          <option value="Taiwan" />
                          <option value="Tajikistan" />
                          <option value="Tanzania" />
                          <option value="Thailand" />
                          <option value="Togo" />
                          <option value="Tonga" />
                          <option value="Trinidad and Tobago" />
                          <option value="Tunisia" />
                          <option value="Turkey" />
                          <option value="Turkmenistan" />
                          <option value="Tuvalu" />
                          <option value="Uganda" />
                          <option value="Ukraine" />
                          <option value="United Arab Emirates" />
                          <option value="United Kingdom" />
                          <option value="United States" />
                          <option value="Uruguay" />
                          <option value="Uzbekistan" />
                          <option value="Vanuatu" />
                          <option value="Vatican City" />
                          <option value="Venezuela" />
                          <option value="Vietnam" />
                          <option value="Yemen" />
                          <option value="Zambia" />
                          <option value="Zimbabwe" />
                        </datalist>
                        <button
                          type="submit"
                          disabled={isAiExploring}
                          className="btn btn-light fw-bold font-mono px-3"
                          style={{ borderRadius: "0.5rem", fontSize: "11px" }}
                        >
                          {isAiExploring ? (
                            <span className="d-flex align-items-center gap-1">
                              <span className="spinner-border spinner-border-sm text-dark" role="status" />
                              <span className="d-none d-sm-inline">Generating...</span>
                            </span>
                          ) : (
                            <span className="d-flex align-items-center gap-1">
                              <Sparkles className="text-primary animate-pulse" style={{ width: "14px", height: "14px" }} />
                              <span>Explore via AI</span>
                            </span>
                          )}
                        </button>
                      </form>

                      {aiError && (
                        <div className="mt-3 text-warning-emphasis font-mono bg-warning bg-opacity-10 border border-warning-subtle p-2 rounded-3 text-start small" style={{ fontSize: "11px" }}>
                          ℹ️ {aiError}
                        </div>
                      )}
                    </div>

                    {/* Right features intelligence box */}
                    <div className="col-12 col-lg-4 text-start">
                      <div className="bg-white p-4 rounded-4 shadow-sm border border-white border-opacity-50">
                        <span className="badge bg-dark text-warning font-mono text-uppercase px-2.5 py-1.5 mb-3" style={{ fontSize: "9px", letterSpacing: "0.5px" }}>Live Intelligence Indicators</span>
                        
                        <div className="vstack gap-3">
                          <div className="d-flex gap-2">
                            <span className="badge bg-primary rounded-circle p-0 d-flex align-items-center justify-content-center shrink-0 text-white" style={{ width: "18px", height: "18px", fontSize: "10px" }}>✓</span>
                            <div>
                              <p className="fw-extrabold text-dark small m-0" style={{ fontSize: "13px", color: "#1e293b" }}>Full-Stack Synthesis</p>
                              <p className="m-0 text-dark fw-bold mt-0.5" style={{ fontSize: "11.5px", color: "#0f172a", lineHeight: "1.45" }}>Designs customized facts, history, weather outlooks, and secrets</p>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <span className="badge bg-primary rounded-circle p-0 d-flex align-items-center justify-content-center shrink-0 text-white" style={{ width: "18px", height: "18px", fontSize: "10px" }}>✓</span>
                            <div>
                              <p className="fw-extrabold text-dark small m-0" style={{ fontSize: "13px", color: "#1e293b" }}>Secure Fallback Media</p>
                              <p className="m-0 text-dark fw-bold mt-0.5" style={{ fontSize: "11.5px", color: "#0f172a", lineHeight: "1.45" }}>Resolves beautiful scenery photos with offline backup assets</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* CENTERED LAYOUT CONTAINER */}
              <div className="container-xl px-4">

                {/* SEARCH & ACCORDION FILTER SYSTEM BAR (CRISP LIGHT COHESION) */}
                <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 mb-4 text-start">
                  <div className="row g-3 align-items-center justify-content-between">
                    
                    {/* Input filters */}
                    <div className="col-12 col-md-7">
                      <div className="custom-input-group bg-light">
                        <span className="input-group-text bg-transparent border-0 pe-1 ps-3 d-flex align-items-center justify-content-center">
                          <Search className="text-muted" style={{ width: "16px", height: "16px" }} />
                        </span>
                        <input 
                          type="text" 
                          placeholder="Filter destinations or landmarks by keyword... e.g. temple, thermal, beach"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="form-control custom-input-control w-100"
                        />
                      </div>
                    </div>

                    {/* Sorting selector */}
                    <div className="col-12 col-md-4 col-lg-3 text-end">
                      <div className="d-flex align-items-center gap-2 justify-content-md-end">
                        <SlidersHorizontal className="text-secondary shrink-0" style={{ width: "14px", height: "14px" }} />
                        <span className="small text-secondary font-mono d-none d-sm-inline">Sort:</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="form-select border rounded-3 p-2 font-mono small text-dark"
                          style={{ fontSize: "12px", width: "auto" }}
                        >
                          <option value="popular">Popularity Score (High)</option>
                          <option value="rating">Expert Rating Outlets</option>
                          <option value="alphabetical">Continental Alphabetical</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Categories badges selection list */}
                  <div className="d-flex align-items-center gap-2 mt-3 overflow-auto pb-1 text-start" style={{ whiteSpace: "nowrap" }}>
                    <span className="text-uppercase text-muted font-mono fw-bold me-2" style={{ fontSize: "8px" }}>Vacation style:</span>
                    {categories.map((cat) => {
                      const isActive = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`btn btn-sm py-1.5 px-3 rounded-pill fw-semibold small transition-all border ${
                            isActive
                              ? "btn-primary-gradient border-0 text-white shadow-sm"
                              : "btn-light text-muted border-light"
                          }`}
                          style={{ fontSize: "11px" }}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  
                  </div>
                </div>

                {/* NAVIGATION TABS (Destinations / Landmarks / Hotels) */}
                <div className="d-flex border-bottom mb-4 align-items-center justify-content-between font-mono" style={{ fontSize: "13px" }}>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => setActiveTab("countries")}
                      className={`btn border-0 py-2.5 px-2 px-sm-3 nav-tab-custom ${
                        activeTab === "countries" ? "active text-primary fw-bold" : "text-secondary"
                      }`}
                    >
                      <span className="d-flex align-items-center gap-1">🗺️ Destinations <span className="badge bg-light text-dark border ms-1">{filteredCountries.length}</span></span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("landmarks")}
                      className={`btn border-0 py-2.5 px-2 px-sm-3 nav-tab-custom ${
                        activeTab === "landmarks" ? "active text-primary fw-bold" : "text-secondary"
                      }`}
                    >
                      <span className="d-flex align-items-center gap-1">📍 Landmarks <span className="badge bg-light text-dark border ms-1">{filteredLandmarks.length}</span></span>
                    </button>

                    <button
                      onClick={() => setActiveTab("hotels")}
                      className={`btn border-0 py-2.5 px-2 px-sm-3 nav-tab-custom ${
                        activeTab === "hotels" ? "active text-primary fw-bold" : "text-secondary"
                      }`}
                    >
                      <span className="d-flex align-items-center gap-1">🏨 Hotels <span className="badge bg-light text-dark border ms-1">{filteredHotels.length}</span></span>
                    </button>
                  </div>

                  <span className="text-muted d-none d-md-inline" style={{ fontSize: "9px" }}>
                    Showing curated {selectedCategory} inclusions
                  </span>
                </div>

                {/* DYNAMIC CONTENT GRID DISPLAY */}
                <AnimatePresence mode="wait">
                  
                  {/* LIST A: CURATED DESTINATIONS */}
                  {activeTab === "countries" && (
                    <motion.div
                      key="countries-list-cards"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="row g-4"
                    >
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <div key={country.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 card-destination d-flex flex-column justify-content-between text-start shadow-sm border-0">
                              <div>
                                <div className="position-relative bg-light" style={{ height: "180px" }}>
                                  <img 
                                    src={country.coverImage} 
                                    alt={country.name} 
                                    referrerPolicy="no-referrer"
                                    onError={(e) => handleImageError(e, 'country', country.name)}
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                  />
                                  <div className="position-absolute bg-white border px-2.5 py-1 rounded-pill text-dark fw-bold d-flex align-items-center gap-1.5 shadow-sm" style={{ top: "12px", left: "12px", fontSize: "11px" }}>
                                    <span>{country.flag}</span>
                                    <span className="font-sans small">{country.category}</span>
                                  </div>

                                  <div className="position-absolute bottom-0 start-0 end-0 p-3 d-flex justify-content-between align-items-center text-white z-2" style={{ fontSize: "11px", background: "linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0) 100%)" }}>
                                    <span className="fw-bold font-mono">
                                      ⛅ Temp: {country.weather?.temp ?? "N/A"}°C
                                    </span>
                                    <span className="small truncate font-mono" style={{ maxWidth: "120px" }}>{country.weather?.condition ?? "Cloudy"}</span>
                                  </div>
                                </div>

                                <div className="p-3">
                                  <h3 
                                    onClick={() => viewCountryDetails(country)}
                                    className="h5 text-dark fw-bold mb-2 cursor-pointer font-display d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer", letterSpacing: "-0.01em" }}
                                  >
                                    <span className="d-flex align-items-center gap-2">
                                      <span style={{ fontSize: "1.3rem" }}>{country.flag}</span>
                                      <span>{country.name}</span>
                                    </span>
                                    <span className="text-primary font-sans small fw-normal" style={{ fontSize: "12px" }}>View &rarr;</span>
                                  </h3>
                                  <p className="text-secondary small mb-3 text-clamp-2" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                                    {country.description}
                                  </p>

                                  <div className="row g-2 text-muted font-mono bg-light p-2.5 rounded-3 border border-light-subtle" style={{ fontSize: "10px" }}>
                                    <div className="col-6 truncate">
                                      <span className="text-muted d-block" style={{ fontSize: "8px", textTransform: "uppercase" }}>Language:</span>
                                      <strong className="text-dark d-block truncate font-sans fw-semibold">{country.language}</strong>
                                    </div>
                                    <div className="col-6 truncate">
                                      <span className="text-muted d-block" style={{ fontSize: "8px", textTransform: "uppercase" }}>Best Time:</span>
                                      <strong className="text-primary d-block truncate font-sans fw-semibold">{(country.bestSeason || "").split("(")[0] || "All Year"}</strong>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="p-3 bg-light border-top d-flex align-items-center justify-content-between font-mono" style={{ fontSize: "11px" }}>
                                <div className="d-flex gap-1.5 text-dark font-sans fw-semibold" style={{ fontSize: "10.5px" }}>
                                  <span className="bg-white px-2 py-1.5 rounded border border-light-subtle shadow-sm">📍 <span>{country.landmarksCount}</span> Sights</span>
                                  <span className="bg-white px-2 py-1.5 rounded border border-light-subtle shadow-sm">🏨 <span>{country.hotelsCount}</span> Lodges</span>
                                </div>
                                <button
                                  onClick={() => viewCountryDetails(country)}
                                  className="btn btn-primary-gradient btn-sm px-3.5 py-1.5 rounded-3 fw-bold font-sans transition-all text-white border-0 shadow-sm"
                                  style={{ fontSize: "11.5px", letterSpacing: "-0.01em" }}
                                >
                                  Explore Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 py-5 text-center bg-white rounded-3 border">
                          <div className="fs-1 text-muted mb-2">🗺️</div>
                          <h4 className="h5 fw-bold text-dark mb-1">No Curated Destinations Available</h4>
                          <p className="text-muted small mx-auto" style={{ maxWidth: "340px" }}>Change safety filter criteria or create a brand new location globally via the top-most AI Generation bar!</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* LIST B: LANDMARKS */}
                  {activeTab === "landmarks" && (
                    <motion.div
                      key="landmarks-list-cards"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="row g-4"
                    >
                      {filteredLandmarks.length > 0 ? (
                        filteredLandmarks.map((lm) => (
                          <div key={lm.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 card-destination d-flex flex-column justify-content-between text-start shadow-sm border-0">
                              <div>
                                <div className="position-relative bg-light" style={{ height: "180px" }}>
                                  <img 
                                    src={lm.image} 
                                    alt={lm.name} 
                                    referrerPolicy="no-referrer"
                                    onError={(e) => handleImageError(e, 'landmark')}
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                  />
                                  {lm.unesco && (
                                    <span className="position-absolute bg-primary text-white font-mono fw-bold text-uppercase px-2 py-0.5 rounded" style={{ top: "12px", left: "12px", fontSize: "8px" }}>
                                      UNESCO Heritage
                                    </span>
                                  )}
                                  <button
                                    onClick={() => toggleWishlist(lm.id, lm.name)}
                                    className="position-absolute border-0 rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm"
                                    style={{ top: "12px", right: "12px", width: "32px", height: "32px", padding: 0 }}
                                  >
                                    <Heart style={{ width: "16px", height: "16px" }} className={wishlist.includes(lm.id) ? "fill-danger text-danger" : "text-muted"} />
                                  </button>
                                </div>

                                <div className="p-3">
                                  <span className="badge bg-info-subtle text-info-emphasis text-uppercase font-mono mb-2" style={{ fontSize: "8px" }}>
                                    {lm.category}
                                  </span>
                                  <h4 className="h6 fw-bold text-dark mb-1">{lm.name}</h4>
                                  <p className="text-secondary small d-flex align-items-center gap-1 mb-2" style={{ fontSize: "11px" }}>
                                    <MapPin className="text-primary shrink-0" style={{ width: "12px", height: "12px" }} />
                                    <span>{lm.location}, {lm.countryName}</span>
                                  </p>
                                  <p className="text-secondary small mb-3 text-clamp-2">
                                    {lm.description}
                                  </p>

                                  <div className="bg-light border p-2 rounded-3 text-start small text-dark" style={{ fontSize: "11px" }}>
                                    <strong className="text-primary">Insiders tip: </strong> {lm.funFact}
                                  </div>
                                </div>
                              </div>

                              <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center font-mono" style={{ fontSize: "11px" }}>
                                <span className="text-dark">Rating: <strong className="text-warning">★ {lm.rating}</strong></span>
                                <span className="text-muted">{lm.annualVisitors} Visitors / yr</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 py-5 text-center bg-white rounded-3 border">
                          <div className="fs-1 text-muted mb-2">📍</div>
                          <h4 className="h5 fw-bold text-dark mb-1">No Landmarks match that keyword</h4>
                          <p className="text-muted small">Refine search values or explore customized spots.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* LIST C: CURATED LODGES */}
                  {activeTab === "hotels" && (
                    <motion.div
                      key="hotels-list-cards"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="row g-4"
                    >
                      {filteredHotels.length > 0 ? (
                        filteredHotels.map((hotel) => (
                          <div key={hotel.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 card-destination d-flex flex-column justify-content-between text-start shadow-sm border-0">
                              <div>
                                <div className="position-relative bg-light" style={{ height: "180px" }}>
                                  <img 
                                    src={hotel.image} 
                                    alt={hotel.name} 
                                    referrerPolicy="no-referrer"
                                    onError={(e) => handleImageError(e, 'hotel')}
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                  />
                                  <div className="position-absolute bg-white px-2 py-0.5 rounded shadow-sm border text-warning fw-bold font-mono" style={{ top: "12px", left: "12px", fontSize: "9px" }}>
                                    {"★".repeat(Math.max(1, Math.min(5, Math.floor(hotel.stars) || 5)))}
                                  </div>
                                </div>

                                <div className="p-3">
                                  <div className="d-flex justify-content-between align-items-start gap-1 mb-1">
                                    <h4 className="h6 fw-bold text-dark m-0 flex-grow-1">{hotel.name}</h4>
                                    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle font-mono shrink-0">{hotel.rating}/10</span>
                                  </div>
                                  <p className="text-secondary small d-flex align-items-center gap-1 mb-2" style={{ fontSize: "11px" }}>
                                    <MapPin className="text-primary shrink-0" style={{ width: "12px", height: "12px" }} />
                                    <span>{hotel.location}</span>
                                  </p>

                                  <div className="d-flex flex-wrap gap-1">
                                    {hotel.amenities.map((am, i) => (
                                      <span key={i} className="badge bg-light border text-secondary font-mono" style={{ fontSize: "8px" }}>
                                        {am}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              

                              <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center text-start">
                                <div className="font-mono">
                                  <span className="text-muted d-block uppercase text-uppercase" style={{ fontSize: "8px" }}>Base rate</span>
                                  <span className="fw-bold text-dark fs-6 font-mono">${hotel.pricePerNight} <span className="text-muted fw-normal" style={{ fontSize: "9px" }}>/ night</span></span>
                                </div>
                                <button
                                  onClick={() => {
                                    setSelectedHotel(hotel);
                                    setHotelActiveTab("overview");
                                  }}
                                  className="btn py-2 px-3 rounded-3 fw-bold font-mono small transition-all btn-primary-gradient text-white border-0 shadow-sm d-flex align-items-center gap-1"
                                  style={{ fontSize: "11.5px" }}
                                >
                                  <span>Hotel Info</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 py-5 text-center bg-white rounded-3 border">
                          <div className="fs-1 text-muted mb-2">🏨</div>
                          <h4 className="h5 fw-bold text-dark mb-1">No Hotels match that keyword</h4>
                          <p className="text-muted small">Refine keyword or explore stays inside other country detail sheets.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </main>

      {/* HOTEL DETAILED PAGE MODAL */}
      <AnimatePresence>
        {selectedHotel && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(12px)", zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable" style={{ maxWidth: "1280px", width: "95%" }}>
              <motion.div 
                className="modal-content overflow-hidden border-0 shadow-lg rounded-4"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.4 }}
                style={{ maxHeight: "95vh", minHeight: "85vh", display: "flex", flexDirection: "column" }}
              >
                {/* Top Banner Image with Overlay */}
                <div className="position-relative bg-light" style={{ height: "300px" }}>
                  <img 
                    src={selectedHotel.image ? selectedHotel.image.replace("w=600", "w=1600").replace("q=80", "q=95") : selectedHotel.image} 
                    alt={selectedHotel.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, 'hotel')}
                    className="w-100 h-100"
                    style={{ objectFit: "cover", imageRendering: "-webkit-optimize-contrast" }}
                  />
                  {/* Absolute Badges */}
                  <div className="position-absolute d-flex gap-2" style={{ top: "16px", left: "16px", zIndex: 5 }}>
                    <span className="badge bg-dark bg-opacity-75 text-warning font-mono fs-6 px-3 py-2 rounded-pill d-flex align-items-center gap-1 shadow-sm">
                      {"★".repeat(Math.max(1, Math.min(5, parseInt(selectedHotel.stars) || 5)))}
                    </span>
                    <span className="badge bg-primary text-white font-mono text-uppercase px-3 py-2 rounded-pill d-flex align-items-center gap-1 shadow-sm small">
                      Premium Quality stay
                    </span>
                  </div>

                  {/* Close Button */}
                  <button 
                    onClick={() => setSelectedHotel(null)}
                    className="btn btn-light rounded-circle shadow border-0 position-absolute d-flex align-items-center justify-content-center"
                    style={{ top: "16px", right: "16px", width: "40px", height: "40px", transition: "all 0.2s", zIndex: 5 }}
                    aria-label="Close"
                  >
                    <X style={{ width: "20px", height: "20px" }} />
                  </button>

                  {/* Gradient bottom overlay protecting the title */}
                  <div className="position-absolute w-100 start-0 bottom-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", paddingTop: "100px" }}>
                    <span className="badge bg-white text-primary text-uppercase font-mono mb-2" style={{ fontSize: "10px", letterSpacing: "1px" }}>
                      Luxury Hotel Portal
                    </span>
                    <h2 className="text-white fw-bold h3 m-0 font-display">{selectedHotel.name}</h2>
                    <div className="text-white text-opacity-80 small mt-1 d-flex align-items-center gap-1.5">
                      <MapPin className="text-primary shrink-0" style={{ width: "14px", height: "14px" }} />
                      <span>{selectedHotel.location}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Navigation Tabs */}
                <div className="bg-white border-bottom px-4 py-2 d-flex gap-4">
                  {['overview', 'amenities', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setHotelActiveTab(tab)}
                      className={`btn px-0 py-2.5 position-relative border-0 font-display fw-bold text-capitalize small transition-all ${
                        hotelActiveTab === tab ? "text-primary" : "text-muted"
                      }`}
                    >
                      {tab === 'overview' && 'Overview'}
                      {tab === 'amenities' && 'Amenities'}
                      {tab === 'reviews' && 'Reviews'}
                      {hotelActiveTab === tab && (
                        <motion.div 
                          layoutId="hotelTabActive" 
                          className="position-absolute bottom-0 start-0 w-100 bg-primary" 
                          style={{ height: "3px" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Modal Body Scroll Container */}
                <div className="modal-body p-4 bg-light overflow-auto flex-grow-1">
                  
                  {/* Tab: OVERVIEW */}
                  {hotelActiveTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="row g-4 text-start">
                        <div className="col-md-8">
                          <div className="bg-white p-4 rounded-4 shadow-sm border">
                            <h4 className="h5 fw-bold text-dark mb-3">About the Resort</h4>
                            <p className="text-secondary leading-relaxed small" style={{ fontSize: "13.5px" }}>
                              Welcome to <strong>{selectedHotel.name}</strong>, a premium hospitality landmark offering an exceptionally curated lifestyle experience. Architecturally designed to blend contextually with the local scenery, this resort features spectacular state-of-the-art luxury, absolute noise protection, gourmet culinary selections, and customized wellness therapy suites.
                            </p>
                            
                            <hr className="my-4" />
                            
                            <h5 className="fw-bold text-dark mb-3 small text-uppercase font-mono">Key Information</h5>
                            <div className="row g-3">
                              <div className="col-sm-6">
                                <div className="p-3 bg-light rounded-3">
                                  <span className="text-muted d-block uppercase" style={{ fontSize: "9px" }}>CHECK-IN</span>
                                  <span className="fw-semibold text-dark small">From 2:00 PM</span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="p-3 bg-light rounded-3">
                                  <span className="text-muted d-block uppercase" style={{ fontSize: "9px" }}>CHECK-OUT</span>
                                  <span className="fw-semibold text-dark small">Until 12:00 PM</span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="p-3 bg-light rounded-3">
                                  <span className="text-muted d-block uppercase" style={{ fontSize: "9px" }}>CANCELLATION</span>
                                  <span className="fw-semibold text-success small">Free up to 24 hours</span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="p-3 bg-light rounded-3">
                                  <span className="text-muted d-block uppercase" style={{ fontSize: "9px" }}>PETS POLICY</span>
                                  <span className="fw-semibold text-muted small">Friendly on request</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-4">
                          <div className="bg-white p-4 rounded-4 shadow-sm border text-center mb-4">
                            <span className="text-muted font-mono d-block text-uppercase small mb-1">Excellent Rating</span>
                            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                              <span className="fs-1 fw-bold text-primary font-mono">{selectedHotel.rating}</span>
                              <div className="text-start">
                                <span className="fw-bold d-block text-dark small leading-none">Superb</span>
                                <span className="text-muted font-mono" style={{ fontSize: "10px" }}>{selectedHotel.reviewsCount} verified reviews</span>
                              </div>
                            </div>
                            
                            <hr />
                            
                            <div className="font-mono py-2 text-center">
                              <span className="text-muted d-block text-uppercase" style={{ fontSize: "9px" }}>Guaranteed Best Rate</span>
                              <span className="fw-bold text-dark fs-3">${selectedHotel.pricePerNight}</span>
                              <span className="text-muted" style={{ fontSize: "11px" }}> / night (USD)</span>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-4 shadow-sm border text-start">
                            <h4 className="fw-bold text-dark mb-3" style={{ fontSize: "14px" }}>Contact &amp; Location</h4>
                            <div className="d-flex flex-column gap-3">
                              <div className="d-flex align-items-start gap-2.5">
                                <MapPin className="text-primary shrink-0 mt-0.5" style={{ width: "16px", height: "16px" }} />
                                <span className="text-secondary small fw-semibold" style={{ fontSize: "12px" }}>{selectedHotel.location}</span>
                              </div>
                              <div className="d-flex align-items-start gap-2.5">
                                <Phone className="text-primary shrink-0 mt-0.5" style={{ width: "16px", height: "16px" }} />
                                <span className="text-secondary font-mono" style={{ fontSize: "12px" }}>+1 (800) {hotelPhone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab: AMENITIES */}
                  {hotelActiveTab === 'amenities' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="bg-white p-4 rounded-4 border text-start">
                        <h4 className="h5 fw-bold text-dark mb-4">Luxury Handpicked Amenities</h4>
                        <div className="row g-3">
                          {/* Render predefined hotel amenities plus luxurious standard ones */}
                          {[...(Array.isArray(selectedHotel.amenities) ? selectedHotel.amenities : []), ...["High-Speed Fiber Wi-Fi", "Daily Gourmet Breakfast", "Luxury Bathrobes & Slippers", "In-Room Smart Controls", "Oceanfront Access"].filter(item => !(Array.isArray(selectedHotel.amenities) ? selectedHotel.amenities : []).includes(item))].map((amenity, idx) => (
                            <div key={idx} className="col-md-6 col-sm-12">
                              <div className="p-3 bg-light rounded-3 border-start border-primary border-3 d-flex align-items-center gap-3">
                                <span className="fs-3">{
                                  amenity.includes("Pool") || amenity.includes("Baths") ? "🏊" :
                                  amenity.includes("Spa") || amenity.includes("Onsen") || amenity.includes("Massage") ? "💆" :
                                  amenity.includes("Dining") || amenity.includes("Breakfast") || amenity.includes("Cafe") || amenity.includes("Winery") ? "🍽️" :
                                  amenity.includes("SkyBar") || amenity.includes("Lounge") ? "🍸" :
                                  amenity.includes("Wi-Fi") ? "📶" :
                                  amenity.includes("Bikes") || amenity.includes("Eco-Tours") ? "🚴" :
                                  "✨"
                                }</span>
                                <div>
                                  <span className="fw-semibold text-dark d-block small">{amenity}</span>
                                  <span className="text-muted font-mono" style={{ fontSize: "9px" }}>Premium Inclusion</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-3 mt-4" style={{ backgroundColor: "rgba(13, 110, 253, 0.08)", border: "1px dashed rgba(13, 110, 253, 0.45)" }}>
                          <p className="m-0 fst-italic fw-bold text-primary" style={{ fontSize: "12.5px" }}>
                            ℹ️ All guests inside luxury cabins receive personalized 24/7 concierge assistance and complimentary arrival refreshments.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab: REVIEWS */}
                  {hotelActiveTab === 'reviews' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="bg-white p-4 rounded-4 border text-start">
                        <h4 className="h5 fw-bold text-dark mb-4">Verified Visitor Testimonials</h4>
                        <div className="d-flex flex-column gap-3">
                          {[
                            {
                              author: "Fahad H.",
                              date: "June 2026",
                              stars: 5,
                              comment_en: "Exceptional luxury standards, clean atmosphere, and stunning panoramas. The staff does everything to guarantee absolute serenity. Highly recommended!"
                            },
                            {
                              author: "Sophia Laurent",
                              date: "May 2026",
                              stars: 5,
                              comment_en: "This boutique resort gave us the perfect quiet privacy we desperately sought. The culinary variety of the Michelin dining was exquisite."
                            },
                            {
                              author: "Sarah & Mark",
                              date: "April 2026",
                              stars: 4,
                              comment_en: "Gorgeously designed suites with fluffy giant pillows and custom thermal baths. Excellent spa therapy, we felt truly rejuvenated!"
                            }
                          ].map((rev, idx) => (
                            <div key={idx} className="p-3 bg-light rounded-3 border">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                  <span className="fw-bold text-dark d-block small">{rev.author}</span>
                                  <span className="text-muted font-mono" style={{ fontSize: "9px" }}>{rev.date}</span>
                                </div>
                                <span className="text-warning font-mono" style={{ fontSize: "11px" }}>{"★".repeat(Math.max(1, Math.min(5, Math.floor(rev.stars) || 5)))}</span>
                              </div>
                              <p className="text-secondary small m-0 font-sans">{rev.comment_en}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Modal Footer */}
                <div className="modal-footer bg-white border-top py-3 px-4 d-flex justify-content-between">
                  <span className="text-muted font-mono" style={{ fontSize: "10px" }}>
                    Room rates are inclusive of local luxury taxes and state service fees.
                  </span>
                  <div className="d-flex gap-2">
                    
                    <button 
                      onClick={() => setSelectedHotel(null)}
                      className="btn btn-secondary border px-4 py-1.5 rounded-3 fw-bold font-mono small"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    

    </div>
  );
}



