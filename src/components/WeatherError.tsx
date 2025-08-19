import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";
import { CloudOff } from "lucide-react";

interface WeatherErrorProps {
  error: string;
  onRetry?: () => void;
}

const WeatherError: React.FC<WeatherErrorProps> = ({ error, onRetry }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Alert
        severity="warning"
        sx={{
          backgroundColor: "#fff3cd",
          color: "#856404",
          "& .MuiAlert-icon": {
            color: "#856404",
          },
        }}
        icon={<CloudOff size={20} />}
        action={
          onRetry && (
            <button
              onClick={onRetry}
              style={{
                background: "none",
                border: "none",
                color: "#856404",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Coba lagi
            </button>
          )
        }
      >
        <AlertTitle>Gagal memuat data cuaca</AlertTitle>
        {error}. Menampilkan data fallback.
      </Alert>
    </Box>
  );
};

export default WeatherError;
