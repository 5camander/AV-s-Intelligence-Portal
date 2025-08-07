"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Droplets,
  Wind,
  Thermometer,
  Clock,
  Download,
  X,
} from "lucide-react";

import { Button } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
            <button
              onClick={() =>
                document
                  .getElementById("footer")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold text-[#550b14] hover:text-[#7e6961] cursor-pointer"
            >
              Kontak
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
                      src={"/images/banjir.jpg"}
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
      </main>
    </div>
  );
}
