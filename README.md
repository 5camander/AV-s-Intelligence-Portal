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

### Project Features

- 🗺️ Interactive flood tracking maps using Leaflet
- 📊 Real-time data visualization
- 📱 Responsive design for all devices
- 🌊 Flood risk analysis and monitoring
- 📁 Document and map management system