"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

        {/* Theme Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Switch between light and dark theme.
          </p>
          <button
            onClick={toggleTheme}
            className="px-6 py-2 rounded-lg font-semibold transition 
                       bg-purple-600 text-white hover:bg-purple-700"
          >
            {theme === "light" ? "🌙 Enable Dark Mode" : "☀️ Enable Light Mode"}
          </button>
        </section>

        {/* Account Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Change Password</span>
              <button className="text-purple-600 hover:underline">Update</button>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Email Preferences</span>
              <button className="text-purple-600 hover:underline">Edit</button>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Delete Account</span>
              <button className="text-red-600 hover:underline">Delete</button>
            </li>
          </ul>
        </section>

        {/* Notifications Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <form className="space-y-3 text-gray-700 dark:text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-600" defaultChecked /> 
              Portfolio Updates
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-600" /> 
              Blog Highlights
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-600" /> 
              New Challenges
            </label>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
