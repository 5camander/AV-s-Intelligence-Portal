import React from "react";
import { Chip, CircularProgress } from "@mui/material";
import { RefreshCw } from "lucide-react";

interface WeatherStatusProps {
  loading: boolean;
  cityName: string;
  error?: string | null;
}

const WeatherStatus: React.FC<WeatherStatusProps> = ({
  loading,
  cityName,
  error,
}) => {
  if (error) {
    return (
      <Chip
        label="Data tidak tersedia"
        color="error"
        size="small"
        sx={{ mb: 2 }}
      />
    );
  }

  if (loading) {
    return (
      <Chip
        icon={<CircularProgress size={16} sx={{ color: "white !important" }} />}
        label={`Memuat data ${cityName}...`}
        sx={{
          mb: 2,
          backgroundColor: "#550b14",
          color: "white",
          "& .MuiChip-icon": {
            color: "white",
          },
        }}
      />
    );
  }

  return (
    <Chip
      icon={<RefreshCw size={16} />}
      label={`Data terkini - ${cityName}`}
      sx={{
        mb: 2,
        backgroundColor: "#e8f5e8",
        color: "#2e7d32",
        "& .MuiChip-icon": {
          color: "#2e7d32",
        },
      }}
    />
  );
};

export default WeatherStatus;
