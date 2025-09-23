// pages/designers.tsx
"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/common/Button";
import Image from "next/image";

const designersCTA = [
  { label: "Upload Your Portfolio", action: () => alert("Upload portfolio clicked!") },
  { label: "Post Your Idea", action: () => alert("Post your idea clicked!") },
  { label: "Join the Community", action: () => alert("Join community clicked!") },
  { label: "Collaborate with Designers", action: () => alert("Collaborate clicked!") },
  { label: "Get Featured", action: () => alert("Get Featured clicked!") },
];

const featuredDesigners = [
  { name: "Amina N.", img: "/Liputa (DRC).png", role: "Fashion Designer" },
  { name: "Mandela S.", img: "/Madiba Shirt (South Africa).png", role: "Textile Artist" },
  { name: "Qorii T.", img: "/qorii.png", role: "Graphic Designer" },
];

const DesignersPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Designers Hub</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Showcase your talent, collaborate with peers, and get inspired by Africa's top creatives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {designersCTA.map((btn) => (
              <Button
                key={btn.label}
                onClick={btn.action}
                variant="primary"
                className="hover:scale-105 transform transition"
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Featured Designers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Featured Designers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredDesigners.map((designer) => (
              <div
                key={designer.name}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105 transform transition duration-300"
              >
                <div className="w-32 h-32 relative mb-4">
                  <Image
                    src={designer.img}
                    alt={designer.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{designer.name}</h3>
                <p className="text-gray-500">{designer.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ideas & Inspiration Section */}
        <section className="mb-16 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg shadow-inner">
          <h2 className="text-3xl font-semibold mb-4 text-center">Ideas & Inspiration</h2>
          <p className="text-center text-gray-600 mb-6">
            Share your creative ideas, get feedback, and discover trending projects from the community.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              variant="secondary"
              onClick={() => alert("Explore trending ideas")}
              className="hover:scale-105 transform transition"
            >
              Explore Trending Ideas
            </Button>
            <Button
              variant="secondary"
              onClick={() => alert("Submit a new idea")}
              className="hover:scale-105 transform transition"
            >
              Submit Your Idea
            </Button>
          </div>
        </section>

        {/* Community Highlights Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Community Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["Collaboration Stories", "Top Creators", "Monthly Challenges"].map((title) => (
              <div
                key={title}
                className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DesignersPage;
