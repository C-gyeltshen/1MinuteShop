"use client";

import React, { useState } from "react";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const contactInfo = [
    {
      emoji: "✉️",
      title: "Email",
      content: "support@techhubstore.com",
      subtext: "We'll reply within 24 hours",
    },
    {
      emoji: "📞",
      title: "Phone",
      content: "+1 (555) 123-4567",
      subtext: "Mon-Fri, 9AM-6PM EST",
    },
    {
      emoji: "📍",
      title: "Address",
      content: "123 Tech Street, Silicon Valley, CA 94025",
      subtext: "Visit our showroom",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have a question? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{info.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-900 font-semibold mb-1">
                  {info.content}
                </p>
                <p className="text-gray-600 text-sm">{info.subtext}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 md:p-12 border border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-semibold text-green-900">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-700">
                      We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  📧 Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "What's your typical response time?",
                a: "We aim to respond to all inquiries within 24 business hours.",
              },
              {
                q: "Do you offer technical support?",
                a: "Yes! Our support team can help with product setup, troubleshooting, and general questions.",
              },
              {
                q: "Can I return items?",
                a: "We offer a 30-day return policy on most items. Check our return policy page for details.",
              },
              {
                q: "Do you ship internationally?",
                a: "Currently, we ship within the US. International shipping coming soon!",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
