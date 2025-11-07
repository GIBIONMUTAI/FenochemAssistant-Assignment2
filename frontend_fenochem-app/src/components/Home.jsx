import React from "react";
import a1 from "../assets/a1.png";
import a2 from "../assets/a2.png";
import a3 from "../assets/a3.png";

// --- IMAGE DATA ---
const IMAGE_DATA = [
  { id: 1, src: a1, alt: "Printing Press" },
  { id: 2, src: a2, alt: "Packaged Goods" },
  { id: 3, src: a3, alt: "Car Parts" },
];

// Duplicate images for smooth marquee loop
const CAROUSEL_IMAGES = [...IMAGE_DATA, ...IMAGE_DATA];

// 🔹 Continuous image scrolling animation
const ImageMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden py-4 my-8 bg-gray-50 border-y border-gray-200">
      <style>{`
        @keyframes slide-to-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: 200%;
          animation: slide-to-left 30s linear infinite;
        }
      `}</style>

      <div className="marquee-track">
        {CAROUSEL_IMAGES.map((image, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-4 shadow-lg rounded-xl overflow-hidden transition duration-300 hover:scale-[1.03] hover:shadow-xl bg-white"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-[200px] h-[120px] object-cover"
            />
            <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🔹 Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <header className="text-center py-12 bg-white shadow-lg rounded-xl mb-12">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-2">
            Welcome to Water Quality Portal
          </h1>
          <p className="text-xl text-gray-600">
            Your trusted source for clean and safe water insights.
          </p>
        </header>

        {/* Image Marquee Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
            Showcasing Diverse Industries
          </h2>
          <ImageMarquee />
        </section>
      </div>
    </div>
  );
};

export default Home;
