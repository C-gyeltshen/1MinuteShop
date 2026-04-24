"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const hyperspeedRef = useRef<HTMLCanvasElement>(null);
  const dotGridRef = useRef<HTMLCanvasElement>(null);

  // Dot grid animation
  useEffect(() => {
    const canvas = dotGridRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 36;
    const DOT_R = 1;
    const BASE_OPACITY = 0.2;

    let W: number, H: number;
    let cols: number, rows: number;
    let dots: { x: number; y: number; phase: number; freq: number; amp: number }[] = [];
    let mx = 0, my = 0;
    let animId: number;

    function init() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      cols = Math.ceil(W / SPACING) + 1;
      rows = Math.ceil(H / SPACING) + 1;
      dots = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * SPACING,
            y: r * SPACING,
            phase: Math.random() * Math.PI * 2,
            freq: 0.4 + Math.random() * 0.6,
            amp: 0.03 + Math.random() * 0.07,
          });
        }
      }
    }

    let t = 0;

    function draw() {
      animId = requestAnimationFrame(draw);
      t += 0.012;
      ctx!.clearRect(0, 0, W, H);
      dots.forEach((d) => {
        const pulse = BASE_OPACITY + d.amp * Math.sin(t * d.freq + d.phase);
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 200);
        const opacity = Math.min(0.85, pulse + proximity * 0.35);
        const radius = DOT_R + proximity * 1.5;
        const isOrange = proximity > 0.65;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = isOrange
          ? `rgba(224,115,40,${opacity})`
          : `rgba(255,255,255,${opacity})`;
        ctx!.fill();
      });
    }

    const handleMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const handleResize = () => init();

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Hyperspeed Three.js warp
  useEffect(() => {
    const canvas = hyperspeedRef.current;
    if (!canvas || typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      const THREE = (window as any).THREE;
      if (!THREE) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 2;

      const lineCount = 280;
      const lines: any[] = [];

      for (let i = 0; i < lineCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.1 + Math.random() * 2.5;
        const speed = 0.01 + Math.random() * 0.04;
        const length = 0.05 + Math.random() * 0.3;

        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(6);
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const isOrange = Math.random() > 0.7;
        const mat = new THREE.LineBasicMaterial({
          color: isOrange ? 0xe07328 : 0xffffff,
          transparent: true,
          opacity: 0.3 + Math.random() * 0.5,
        });

        const line = new THREE.Line(geo, mat);
        scene.add(line);
        lines.push({ line, geo, angle, radius, speed, length, z: -Math.random() * 10 });
      }

      let animId: number;

      function animate() {
        animId = requestAnimationFrame(animate);

        lines.forEach((l) => {
          l.z += l.speed * 0.4;
          if (l.z > 3) l.z = -10;

          const x = Math.cos(l.angle) * l.radius;
          const y = Math.sin(l.angle) * l.radius;
          const zFront = l.z;
          const zBack = l.z - l.length;

          const pos = l.geo.attributes.position.array as Float32Array;
          pos[0] = x * (1 + zFront * 0.3);
          pos[1] = y * (1 + zFront * 0.3);
          pos[2] = zFront;
          pos[3] = x * (1 + zBack * 0.3);
          pos[4] = y * (1 + zBack * 0.3);
          pos[5] = zBack;
          l.geo.attributes.position.needsUpdate = true;
        });

        renderer.render(scene, camera);
      }

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      };
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <canvas
        ref={hyperspeedRef}
        className="fixed inset-0 z-0 w-full h-full opacity-[0.55] pointer-events-none"
      />
      <canvas
        ref={dotGridRef}
        className="fixed inset-0 z-[1] w-full h-full pointer-events-none"
      />
    </>
  );
}
