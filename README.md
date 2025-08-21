# AVS Intelligence Portal

A comprehensive flood tracking and intelligence portal built with Next.js, featuring interactive maps, real-time monitoring, and geospatial analysis.

## Step-by-Step Development Guide

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

### Step 1: Create Next.js Application

```bash
# Create a new Next.js application
npx create-next-app@latest avsintelligenceportal

# Navigate to the project directory
cd avsintelligenceportal

# For all prompts, just press Enter to use default options
# This will automatically set up:
# ✅ TypeScript
# ✅ ESLint
# ✅ Tailwind CSS
# ✅ src/ directory
# ✅ App Router
# ✅ Turbopack (for faster development)
```

### Step 2: Project Structure Setup

```bash
# Create additional directories for the project
mkdir -p public/images
mkdir -p public/pdf
mkdir -p public/peta
mkdir -p public/WebGIS
mkdir -p src/components
mkdir -p src/utils
mkdir -p src/types
```

### Step 3: Install Additional Dependencies

Install the required packages for the project:

```bash
# Install UI and styling dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install lucide-react
npm install tailwindcss-animate

# The core dependencies (next, react, react-dom, typescript, tailwindcss, eslint)
# are automatically installed by create-next-app
```

### Step 4: Development

```bash
# Start the development server
npm run dev

# Your application will be available at:
# http://localhost:3000
```

### Step 5: Build for Production

```bash
# Create an optimized production build
npm run build

# Test the production build locally
npm start
```

### Step 6: Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy the project
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No (for new project)
# - Project name: avsintelligenceportal
# - Directory: ./
# - Override settings? No
```

#### Option B: Deploy via GitHub Integration

1. Push your code to GitHub:

   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/avsintelligenceportal.git
   git push -u origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings (Vercel will auto-detect Next.js)
6. Deploy!


# OpenWeatherMap API Integration for Flood-Prone Areas

This document explains the enhanced OpenWeatherMap API integration for flood-prone areas in South Sumatra implemented in the AV's Intelligence Portal.

## Features

- **Real-time Weather Data**: Fetches current weather conditions for flood-prone areas in South Sumatra
- **Targeted Location Support**: Focuses on specific regencies with high flood risk
- **Dynamic Weather Cards**: Displays rainfall probability, humidity, temperature, and location
- **Coordinates-based API Calls**: Uses precise coordinates for more accurate weather data
- **Error Handling**: Graceful fallback to default values when API fails
- **Loading States**: Shows loading indicators while fetching data
- **Retry Functionality**: Users can retry failed API calls
- **Location Selector**: Dropdown with flood-prone areas in South Sumatra

## Supported Locations

The application supports weather data for flood-prone areas in South Sumatra:

1. **Palembang** - Capital city (urban flooding risk)
2. **Kabupaten Muara Enim** - Coal mining area (river flooding)
3. **Kabupaten Musi Rawas** - Highland regency (flash floods)
4. **Kabupaten Musi Banyuasin** - River delta region (seasonal flooding)
5. **Kabupaten Banyuasin** - Coastal regency (tidal and river flooding)
6. **Kabupaten Penukal Abab Lematang Ilir** - Central regency (river overflow)

## Files Added/Modified

### 1. Environment Configuration

- `.env.local` - Contains the OpenWeatherMap API key

### 2. Custom Hook (Enhanced)

- `src/hooks/useWeatherData.ts` - Enhanced to support city coordinates
  - Accepts both city names and coordinates
  - Uses coordinates for more precise weather data
  - Supports dynamic city switching
  - Maintains loading states during city changes

### 3. New Components

- `src/components/CitySelector.tsx` - Dropdown for selecting cities
- `src/components/WeatherStatus.tsx` - Status indicator showing current city and loading state
- `src/components/WeatherError.tsx` - Error display component with retry option
- `src/components/WeatherLoading.tsx` - Loading indicator component

### 4. Main Page Updates

- `src/app/page.tsx` - Enhanced with city selection state management
  - Added city state management
  - Integrated city selector component
  - Enhanced location display to show selected city

## API Details

### OpenWeatherMap Current Weather API

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Two query methods**:
  1. **By Coordinates** (preferred): `lat={lat}&lon={lon}&appid={apiKey}&units=metric`
  2. **By City Name**: `q={city},ID&appid={apiKey}&units=metric`

### Coordinates Database

Each city includes precise coordinates for accurate weather data:

### Coordinates Database

Each location includes precise coordinates for accurate weather data:

```typescript
const southSumateraCities = [
  {
    value: "Palembang",
    label: "Palembang",
    coordinates: { lat: -2.9761, lon: 104.7754 },
  },
  {
    value: "Muara Enim",
    label: "Kabupaten Muara Enim",
    coordinates: { lat: -3.6167, lon: 103.9333 },
  },
  {
    value: "Musi Rawas",
    label: "Kabupaten Musi Rawas",
    coordinates: { lat: -3.3, lon: 102.5 },
  },
  {
    value: "Musi Banyuasin",
    label: "Kabupaten Musi Banyuasin",
    coordinates: { lat: -2.75, lon: 104.75 },
  },
  {
    value: "Banyuasin",
    label: "Kabupaten Banyuasin",
    coordinates: { lat: -2.2833, lon: 104.8667 },
  },
  {
    value: "Penukal Abab Lematang Ilir",
    label: "Kabupaten Penukal Abab Lematang Ilir",
    coordinates: { lat: -3.35, lon: 104.15 },
  },
];
```

### Data Processing

- **Temperature**: Rounded to nearest integer in Celsius
- **Humidity**: Direct from API (percentage)
- **Rainfall Probability**: Calculated based on:
  - Weather conditions (rain, clouds, drizzle)
  - Cloud coverage percentage
  - Custom algorithm for probability estimation
- **Location**: City name from API response
- **Description**: Weather description from API

## User Experience Features

### City Selection

- Dropdown with all South Sumatra cities
- Disabled during loading states
- Visual feedback with icons and hover effects
- Automatic weather data refresh on city change

### Status Indicators

- **Loading**: Shows "Memuat data {cityName}..." with spinner
- **Success**: Shows "Data terkini - {cityName}" with refresh icon
- **Error**: Shows "Data tidak tersedia" with error styling

### Enhanced Error Handling

1. **API Key Missing**: Shows error message if environment variable is not set
2. **Network Errors**: Handles failed API requests
3. **City Not Found**: Graceful handling of invalid city data
4. **Fallback Data**: Displays default weather data when API fails
5. **User Feedback**: Shows error messages with retry options

## State Management

The application uses React state to manage:

- Selected city (string)
- Weather data loading states
- Error states
- City coordinates lookup

```typescript
const [selectedCity, setSelectedCity] = useState("Palembang");
const selectedCityData = southSumateraCities.find(
  (city) => city.value === selectedCity
);
const coordinates = selectedCityData?.coordinates;
const { weatherData, loading, error, refetch } = useWeatherData(
  selectedCity,
  coordinates
);
```

## Usage

### Basic Usage

1. Page loads with Palembang as default city
2. Weather data is automatically fetched
3. Users can select different cities from dropdown
4. Weather data refreshes automatically when city changes

### Environment Setup

```bash
# Add to .env.local
NEXT_PUBLIC_OPENWEATHER_API_KEY= 
```
