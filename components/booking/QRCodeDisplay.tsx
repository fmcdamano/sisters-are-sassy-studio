"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRCodeDisplayProps {
  value: string; // full URL, e.g. https://sistersaresassystudio.com/booking/TOKEN
  token: string;
}

export function QRCodeDisplay({ value, token }: QRCodeDisplayProps) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      // Render QR to SVG string, then convert to downloadable PNG via canvas
      const svgEl = document.getElementById("booking-qr-svg");
      if (!svgEl) return;

      const svgData = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `booking-qr-${token}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("QR code downloaded!");
    } catch {
      toast.error("Could not download QR code. Please screenshot this page instead.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* QR Code */}
      <div className="bg-white p-4 rounded-card border-2 border-teal/30 shadow-sm">
        <QRCode
          id="booking-qr-svg"
          value={value}
          size={180}
          fgColor="#2C2C2C"
          bgColor="#FFFFFF"
          style={{ display: "block" }}
        />
      </div>

      {/* Caption */}
      <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">
        Scan this QR code anytime to view or manage your session details.
      </p>

      {/* Download */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={downloading}
      >
        <Download size={14} />
        {downloading ? "Downloading…" : "Download QR Code"}
      </Button>
    </div>
  );
}
