"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Droplets, Wind, Thermometer, Clock } from "lucide-react";

import { Button, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    });
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-[#cbc0b2] px-6 py-3 rounded-lg text-[#550b14]">
        <div className="flex items-center gap-2 text-base">
          <Clock className="h-5 w-5" />
          <span className="font-semibold">{formatTime(currentTime)}</span>
          <span className="text-sm opacity-70">WIB</span>
          <span className="text-sm opacity-70">|</span>
          <span className="text-sm opacity-70">{formatDate(currentTime)}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
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
                  .getElementById("features")
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

        {/* Feature Card Section */}
        <section id="features" className="bg-[#cbc0b2] py-12 md:py-20 w-full">
          <div className="mx-auto px-8 max-w-[1400px]">
            <Card
              className="bg-[#f8f8f7] border-none"
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent
                sx={{
                  padding: "3rem !important",
                  "@media (max-width: 768px)": {
                    padding: "2rem !important",
                  },
                }}
              >
                <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#550b14]">
                      Pantau dan Lacak Banjir di Sumatera
                    </h2>
                    <p className="text-[#7e6961]">
                      Platform kami menyediakan data real-time dan prediksi
                      banjir untuk membantu Anda mempersiapkan dan merespons
                      situasi darurat dengan lebih baik. Dapatkan akses ke peta
                      interaktif, peringatan dini, dan informasi cuaca terkini.
                    </p>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#550b14",
                        color: "#f8f8f7",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#7e6961",
                        },
                      }}
                      onClick={() =>
                        document
                          .getElementById("dashboard")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Lihat Dashboard
                    </Button>
                  </div>
                  <div className="relative h-[250px] rounded-lg overflow-hidden">
                    <Image
                      src={"/AV-s-Intelligence-Portal/banjir.jpg"}
                      alt="Flood Tracking"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
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
                        75%
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#7e6961",
                          lineHeight: 1.4,
                        }}
                      >
                        Kemungkinan hujan tinggi
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
                        85%
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#7e6961",
                          lineHeight: 1.4,
                        }}
                      >
                        Kelembaban tinggi
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
                        28°C
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#7e6961",
                          lineHeight: 1.4,
                        }}
                      >
                        Terasa seperti 30°C
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
                        Palembang
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.75rem",
                          color: "#7e6961",
                          lineHeight: 1.4,
                        }}
                      >
                        Sumatera Selatan
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
                    <CardContent sx={{ padding: "2rem" }}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.125rem",
                              marginBottom: "0.75rem",
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
                            fontSize: "3rem",
                            fontWeight: "bold",
                            opacity: 0.9,
                            marginLeft: "1.5rem",
                          }}
                        >
                          1
                        </Typography>
                      </div>
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
                    <CardContent sx={{ padding: "2rem" }}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.125rem",
                              marginBottom: "0.75rem",
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
                            fontSize: "3rem",
                            fontWeight: "bold",
                            opacity: 0.9,
                            marginLeft: "1.5rem",
                          }}
                        >
                          6
                        </Typography>
                      </div>
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
                    <CardContent sx={{ padding: "2rem" }}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.125rem",
                              marginBottom: "0.75rem",
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
                            fontSize: "3rem",
                            fontWeight: "bold",
                            opacity: 0.9,
                            marginLeft: "1.5rem",
                          }}
                        >
                          3
                        </Typography>
                      </div>
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
                  src={"/AV-s-Intelligence-Portal/footer-1.png"}
                  alt="Partner Logo 1"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-20 h-20">
                <Image
                  src={"/AV-s-Intelligence-Portal/footer-2.png"}
                  alt="Partner Logo 2"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-16 h-16">
                <Image
                  src={"/AV-s-Intelligence-Portal/footer-3.png"}
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
