"use client";

import React from "react";
import SplitText from "./SplitText";

const Banner = () => {


  return (
    <>
      <style jsx>{`
        @keyframes backgroundPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes buttonShine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .bg-gradient-custom {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .bg-overlay::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 25% 25%,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%
            );
          animation: backgroundPulse 8s ease-in-out infinite;
        }

        .text-shimmer {
          background: linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }

        .animate-float-1 {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float 6s ease-in-out infinite -2s;
        }

        .animate-float-3 {
          animation: float 6s ease-in-out infinite -4s;
        }

        .animate-float-4 {
          animation: float 6s ease-in-out infinite -1s;
        }

        .animate-fade-up {
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .animate-fade-up-delay {
          animation: fadeInUp 1s ease-out 1s both;
        }

        .animate-slide-right {
          animation: slideInRight 1s ease-out;
        }

        .animate-sparkle-1 {
          animation: sparkle 4s linear infinite;
        }

        .animate-sparkle-2 {
          animation: sparkle 4s linear infinite -1s;
        }

        .animate-sparkle-3 {
          animation: sparkle 4s linear infinite -2s;
        }

        .animate-sparkle-4 {
          animation: sparkle 4s linear infinite -3s;
        }

        .animate-sparkle-5 {
          animation: sparkle 4s linear infinite -0.5s;
        }

        .btn-gradient {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }

        .btn-gradient:hover {
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
        }

        .btn-gradient::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.6s;
        }

        .btn-gradient:hover::before {
          left: 100%;
        }

        /* --- Responsive Adjustments --- */

        /* Extra small devices (phones, 600px and down) */
        @media (max-width: 600px) {
          .banner-container {
            height: 300px; /* Smaller height for very small screens */
          }
          .text-shimmer {
            font-size: 2.2rem;
            margin-bottom: 0.5rem; /* Adjust margin */
          }
          .banner-subtitle {
            font-size: 0.9rem;
            margin-bottom: 1.5rem; /* Adjust margin */
          }
          .btn-gradient {
            padding: 12px 24px;
            font-size: 0.9rem;
          }
          .floating-shape {
            width: 40px;
            height: 40px;
          }
          .sparkle-particle {
            width: 0.8px;
            height: 0.8px;
          }
          .timer-badge {
            top: 15px;
            right: 15px;
            padding: 8px 12px;
            font-size: 0.8rem;
          }
        }

        /* Small devices (portrait tablets and large phones, 601px to 768px) */
        @media (min-width: 601px) and (max-width: 768px) {
          .banner-container {
            height: 350px;
          }
          .text-shimmer {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          .banner-subtitle {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          .btn-gradient {
            padding: 14px 28px;
            font-size: 1rem;
          }
          .floating-shape {
            width: 50px;
            height: 50px;
          }
          .sparkle-particle {
            width: 1px;
            height: 1px;
          }
          .timer-badge {
            top: 20px;
            right: 20px;
            padding: 10px 15px;
            font-size: 0.9rem;
          }
        }

        /* Medium devices (landscape tablets, 769px to 992px) */
        @media (min-width: 769px) and (max-width: 992px) {
          .banner-container {
            height: 400px;
          }
          .text-shimmer {
            font-size: 4rem;
          }
          .banner-subtitle {
            font-size: 1.1rem;
          }
          .btn-gradient {
            padding: 16px 32px;
            font-size: 1.1rem;
          }
          .floating-shape {
            width: 70px;
            height: 70px;
          }
        }

        /* Large devices (laptops/desktops, 993px and up) */
        @media (min-width: 993px) {
          .banner-container {
            height: 450px; /* Slightly taller for larger screens */
          }
          .text-shimmer {
            font-size: 5rem;
          }
          .banner-subtitle {
            font-size: 1.25rem;
          }
          .btn-gradient {
            padding: 18px 36px;
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="relative w-full h-96 md:h-[400px] overflow-hidden bg-gradient-custom bg-overlay flex items-center justify-center font-sans banner-container">
        {/* Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-20 h-20 bg-white bg-opacity-10 rounded-full top-1/5 left-1/10 animate-float-1 floating-shape"></div>
          <div className="absolute w-30 h-30 bg-white bg-opacity-10 rounded-full top-3/5 right-[15%] animate-float-2 floating-shape"></div>
          <div className="absolute w-15 h-15 bg-white bg-opacity-10 rounded-full top-[30%] right-1/4 animate-float-3 floating-shape"></div>
          <div className="absolute w-25 h-25 bg-white bg-opacity-10 rounded-full bottom-1/5 left-1/5 animate-float-4 floating-shape"></div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-1/4 left-[15%] animate-sparkle-1 sparkle-particle"></div>
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-[45%] left-[85%] animate-sparkle-2 sparkle-particle"></div>
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-3/4 left-1/4 animate-sparkle-3 sparkle-particle"></div>
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-[15%] left-3/4 animate-sparkle-4 sparkle-particle"></div>
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-[85%] left-[65%] animate-sparkle-5 sparkle-particle"></div>
        </div>

        {/* Main Content */}
        <div className="text-center z-10 relative text-white px-4">
          <SplitText
            text="1MinuteShop"
            className="text-5xl md:text-6xl font-bold mb-4 text-shimmer"
            splitType="chars"
            delay={60}
            duration={0.7}
            ease="power3.out"
          />
          <div className="text-lg md:text-xl opacity-90 mb-8 animate-fade-up banner-subtitle">
            Lightning-fast shopping experience in just 60 seconds
          </div>
          <button className="relative inline-block px-8 py-4 btn-gradient text-white font-bold text-lg rounded-full transition-all duration-300 hover:-translate-y-0.5 animate-fade-up-delay overflow-hidden">
            My Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
