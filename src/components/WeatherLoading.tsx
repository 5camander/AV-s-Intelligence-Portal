import React from "react";
import { CircularProgress, Box } from "@mui/material";

interface WeatherLoadingProps {
  size?: number;
}

const WeatherLoading: React.FC<WeatherLoadingProps> = ({ size = 20 }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "1.875rem" }}
    >
      <CircularProgress size={size} sx={{ color: "#550b14" }} />
    </Box>
  );
};

export default WeatherLoading;
