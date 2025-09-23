// pages/404.tsx
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Custom404 = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-128px)] bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col justify-center items-center text-white text-center px-6">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 animate-pulse">
          Oops! 😱
        </h1>

        {/* Subheading */}
        <p className="text-2xl md:text-3xl mb-6 font-semibold">
          We can't seem to find the page you're looking for.
        </p>

        {/* Funny message */}
        <p className="text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
          Maybe it was abducted by aliens 👽, or it just took a wrong turn into the Internet wilderness! Either way, it's not here.
        </p>

        {/* Back home button */}
        <Link
          href="/"
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <FaHome size={22} />
          <span>Go Back Home</span>
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default Custom404;
