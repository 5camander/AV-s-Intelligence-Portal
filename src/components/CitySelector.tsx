import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { MapPin } from "lucide-react";

interface CityOption {
  value: string;
  label: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

const southSumateraCities: CityOption[] = [
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

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  loading?: boolean;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onCityChange,
  loading = false,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onCityChange(event.target.value);
  };

  return (
    <div className="mb-6">
      <FormControl
        fullWidth
        size="small"
        disabled={loading}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#550b14",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#550b14",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#7e6961",
            "&.Mui-focused": {
              color: "#550b14",
            },
          },
          "& .MuiSelect-icon": {
            color: "#550b14",
          },
        }}
      >
        <InputLabel
          id="city-select-label"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <MapPin size={16} />
          Pilih Kota/Kabupaten
        </InputLabel>
        <Select
          labelId="city-select-label"
          value={selectedCity}
          label="Pilih Kota/Kabupaten"
          onChange={handleChange}
          sx={{
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease-in-out",
            },
          }}
        >
          {southSumateraCities.map((city) => (
            <MenuItem
              key={city.value}
              value={city.value}
              sx={{
                "&:hover": {
                  backgroundColor: "#f8f8f7",
                },
                "&.Mui-selected": {
                  backgroundColor: "#550b14",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#7e6961",
                  },
                },
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <MapPin size={16} />
                {city.label}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export { southSumateraCities };
export default CitySelector;
