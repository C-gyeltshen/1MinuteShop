"use client";

import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Setting up your storefront…",
  "Generating your product pages…",
  "Configuring your domain…",
  "Finalising your dashboard…",
  "Your store is ready.",
];

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [msgFade, setMsgFade] = useState<"in" | "out" | "visible">("in");
  const [logoVisible, setLogoVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Logo materialize
    const t0 = setTimeout(() => setLogoVisible(true), 200);

    // Grid scan canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let scanY = 0;
    let animId: number;
    let start: number | null = null;
    const DURATION = MESSAGES.length * 900 + 500;

    function drawGrid(timestamp: number) {
      animId = requestAnimationFrame(drawGrid);
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      scanY = (elapsed % (canvas!.height * 8)) / 8;

      const W = canvas!.width;
      const H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);

      // Draw grid
      const cells = 18;
      const cellW = W / cells;
      const cellH = H / cells;

      ctx!.strokeStyle = "rgba(110,55,16,0.18)";
      ctx!.lineWidth = 0.5;
      for (let i = 0; i <= cells; i++) {
        ctx!.beginPath();
        ctx!.moveTo(i * cellW, 0);
        ctx!.lineTo(i * cellW, H);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(0, i * cellH);
        ctx!.lineTo(W, i * cellH);
        ctx!.stroke();
      }

      // Laser scan
      const laserY = scanY % H;
      const grad = ctx!.createLinearGradient(0, laserY - 20, 0, laserY + 4);
      grad.addColorStop(0, "rgba(224,115,40,0)");
      grad.addColorStop(0.6, "rgba(224,115,40,0.04)");
      grad.addColorStop(1, "rgba(224,115,40,0.9)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, laserY - 20, W, 24);

      // Sharp laser line
      ctx!.strokeStyle = "rgba(224,115,40,0.95)";
      ctx!.lineWidth = 1.5;
      ctx!.shadowColor = "rgba(224,115,40,0.8)";
      ctx!.shadowBlur = 8;
      ctx!.beginPath();
      ctx!.moveTo(0, laserY);
      ctx!.lineTo(W, laserY);
      ctx!.stroke();
      ctx!.shadowBlur = 0;
    }

    animId = requestAnimationFrame(drawGrid);

    const DURATION_PER_MSG = 900;
    const intervals: ReturnType<typeof setTimeout>[] = [];

    // Progress bar & message cycling
    const totalDuration = MESSAGES.length * DURATION_PER_MSG;
    const step = 16;
    let elapsed2 = 0;
    const progressInterval = setInterval(() => {
      elapsed2 += step;
      setProgress(Math.min((elapsed2 / totalDuration) * 100, 100));
    }, step);

    MESSAGES.forEach((_, i) => {
      if (i === 0) {
        setMsgFade("visible");
        return;
      }
      const t = setTimeout(() => {
        setMsgFade("out");
        setTimeout(() => {
          setMessageIndex(i);
          setMsgFade("in");
          setTimeout(() => setMsgFade("visible"), 50);
        }, 350);
      }, i * DURATION_PER_MSG);
      intervals.push(t);
    });

    const tFade = setTimeout(() => {
      clearInterval(progressInterval);
      setFadeOut(true);
      setTimeout(() => {
        setHidden(true);
        onComplete();
      }, 900);
    }, totalDuration + 400);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t0);
      clearTimeout(tFade);
      clearInterval(progressInterval);
      intervals.forEach(clearTimeout);
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [onComplete]);

  if (hidden) return null;

  const msgStyle: React.CSSProperties = {
    opacity: msgFade === "out" ? 0 : 1,
    transform: msgFade === "out" ? "translateY(-10px)" : msgFade === "in" ? "translateY(10px)" : "translateY(0)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "20px",
    fontWeight: 600,
    color: "rgba(240,237,232,0.85)",
    letterSpacing: "-0.4px",
    margin: 0,
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#060608",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? "hidden" : "visible",
        transition: "opacity 0.9s ease, visibility 0.9s ease",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "relative",
            width: 96,
            height: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? "scale(1)" : "scale(0.88)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              background: "#E07328",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Space Mono', monospace",
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              textAlign: "center",
              boxShadow: "0 0 48px rgba(224,115,40,0.5)",
            }}
          >
            1<br />M
          </div>
          <div
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: 26,
              border: "1.5px solid rgba(224,115,40,0.3)",
              animation: "splashRing 2s linear infinite",
            }}
          />
        </div>

        {/* Message */}
        <div style={{ height: 40, overflow: "hidden", minWidth: 320 }}>
          <p style={msgStyle}>{MESSAGES[messageIndex]}</p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "#E07328",
              borderRadius: 2,
              width: `${progress}%`,
              transition: "width 0.05s linear",
              boxShadow: "0 0 8px #E07328",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes splashRing {
          0% { transform: rotate(0deg) scale(1); opacity: 0.4; }
          50% { transform: rotate(180deg) scale(1.05); opacity: 0.8; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
