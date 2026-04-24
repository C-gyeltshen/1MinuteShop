"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const hyperspeedRef = useRef<HTMLCanvasElement>(null);
  const dotGridRef = useRef<HTMLCanvasElement>(null);

  // Dot grid effect
  useEffect(() => {
    const canvas = dotGridRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 36;
    const DOT_R = 1.2;
    const BASE_OPACITY = 0.18;

    let W: number, H: number;
    let dots: { x: number; y: number; phase: number; freq: number; amp: number }[] = [];
    let animId: number;
    let t = 0;
    let mx = 0, my = 0;

    function init() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      mx = W / 2;
      my = H / 2;
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;
      dots = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * SPACING,
            y: r * SPACING,
            phase: Math.random() * Math.PI * 2,
            freq: 0.4 + Math.random() * 0.6,
            amp: 0.05 + Math.random() * 0.12,
          });
        }
      }
    }

    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMouse);

    function draw() {
      animId = requestAnimationFrame(draw);
      t += 0.012;
      ctx!.clearRect(0, 0, W, H);
      dots.forEach((d) => {
        const pulse = BASE_OPACITY + d.amp * Math.sin(t * d.freq + d.phase);
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 200);
        const opacity = Math.min(0.85, pulse + proximity * 0.55);
        const radius = DOT_R + proximity * 1.5;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle =
          proximity > 0.5
            ? `rgba(224,115,40,${opacity})`
            : `rgba(255,255,255,${opacity})`;
        ctx!.fill();
      });
    }

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", init);
    };
  }, []);

  // Hyperspeed / warp lines using vanilla canvas (no Three.js dependency needed)
  useEffect(() => {
    const canvas = hyperspeedRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let animId: number;
    let t = 0;

    const COLORS = [
      "255,255,255",
      "255,240,224",
      "224,115,40",
      "255,170,102",
      "208,208,255",
      "128,128,255",
    ];

    interface WarpLine {
      angle: number;
      r: number;
      z: number;
      length: number;
      speed: number;
      color: string;
      opacity: number;
    }

    let lines: WarpLine[] = [];

    function randRange(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function createLine(): WarpLine {
      return {
        angle: Math.random() * Math.PI * 2,
        r: randRange(10, Math.max(W, H) * 0.5),
        z: randRange(0.01, 0.5),
        length: randRange(20, 120),
        speed: randRange(0.003, 0.012),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: randRange(0.2, 0.7),
      };
    }

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      lines = Array.from({ length: 200 }, createLine);
    }

    function draw() {
      animId = requestAnimationFrame(draw);
      ctx!.clearRect(0, 0, W, H);
      t += 1;

      const cx = W / 2;
      const cy = H / 2;

      lines.forEach((l) => {
        l.z += l.speed;
        if (l.z > 1) {
          Object.assign(l, createLine(), { z: 0.01 });
        }

        // project from center
        const scale = l.z;
        const x1 = cx + Math.cos(l.angle) * l.r * scale;
        const y1 = cy + Math.sin(l.angle) * l.r * scale;
        const x2 = cx + Math.cos(l.angle) * (l.r * scale + l.length * scale);
        const y2 = cy + Math.sin(l.angle) * (l.r * scale + l.length * scale);

        const alpha = Math.min(l.opacity, l.z * 1.5);
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = `rgba(${l.color},${alpha})`;
        ctx!.lineWidth = scale * 1.5;
        ctx!.stroke();
      });
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={hyperspeedRef}
        className="fixed inset-0 z-0 w-full h-full"
        style={{ opacity: 0.45 }}
      />
      <canvas
        ref={dotGridRef}
        className="fixed inset-0 z-[1] w-full h-full pointer-events-none"
      />
    </>
  );
}
