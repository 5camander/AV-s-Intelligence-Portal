"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function CurrentTime() {
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
