import React from 'react';

const Banner = () => {
  return (
    <>
      <style jsx>{`
        @keyframes backgroundPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes float {
          0%, 100% {
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
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
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
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes buttonShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .bg-gradient-custom {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .bg-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%);
          animation: backgroundPulse 8s ease-in-out infinite;
        }

        .text-shimmer {
          background: linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(255,255,255,0.3);
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
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s;
        }

        .btn-gradient:hover::before {
          left: 100%;
        }
      `}</style>

      <div className="relative w-full h-96 md:h-[400px] overflow-hidden bg-gradient-custom bg-overlay flex items-center justify-center font-sans">
        {/* Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-20 h-20 bg-white bg-opacity-10 rounded-full top-1/5 left-1/10 animate-float-1"></div>
          <div className="absolute w-30 h-30 bg-white bg-opacity-10 rounded-full top-3/5 right-[15%] animate-float-2"></div>
          <div className="absolute w-15 h-15 bg-white bg-opacity-10 rounded-full top-[30%] right-1/4 animate-float-3"></div>
          <div className="absolute w-25 h-25 bg-white bg-opacity-10 rounded-full bottom-1/5 left-1/5 animate-float-4"></div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-1/4 left-[15%] animate-sparkle-1"></div>
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-[45%] left-[85%] animate-sparkle-2"></div>
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-3/4 left-1/4 animate-sparkle-3"></div>
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-[15%] left-3/4 animate-sparkle-4"></div>
          <div className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full top-[85%] left-[65%] animate-sparkle-5"></div>
        </div>

        {/* Timer Badge */}
        <div className="absolute top-5 right-7 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl px-6 py-4 text-white font-bold animate-slide-right">
          <div className="text-sm opacity-80 mb-1">Quick Shopping</div>
          <div className="text-2xl text-yellow-300">⚡ 1 MIN</div>
        </div>

        {/* Main Content */}
        <div className="text-center z-10 relative text-white px-4">
          <div className="text-5xl md:text-6xl font-bold mb-4 text-shimmer">
            1MinuteShop
          </div>
          <div className="text-lg md:text-xl opacity-90 mb-8 animate-fade-up">
            Lightning-fast shopping experience in just 60 seconds
          </div>
          <button className="relative inline-block px-8 py-4 btn-gradient text-white font-bold text-lg rounded-full transition-all duration-300 hover:-translate-y-0.5 animate-fade-up-delay overflow-hidden">
            Start Shopping Now
          </button>
        </div>

        {/* Responsive adjustments for mobile */}
        <style jsx>{`
          @media (max-width: 768px) {
            .text-shimmer {
              font-size: 2.5rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Banner;