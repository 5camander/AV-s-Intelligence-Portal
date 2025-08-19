"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Droplets, Wind, Thermometer } from "lucide-react";

import { Button, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";

import FloodTrackingModal from "@/components/FloodTrackingModal";
import ParameterTrackingModal from "@/components/ParameterTrackingModal";
import CurrentTime from "@/components/CurrentTime";
import WeatherError from "@/components/WeatherError";
import WeatherStatus from "@/components/WeatherStatus";
import CitySelector, { southSumateraCities } from "@/components/CitySelector";
import useWeatherData from "@/hooks/useWeatherData";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("Palembang");

  // Find coordinates for the selected city
  const selectedCityData = southSumateraCities.find(
    (city) => city.value === selectedCity
  );
  const coordinates = selectedCityData?.coordinates;

  const { weatherData, loading, error, refetch } = useWeatherData(
    selectedCity,
    coordinates
  );

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-b-[#cbc0b2] bg-[#f8f8f7]">
        <div className="mx-auto px-8 max-w-[1400px] flex h-16 items-center justify-between">
          <div className="font-semibold text-[#550b14]">
            AV&apos;S INTELLIGENCE PORTAL
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() =>
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold text-[#550b14] hover:text-[#7e6961] cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("feature")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold text-[#550b14] hover:text-[#7e6961] cursor-pointer"
            >
              Fitur
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("dashboard")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold text-[#550b14] hover:text-[#7e6961] cursor-pointer"
            >
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="hero" className="bg-[#f8f8f7] py-12 md:py-20">
          <div className="mx-auto px-8 max-w-[1400px]">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-[#550b14]">
                AV&apos;S INTELLIGENCE PORTAL
              </h1>
              <p className="text-lg text-[#550b14] md:text-xl font-medium">
                AV&apos;s Intelligence Portal adalah platform yang digunakan
                untuk menyajikan WebGIS yang dinamis dan mudah diakses.
              </p>
              <Button
                onClick={() => {
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#550b14",
                  color: "#f8f8f7",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#7e6961",
                  },
                }}
              >
                Mulai Sekarang
              </Button>
            </div>
          </div>
        </section>

        {/* Parameter Card Section */}
        <section
          id="feature"
          className="bg-gradient-to-br from-[#cbc0b2] to-[#b8ad9f] py-16 md:py-24 w-full relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#550b14] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#7e6961] rounded-full blur-3xl"></div>
          </div>

          <div className="mx-auto px-8 max-w-[1400px] relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Image Side - Show first on mobile, second on desktop */}
              <div className="relative group order-1 lg:order-2">
                <div className="relative h-[320px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700 ease-out">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#550b14]/20 to-transparent z-10"></div>
                  <Image
                    src={"/images/banjir2.png"}
                    alt="Parameter Rawan Banjir"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Floating stats card */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl z-20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-[#550b14]">
                        6 Parameter Aktif
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#550b14]/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#7e6961]/10 rounded-full blur-xl"></div>
              </div>

              {/* Content Side - Show second on mobile, first on desktop */}
              <div className="space-y-6 lg:pr-8 order-2 lg:order-1">
                <div className="inline-flex items-center px-4 py-2 bg-[#550b14]/10 rounded-full mb-4">
                  <span className="text-sm font-semibold text-[#550b14] tracking-wide uppercase">
                    Analisis Parameter
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#550b14] leading-tight">
                  Parameter
                  <span className="text-[#550b14]"> Rawan Banjir</span>
                </h2>
                <p className="text-lg text-[#7e6961] leading-relaxed">
                  Menyediakan 6 (enam) data parameter yang berpengaruh terhadap
                  banjir dengan analisis mendalam dan visualisasi interaktif
                </p>
                <div className="pt-4">
                  <ParameterTrackingModal />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Card Section */}
        <section
          id="webgis"
          className="bg-gradient-to-bl from-[#cbc0b2] to-[#d4c9bc] py-16 md:py-24 w-full relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-10 w-36 h-36 bg-[#550b14] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-20 w-44 h-44 bg-[#7e6961] rounded-full blur-3xl"></div>
          </div>

          <div className="mx-auto px-8 max-w-[1400px] relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Image Side - Order reversed on desktop */}
              <div className="relative group lg:order-1">
                <div className="relative h-[320px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700 ease-out">
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#550b14]/20 to-transparent z-10"></div>
                  <Image
                    src={"/images/banjir.png"}
                    alt="WebGIS Sumatera Selatan"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Floating interactive badge */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl z-20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-[#550b14]">
                        Peta Interaktif
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -left-4 w-24 h-24 bg-[#7e6961]/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-6 w-18 h-18 bg-[#550b14]/10 rounded-full blur-xl"></div>
              </div>

              {/* Content Side */}
              <div className="space-y-6 lg:pl-8 lg:order-2">
                <div className="inline-flex items-center px-4 py-2 bg-[#550b14]/10 rounded-full mb-4">
                  <span className="text-sm font-semibold text-[#550b14] tracking-wide uppercase">
                    WebGIS Platform
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#550b14] leading-tight">
                  Pantau dan Lacak Banjir di
                  <span className="text-[#550b14]"> Sumatera Selatan</span>
                </h2>
                <p className="text-lg text-[#7e6961] leading-relaxed">
                  Platform kami menyediakan data prediksi banjir untuk membantu
                  Anda mempersiapkan dan merespons situasi darurat dengan lebih
                  baik. Dapatkan akses ke peta interaktif yang real-time.
                </p>
                <div className="pt-4">
                  <FloodTrackingModal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="dashboard" className="bg-[#f8f8f7] py-12 md:py-20">
          <div className="mx-auto px-8 max-w-[1400px]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#550b14] mb-8 text-center">
              Dashboard Informasi
            </h2>

            {/* Current Time - Centered */}
            <CurrentTime />

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column - Weather Prediction */}
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-[#550b14] mb-6">
                    Prediksi Cuaca Sumatera Selatan
                  </h3>
                </div>

                {/* City Selector */}
                <CitySelector
                  selectedCity={selectedCity}
                  onCityChange={handleCityChange}
                  loading={loading}
                />

                {/* Weather Status */}
                <WeatherStatus
                  loading={loading}
                  cityName={selectedCity}
                  error={error}
                />

                {error && <WeatherError error={error} onRetry={refetch} />}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <CardContent sx={{ padding: "1.5rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <Droplets
                          style={{ width: 16, height: 16, color: "#550b14" }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#550b14",
                          }}
                        >
                          Curah Hujan
                        </Typography>
                      </div>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: "1.875rem",
                          fontWeight: "bold",
                          color: "#550b14",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {loading
                          ? "..."
                          : `${weatherData?.rainProbability || 0}%`}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#7e6961",
                          lineHeight: 1.4,
                        }}
                      >
                        {loading
                          ? "Memuat data..."
                          : weatherData?.rainProbability &&
                            weatherData.rainProbability > 60
                          ? "Kemungkinan hujan tinggi"
                          : weatherData?.rainProbability &&
                            weatherData.rainProbability > 30
                          ? "Kemungkinan hujan sedang"
                          : "Kemungkinan hujan rendah"}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <CardContent sx={{ padding: "1.5rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <Wind
                          style={{ width: 16, height: 16, color: "#550b14" }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#550b14",
                          }}
                        >
                          Kelembaban
                        </Typography>
                      </div>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: "1.875rem",
                          fontWeight: "bold",
                          color: "#550b14",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {loading ? "..." : `${weatherData?.humidity || 0}%`}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#7e6961",
                          lineHeight: 1.4,
                        }}
                      >
                        {loading
                          ? "Memuat data..."
                          : weatherData?.humidity && weatherData.humidity > 70
                          ? "Kelembaban tinggi"
                          : weatherData?.humidity && weatherData.humidity > 50
                          ? "Kelembaban sedang"
                          : "Kelembaban rendah"}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <CardContent sx={{ padding: "1.5rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <Thermometer
                          style={{ width: 16, height: 16, color: "#550b14" }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#550b14",
                          }}
                        >
                          Suhu
                        </Typography>
                      </div>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: "1.875rem",
                          fontWeight: "bold",
                          color: "#550b14",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {loading ? "..." : `${weatherData?.temperature || 0}°C`}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#7e6961",
                          lineHeight: 1.4,
                        }}
                      >
                        {loading
                          ? "Memuat data..."
                          : `Terasa seperti ${weatherData?.feelsLike || 0}°C`}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <CardContent sx={{ padding: "1.5rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <MapPin
                          style={{ width: 16, height: 16, color: "#550b14" }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#550b14",
                          }}
                        >
                          Lokasi
                        </Typography>
                      </div>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#550b14",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {loading
                          ? selectedCity
                          : weatherData?.location || selectedCity}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#7e6961",
                          lineHeight: 1.4,
                        }}
                      >
                        {loading
                          ? "Memuat data cuaca..."
                          : error
                          ? "Data tidak tersedia"
                          : weatherData?.description || "Sumatera Selatan"}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Disaster Information */}
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-[#550b14] mb-6">
                    Informasi Bencana
                  </h3>
                </div>
                <div className="space-y-4">
                  <Card
                    sx={{
                      backgroundColor: "#7e6961",
                      color: "white",
                      borderRadius: 2,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "1.5rem !important",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: "1.125rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Peta Integrasi
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.8)",
                            lineHeight: 1.5,
                          }}
                        >
                          Peta terintegrasi untuk pemantauan
                        </Typography>
                      </div>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                          opacity: 0.9,
                          marginLeft: "1rem",
                          minWidth: "60px",
                          textAlign: "center",
                        }}
                      >
                        5
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      backgroundColor: "#7e6961",
                      color: "white",
                      borderRadius: 2,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "1.5rem !important",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: "1.125rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Parameter
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.8)",
                            lineHeight: 1.5,
                          }}
                        >
                          Parameter pemantauan banjir
                        </Typography>
                      </div>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                          opacity: 0.9,
                          marginLeft: "1rem",
                          minWidth: "60px",
                          textAlign: "center",
                        }}
                      >
                        6
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      backgroundColor: "#7e6961",
                      color: "white",
                      borderRadius: 2,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "1.5rem !important",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: "1.125rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Kelas Rawan Banjir
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.8)",
                            lineHeight: 1.5,
                          }}
                        >
                          Klasifikasi tingkat kerawanan
                        </Typography>
                      </div>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                          opacity: 0.9,
                          marginLeft: "1rem",
                          minWidth: "60px",
                          textAlign: "center",
                        }}
                      >
                        3
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-[#550b14] text-white py-12">
        <div className="mx-auto px-8 max-w-[1400px]">
          <div className="text-center space-y-6">
            <h3 className="text-lg font-semibold mb-6">
              AV&apos;S INTELLIGENCE PORTAL
            </h3>

            {/* Partner Logos */}
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="relative w-20 h-20">
                <Image
                  src={"/images/footer-1.png"}
                  alt="Partner Logo 1"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-20 h-20">
                <Image
                  src={"/images/footer-2.png"}
                  alt="Partner Logo 2"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-16 h-16">
                <Image
                  src={"/images/footer-3.png"}
                  alt="Partner Logo 3"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-sm opacity-80 mb-4">
              Platform WebGIS untuk pemantauan dan prediksi banjir di Sumatera
              Selatan
            </p>
            <p className="text-xs opacity-60">
              © 2024 AV&apos;s Intelligence Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
