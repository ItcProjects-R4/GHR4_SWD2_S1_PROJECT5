# ✈️ Travel Planner

A modern, responsive travel planning web application that helps users organize trips, explore destinations, manage flights, and create personalized travel plans. The application is built with **React.js**, **Vite**, and **Firebase Authentication**, following a modular and component-based architecture.

---

##  Overview

Travel Planner is designed to simplify the travel planning process by combining multiple travel-related services into one intuitive platform. Instead of using different websites for trip organization, users can manage destinations, flights, saved trips, and their travel history from a single application.

The project demonstrates modern frontend development practices including reusable React components, secure authentication, responsive design, and API integration.

---

##  Features

###  Authentication

- User Registration
- Secure Login
- Firebase Authentication
- Protected Routes
- Logout Functionality

###  Home

- Landing Page
- Featured Destinations
- Navigation Menu
- Responsive Hero Section

###  Dashboard

- Personalized Dashboard
- Quick Navigation
- User Overview
- Travel Summary

###  Destinations

- Browse Destinations
- Destination Details
- Destination Cards

###  Flights

- Browse Available Flights
- Flight Information
- Flight Search
- Save Favorite Flights

###  Saved Flights

- View Saved Flights
- Remove Saved Flights

###  Trip Planner

- Create Travel Plans
- Organize Itineraries
- Manage Planned Trips

###  Planner Workspace

- View Planned Trips
- Manage Travel Plans

### Past Trips

- View Travel History

###  Profile

- Display User Information
- Firebase User Details

###  Responsive Design

- Desktop Support
- Tablet Support
- Mobile Support

---

#  Technologies Used

| Technology | Purpose |
|------------|---------|
| React.js | Frontend Framework |
| Vite | Build Tool |
| JavaScript ES6+ | Programming Language |
| Firebase Authentication | User Authentication |
| React Router DOM | Routing |
| HTML5 | Structure |
| CSS3 | Styling |
| REST APIs | External Data |
| Git | Version Control |

---

#  Project Structure

```
Travel-Planner
│
├── public
│
├── src
│   ├── assets
│   ├── components
│   │   ├── Dashboard
│   │   ├── Destinations
│   │   ├── Flights
│   │   ├── Footer
│   │   ├── Home
│   │   ├── Layout
│   │   ├── Login
│   │   ├── Navbar
│   │   ├── NotFound
│   │   ├── PastTrips
│   │   ├── PlannerWorkspace
│   │   ├── Profile
│   │   ├── ProtectedRoutes
│   │   ├── Register
│   │   ├── SavedFlights
│   │   ├── TripPlanner
│   │   └── TripsWorkspace
│   │
│   ├── context
│   ├── services
│   ├── firebase.jsx
│   ├── data.js
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

#  Installation

Clone the repository

```bash
git clone https://github.com/your-username/travel-planner.git
```

Move into the project folder

```bash
cd travel-planner
```

Install dependencies

```bash
npm install
```

---

#  Environment Variables

Create a `.env` file inside the project root.

Example:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

---

#  Run the Project

Development Mode

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

---

#  Authentication

The application uses **Firebase Authentication**.

Supported authentication features include:

- Email & Password Registration
- Email & Password Login
- Authentication State Management
- Protected Routes
- Secure Logout

---

#  Application Modules

| Module | Description |
|---------|-------------|
| Home | Landing page |
| Login | User authentication |
| Register | Account creation |
| Dashboard | Main workspace |
| Destinations | Explore destinations |
| Flights | Browse flights |
| Saved Flights | Saved travel options |
| Trip Planner | Create itineraries |
| Planner Workspace | Manage plans |
| Past Trips | Travel history |
| Profile | User profile |
| Protected Routes | Route authorization |

---

#  Software Architecture

```
User

↓

React Frontend

↓

React Router

↓

Firebase Authentication

↓

REST APIs

↓

Travel Services
```

---

#  Security Features

- Firebase Authentication
- Protected Routes
- Input Validation
- Secure Environment Variables
- Authentication State Monitoring
- Client-side Route Protection

---

#  Responsive Design

The application supports:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive technologies include:

- Flexbox
- CSS Grid
- Media Queries

---

#  Deployment

The application can be deployed using:

- Firebase Hosting
- Vercel
- Netlify
- GitHub Pages

Build the application:

```bash
npm run build
```


---

#  Testing

The application has been tested using:

- Functional Testing
- Unit Testing
- Integration Testing
- Authentication Testing
- API Testing
- Responsive Testing
- User Acceptance Testing

---

#  Future Improvements

- Hotel Booking
- Online Payment
- Google Maps Integration
- Weather Forecast
- AI Travel Recommendations
- Push Notifications
- Email Notifications
- Dark Mode
- Multi-language Support
- Mobile Application (React Native)

---



Graduation Project

2026

---

#  License

This project was developed for educational and academic purposes.

---

#  Acknowledgements

Special thanks to our project supervisor, DEPI, and everyone who contributed to the successful completion of this project.

