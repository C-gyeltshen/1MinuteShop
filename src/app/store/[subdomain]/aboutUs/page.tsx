"use client";

import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

export default function AboutPage() {
  const team = [
    { name: "Sarah Chen", role: "Founder & CEO", emoji: "👩‍💼" },
    { name: "Marcus Johnson", role: "Head of Operations", emoji: "👨‍💼" },
    { name: "Emma Rodriguez", role: "Product Director", emoji: "👩‍💻" },
    { name: "James Wilson", role: "Customer Success Lead", emoji: "👨‍💻" },
  ];
  const values = [
    {
      title: "Quality First",
      desc: "We only curate products that meet our strict quality standards",
      emoji: "⭐",
    },
    {
      title: "Customer Focused",
      desc: "Your satisfaction is our top priority in everything we do",
      emoji: "💝",
    },
    {
      title: "Innovation",
      desc: "Constantly improving our platform and services",
      emoji: "🚀",
    },
    {
      title: "Sustainability",
      desc: "Committed to eco-friendly practices and responsible sourcing",
      emoji: "🌱",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About TechHub Store
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the story behind the best tech products and premium
              brands
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                Founded in 2020, TechHub Store was born from a simple vision: to
                make premium tech products accessible to everyone.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                We started as a small team passionate about technology, and
                today we've grown into a trusted platform serving thousands of
                customers worldwide.
              </p>
              <p className="text-gray-600 text-lg">
                Every product in our store is carefully selected and tested to
                ensure it meets our high standards for quality, performance, and
                value.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl h-96 flex items-center justify-center text-8xl shadow-2xl">
              📈
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              What drives us every single day
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{value.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg">
              Talented people dedicated to your experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to explore our products?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Shop Now →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
