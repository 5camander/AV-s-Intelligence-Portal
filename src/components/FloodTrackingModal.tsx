"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

export default function FloodTrackingModal() {
  const [selectedParameter, setSelectedParameter] = useState("curahhujan");
  const [open, setOpen] = useState(false);

  const mapParameters = {
    curahhujan: {
      title: "Peta Curah Hujan",
      description:
        "Analisis distribusi curah hujan dan intensitas presipitasi di wilayah Sumatera Selatan",
      image: "/AV-s-Intelligence-Portal/peta/curahhujan.png",
    },
    kelerengan: {
      title: "Peta Kelerengan",
      description:
        "Analisis kemiringan lereng yang mempengaruhi aliran air permukaan dan resiko banjir",
      image: "/AV-s-Intelligence-Portal/peta/Kelerengan.png",
    },
    ketinggian: {
      title: "Peta Ketinggian",
      description:
        "Analisis elevasi dan topografi wilayah untuk identifikasi daerah rawan genangan",
      image: "/AV-s-Intelligence-Portal/peta/ketinggiankedua.png",
    },
    jenis_tanah: {
      title: "Peta Jenis Tanah",
      description:
        "Klasifikasi jenis tanah dan kemampuan infiltrasi air ke dalam tanah",
      image: "/AV-s-Intelligence-Portal/peta/PETAJENISTANAH.png",
    },
    kerapatan_sungai: {
      title: "Peta Kerapatan Aliran Sungai",
      description:
        "Analisis jaringan sungai dan kerapatan aliran yang mempengaruhi drainase alami",
      image: "/AV-s-Intelligence-Portal/peta/PETAKERAPATANALIRANSUNGAI.png",
    },
    tutupan_lahan: {
      title: "Peta Tutupan Lahan",
      description:
        "Klasifikasi penggunaan dan tutupan lahan serta dampaknya terhadap aliran permukaan",
      image: "/AV-s-Intelligence-Portal/peta/tutupanlahan.png",
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
      fileUrl = `/AV-s-Intelligence-Portal/pdf/${fileName}.pdf`;
      downloadFileName = `${fileName}.pdf`;
    } else if (format === "PNG") {
      fileUrl = `/AV-s-Intelligence-Portal/peta/${fileName}.png`;
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
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "#550b14",
          color: "#f8f8f7",
          textTransform: "none",
          paddingLeft: "16px",
          paddingRight: "16px",
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
            width: "90vw",
            height: "90vh",
            maxWidth: "none",
            maxHeight: "none",
            margin: 0,
          },
        }}
      >
        <DialogContent sx={{ padding: 0, height: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            {/* Left Sidebar */}
            <div
              style={{
                width: "320px",
                backgroundColor: "#f9fafb",
                borderRight: "1px solid #cbc0b2",
                padding: "24px",
                overflowY: "auto",
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <DialogTitle
                  sx={{
                    padding: 0,
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#550b14",
                    marginBottom: "8px",
                  }}
                >
                  Peta Analisis Banjir
                </DialogTitle>
                <p style={{ fontSize: "0.875rem", color: "#7e6961" }}>
                  Sumatera Selatan
                </p>
              </div>

              {/* Map Information */}
              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#550b14",
                    marginBottom: "16px",
                  }}
                >
                  Informasi Peta
                </h3>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "16px",
                    border: "1px solid #cbc0b2",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 600,
                      color: "#550b14",
                      marginBottom: "8px",
                    }}
                  >
                    {
                      mapParameters[
                        selectedParameter as keyof typeof mapParameters
                      ].title
                    }
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "#7e6961" }}>
                    {
                      mapParameters[
                        selectedParameter as keyof typeof mapParameters
                      ].description
                    }
                  </p>
                </div>
              </div>

              {/* Parameter Selection */}
              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#550b14",
                    marginBottom: "16px",
                  }}
                >
                  Pilih Parameter
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
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
                      onClick={() => setSelectedParameter(param.key)}
                      sx={{
                        width: "100%",
                        justifyContent: "flex-start",
                        height: "48px",
                        textAlign: "left",
                        textTransform: "none",
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
                </div>
              </div>

              {/* Download Section - Moved to DialogActions */}
            </div>

            {/* Main Map Area */}
            <div
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "#f1f3f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  padding: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
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
                  <Image
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
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "calc(90vh - 120px)",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>

        {/* Dialog Actions with Download Buttons */}
        <DialogActions
          sx={{
            padding: "16px 24px",
            backgroundColor: "#f9fafb",
            borderTop: "1px solid #cbc0b2",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#550b14",
                fontWeight: 600,
              }}
            >
              {
                mapParameters[selectedParameter as keyof typeof mapParameters]
                  .title
              }
            </Typography>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              variant="outlined"
              onClick={() => handleDownload("PNG")}
              sx={{
                borderColor: "#550b14",
                color: "#550b14",
                textTransform: "none",
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
                "&:hover": {
                  backgroundColor: "#550b14",
                  color: "white",
                },
              }}
            >
              <Download style={{ width: 16, height: 16, marginRight: 8 }} />
              Download PDF
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "#550b14",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#7e6961",
                },
              }}
            >
              Tutup
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
