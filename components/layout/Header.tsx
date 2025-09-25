"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBell,
  FaUserCircle,
  FaTh,
  FaPaintBrush,
  FaBlog,
  FaStore,
  FaCrown,
  FaEnvelope,
} from "react-icons/fa";

const Header = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-purple-600">
          GadaVault
        </Link>

        {/* Right-side icons */}
        <div className="flex items-center gap-6">
          {/* Grid Menu */}
          <div className="relative">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="hover:text-purple-600"
            >
              <FaTh size={20} />
            </button>
            {showGrid && (
              <div className="absolute right-0 mt-2 grid grid-cols-3 gap-4 bg-white shadow-lg rounded-lg p-4 w-64">
                {[
                  { href: "/designers", icon: <FaPaintBrush />, label: "Design" },
                  { href: "/products", icon: <FaStore />, label: "Products" },
                  { href: "/blog", icon: <FaBlog />, label: "Blog" },
                  { href: "/contact", icon: <FaEnvelope />, label: "Contact" },
                  { href: "#", icon: <FaCrown />, label: "Premium" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex flex-col items-center text-gray-700 hover:text-purple-600"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="hover:text-purple-600"
            >
              <FaBell size={20} />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4">
                <p className="font-semibold text-gray-800">Notifications</p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="bg-purple-50 p-2 rounded">
                    🔥 New Portfolio uploaded by Amina
                  </li>
                  <li className="bg-purple-50 p-2 rounded">
                    💡 Your idea got 12 likes
                  </li>
                  <li className="bg-purple-50 p-2 rounded">
                    🎉 Welcome to GadaVault!
                  </li>
                </ul>
                <button className="mt-3 text-xs text-purple-600 hover:underline">
                  Mark all as read
                </button>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="hover:text-purple-600"
            >
              <FaUserCircle size={24} />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FaUserCircle size={28} className="text-gray-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Jiruu K</p>
                    <p className="text-xs text-gray-500">Level 3 Creator</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-2 rounded mb-3">
                  <div className="bg-purple-600 h-2 rounded w-2/3"></div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link href="/settings">Settings</Link>
                  </li>
                  <li>
                    <Link href="/cart">Cart</Link>
                  </li>
                  <li>
                    <Link href="/logout" className="text-red-500">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
