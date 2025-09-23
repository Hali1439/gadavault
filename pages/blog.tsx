// pages/blog.tsx
"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaHeart, FaShareAlt } from "react-icons/fa";

interface BlogPost {
  title: string;
  excerpt: string;
  img: string;
  author: string;
  date: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    title: "The Silent Strength of Arsi Women: Redefining Rights & Resilience",
    excerpt:
      "Among the Arsi Oromo of Ethiopia, women’s voices rise not only in ritual but in resistance — weaving identity, justice, and design into every thread of their lives.",
    img: "/arsi-woman.jpg", // Replace with your asset
    author: "Halima M.",
    date: "Sept 2025",
    slug: "arsi-women-rights",
  },
  {
    title: "African Aesthetics in Motion: From Mud Cloth to Digital Canvas",
    excerpt:
      "African design is more than pattern — it’s rhythm, memory, and rebellion. See how ancient motifs inspire the next-gen digital creators.",
    img: "/african-pattern.jpg",
    author: "CodeVortex",
    date: "Sept 2025",
    slug: "african-aesthetics-digital",
  },
  {
    title: "The Future is Woven: Fashion as Political Language",
    excerpt:
      "Across Africa, textiles are more than fabric — they’re statements. Explore how designers transform weaving into powerful manifestos.",
    img: "/woven-future.jpg",
    author: "Nia A.",
    date: "Sept 2025",
    slug: "fashion-political-language",
  },
];

const BlogPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Article */}
        <section className="mb-16">
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={posts[0].img}
              alt={posts[0].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{posts[0].title}</h1>
              <p className="max-w-2xl mb-6">{posts[0].excerpt}</p>
              <button className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold transition">
                Read More →
              </button>
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section>
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Latest Stories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow hover:shadow-2xl transition duration-300 flex flex-col overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 flex-1">{post.excerpt}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    By <span className="font-semibold">{post.author}</span> • {post.date}
                  </div>

                  {/* Post Actions */}
                  <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-3 text-gray-500">
                      <button className="hover:text-red-600 transition">
                        <FaHeart />
                      </button>
                      <button className="hover:text-indigo-600 transition">
                        <FaShareAlt />
                      </button>
                    </div>
                    <div className="flex gap-3 text-gray-400">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          post.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=https://yourdomain.com/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Check this out: https://yourdomain.com/blog/${post.slug}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-500"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
