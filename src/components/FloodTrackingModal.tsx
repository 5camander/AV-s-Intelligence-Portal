"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Skeleton,
} from "@mui/material";

// Custom hook to handle window dimensions safely
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial dimensions
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default function FloodTrackingModal() {
  const [selectedParameter, setSelectedParameter] = useState("curahhujan");
  const [open, setOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [infoExpanded, setInfoExpanded] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  const mapParameters = {
    curahhujan: {
      title: "Peta Curah Hujan",
      description:
        "Analisis distribusi curah hujan dan tingkat kerawanannya terhadap banjir di wilayah Sumatera Selatan",
      image: "/peta/curahhujan.png",
    },
    kelerengan: {
      title: "Peta Kelerengan",
      description:
        "Analisis kemiringan lereng yang mempengaruhi aliran air permukaan dan resiko banjir",
      image: "/peta/Kelerengan.png",
    },
    ketinggian: {
      title: "Peta Ketinggian",
      description:
        "Analisis elevasi dan topografi wilayah untuk identifikasi daerah rawan genangan",
      image: "/peta/ketinggiankedua.png",
    },
    jenis_tanah: {
      title: "Peta Jenis Tanah",
      description:
        "Analisis jenis tanah di Sumatera Selatan dan klasifikasi berdasarkan karakteristiknya",
      image: "/peta/PETAJENISTANAH.png",
    },
    kerapatan_sungai: {
      title: "Peta Kerapatan Aliran Sungai",
      description:
        "Analisis kerapatan jaringan sungai pada daerah aliran sungai (DAS) di Sumatera Selatan",
      image: "/peta/PETAKERAPATANALIRANSUNGAI.png",
    },
    tutupan_lahan: {
      title: "Peta Tutupan Lahan",
      description:
        "Klasifikasi penggunaan dan tutupan lahan serta dampaknya terhadap aliran permukaan",
      image: "/peta/tutupanlahan.png",
    },
  };

  const parameterButtons = [
    { key: "curahhujan", label: "Curah Hujan" },
    { key: "kelerengan", label: "Kelerengan" },
    { key: "ketinggian", label: "Ketinggian" },
    { key: "jenis_tanah", label: "Jenis Tanah" },
    { key: "kerapatan_sungai", label: "Kerapatan Sungai" },
    { key: "tutupan_lahan", label: "Tutupan Lahan" },
  ];

  // Mapping parameter keys to actual file names
  const fileMapping = {
    curahhujan: "curahhujan",
    kelerengan: "Kelerengan",
    ketinggian: "ketinggiankedua",
    jenis_tanah: "PETAJENISTANAH",
    kerapatan_sungai: "PETAKERAPATANALIRANSUNGAI",
    tutupan_lahan: "tutupanlahan",
  };

  const handleDownload = (format: string) => {
    const fileName = fileMapping[selectedParameter as keyof typeof fileMapping];

    let fileUrl = "";
    let downloadFileName = "";

    if (format === "PDF") {
      fileUrl = `/pdf/${fileName}.pdf`;
      downloadFileName = `${fileName}.pdf`;
    } else if (format === "PNG") {
      fileUrl = `/peta/${fileName}.png`;
      downloadFileName = `${fileName}.png`;
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedParameter("curahhujan");
    setImageLoading(true);
  };

  const handleParameterChange = (newParameter: string) => {
    // Only set loading if parameter actually changes
    if (newParameter !== selectedParameter) {
      setImageLoading(true);
      setSelectedParameter(newParameter);
    }
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully");
    setImageLoading(false);
  };

  const handleImageError = () => {
    console.log("Image failed to load");
    setImageLoading(false);
  };

  // Add timeout fallback to prevent infinite loading
  useEffect(() => {
    if (imageLoading) {
      const timeoutId = setTimeout(() => {
        setImageLoading(false);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeoutId);
    }
  }, [imageLoading, selectedParameter]);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          setImageLoading(true);
        }}
        sx={{
          backgroundColor: "#550b14",
          color: "#f8f8f7",
          textTransform: "none",
          paddingLeft: { xs: "12px", md: "16px" },
          paddingRight: { xs: "12px", md: "16px" },
          fontSize: { xs: "0.875rem", md: "1rem" },
          "&:hover": {
            backgroundColor: "#7e6961",
          },
        }}
      >
        Lacak Banjir Sekarang
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: { xs: "95vw", sm: "90vw" },
            height: { xs: "95vh", sm: "90vh" },
            maxWidth: "none",
            maxHeight: "none",
            margin: { xs: "8px", sm: 0 },
          },
        }}
      >
        <DialogContent sx={{ padding: 0, height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Left Sidebar */}
            <Box
              sx={{
                width: { xs: "100%", md: "320px" },
                backgroundColor: "#f9fafb",
                borderRight: { xs: "none", md: "1px solid #cbc0b2" },
                borderBottom: { xs: "1px solid #cbc0b2", md: "none" },
                padding: { xs: "12px", md: "24px" },
                display: "flex",
                flexDirection: "column",
                height: { xs: "auto", md: "100%" },
              }}
            >
              <div style={{ marginBottom: isMobile ? "16px" : "24px" }}>
                <DialogTitle
                  sx={{
                    padding: 0,
                    fontSize: { xs: "1.125rem", md: "1.25rem" },
                    fontWeight: "bold",
                    color: "#550b14",
                    marginBottom: { xs: "4px", md: "8px" },
                  }}
                >
                  Analisis Titik Sumur
                </DialogTitle>
                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    color: "#7e6961",
                    marginBottom: { xs: "8px", md: "12px" },
                  }}
                >
                  Sumatera Selatan
                </Typography>
                <Button
                  onClick={() => {
                    const webgisWindow = window.open(
                      "/webgis/sumatera-selatan",
                      "_blank",
                      "noopener,noreferrer"
                    );
                    // Prevent hash changes from affecting parent window
                    if (webgisWindow) {
                      webgisWindow.focus();
                    }
                  }}
                  sx={{
                    backgroundColor: "#550b14",
                    color: "white",
                    textTransform: "none",
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    padding: { xs: "6px 12px", md: "8px 16px" },
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#7e6961",
                    },
                  }}
                >
                  🗺️ Buka WebGIS
                </Button>
              </div>

              {/* Map Information */}
              <div style={{ marginBottom: isMobile ? "16px" : "24px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    fontWeight: 600,
                    color: "#550b14",
                    marginBottom: { xs: "8px", md: "16px" },
                    display: { xs: "flex", md: "block" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: { xs: "pointer", md: "default" },
                  }}
                  onClick={() => setInfoExpanded(!infoExpanded)}
                >
                  Informasi Peta
                  <Typography
                    component="span"
                    sx={{
                      display: { xs: "inline", md: "none" },
                      fontSize: "0.875rem",
                      color: "#7e6961",
                      transform: infoExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    ▼
                  </Typography>
                </Typography>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: isMobile ? "12px" : "16px",
                    border: "1px solid #cbc0b2",
                    maxHeight: isMobile ? (infoExpanded ? "200px" : "0px") : "auto",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, padding 0.3s ease",
                    paddingTop: isMobile ? (infoExpanded ? "12px" : "0px") : "16px",
                    paddingBottom: isMobile ? (infoExpanded ? "12px" : "0px") : "16px",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 600,
                      color: "#550b14",
                      marginBottom: "8px",
                      fontSize: isMobile ? "0.875rem" : "1rem",
                    }}
                  >
                    {
                      mapParameters[
                        selectedParameter as keyof typeof mapParameters
                      ].title
                    }
                  </h4>
                  <p style={{ 
                    fontSize: isMobile ? "0.75rem" : "0.875rem", 
                    color: "#7e6961",
                    lineHeight: "1.4",
                  }}>
                    {
                      mapParameters[
                        selectedParameter as keyof typeof mapParameters
                      ].description
                    }
                  </p>
                </div>
              </div>

              {/* Parameter Selection */}
              <div style={{ marginBottom: isMobile ? "16px" : "24px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    fontWeight: 600,
                    color: "#550b14",
                    marginBottom: { xs: "8px", md: "16px" },
                  }}
                >
                  Pilih Parameter
                </Typography>

                {/* Mobile Dropdown */}
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "#550b14",
                        "&.Mui-focused": {
                          color: "#550b14",
                        },
                      }}
                    >
                      Parameter
                    </InputLabel>
                    <Select
                      value={selectedParameter}
                      label="Parameter"
                      onChange={(e) => handleParameterChange(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#cbc0b2",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#550b14",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#550b14",
                        },
                        "& .MuiSelect-select": {
                          color: "#550b14",
                        },
                      }}
                    >
                      {parameterButtons.map((param) => (
                        <MenuItem key={param.key} value={param.key}>
                          {param.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Tablet/Desktop Buttons */}
                <Box
                  sx={{
                    display: { xs: "none", md: "grid" },
                    gridTemplateColumns: "1fr",
                    gap: "8px",
                  }}
                >
                  {parameterButtons.map((param) => (
                    <Button
                      key={param.key}
                      variant={
                        selectedParameter === param.key
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleParameterChange(param.key)}
                      sx={{
                        width: "100%",
                        justifyContent: "flex-start",
                        height: "48px",
                        textAlign: "left",
                        textTransform: "none",
                        fontSize: "1rem",
                        backgroundColor:
                          selectedParameter === param.key
                            ? "#550b14"
                            : "transparent",
                        color:
                          selectedParameter === param.key ? "white" : "#550b14",
                        borderColor: "#cbc0b2",
                        "&:hover": {
                          backgroundColor: "#550b14",
                          color: "white",
                        },
                      }}
                    >
                      {param.label}
                    </Button>
                  ))}
                </Box>
              </div>

              {/* Download Section - Moved to DialogActions */}
            </Box>

            {/* Main Map Area */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                backgroundColor: "#f1f3f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  padding: { xs: "12px", md: "24px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #cbc0b2",
                    backgroundColor: "#f3f4f6",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {imageLoading && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: { xs: "300px", md: "500px" },
                        minWidth: { xs: "300px", md: "600px" },
                        position: "relative",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "100%",
                          minHeight: { xs: "300px", md: "500px" },
                          minWidth: { xs: "300px", md: "600px" },
                          borderRadius: "8px",
                          backgroundColor: "#e5e7eb",
                          "&::after": {
                            background:
                              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          color: "#7e6961",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            fontWeight: 500,
                          }}
                        >
                          Memuat peta...
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Image
                    key={selectedParameter} // Force re-render when parameter changes
                    src={
                      mapParameters[
                        selectedParameter as keyof typeof mapParameters
                      ].image || "/placeholder.svg"
                    }
                    alt={
                      mapParameters[
                        selectedParameter as keyof typeof mapParameters
                      ].title
                    }
                    width={0}
                    height={0}
                    sizes="100vw"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    priority
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "calc(90vh - 120px)",
                      objectFit: "contain",
                      display: imageLoading ? "none" : "block",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        {/* Dialog Actions with Download Buttons */}
        <DialogActions
          sx={{
            padding: { xs: "12px 16px", md: "16px 24px" },
            backgroundColor: "#f9fafb",
            borderTop: "1px solid #cbc0b2",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "12px", sm: "0" },
          }}
        >
          <div>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#550b14",
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "1rem" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {
                mapParameters[selectedParameter as keyof typeof mapParameters]
                  .title
              }
            </Typography>
          </div>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "12px", sm: "8px" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {/* Download Buttons - Side by Side on Mobile Only */}
            <Box
              sx={{
                display: { xs: "flex", sm: "contents" },
                gap: { xs: "8px", sm: "0" },
                flexDirection: { xs: "row", sm: "row" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Button
                variant="outlined"
                onClick={() => handleDownload("PNG")}
                sx={{
                  borderColor: "#550b14",
                  color: "#550b14",
                  textTransform: "none",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  padding: { xs: "8px 12px", md: "8px 16px" },
                  flex: { xs: 1, sm: "0 1 auto" },
                  width: { xs: "auto", sm: "auto" },
                  marginRight: { xs: "0", sm: "8px" },
                  "&:hover": {
                    backgroundColor: "#550b14",
                    color: "white",
                  },
                }}
              >
                <Download style={{ width: 16, height: 16, marginRight: 8 }} />
                Download PNG
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleDownload("PDF")}
                sx={{
                  borderColor: "#550b14",
                  color: "#550b14",
                  textTransform: "none",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  padding: { xs: "8px 12px", md: "8px 16px" },
                  flex: { xs: 1, sm: "0 1 auto" },
                  width: { xs: "auto", sm: "auto" },
                  marginRight: { xs: "0", sm: "8px" },
                  "&:hover": {
                    backgroundColor: "#550b14",
                    color: "white",
                  },
                }}
              >
                <Download style={{ width: 16, height: 16, marginRight: 8 }} />
                Download PDF
              </Button>
            </Box>

            {/* Close Button */}
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "#550b14",
                color: "white",
                textTransform: "none",
                fontSize: { xs: "0.875rem", md: "1rem" },
                padding: { xs: "8px 12px", md: "8px 16px" },
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  backgroundColor: "#7e6961",
                },
              }}
            >
              Tutup
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
