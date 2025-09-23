// components/layout/Header.tsx
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Flash Sale", href: "/flash-sale" },
  { name: "Designers", href: "/designers" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About Us", href: "/about" },
  {name: "cart", href: "/cart"},
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // ✅ Real auth state from Redux
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLoggedIn = Boolean(user);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((open) => !open);
  }, []);

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/portfolio");
    }
  };

  const renderLink = (link: typeof navigationLinks[number], isMobile = false) => {
    const isActive = router.pathname === link.href;
    const baseClass = isMobile
      ? "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
      : "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";

    const activeClass = isMobile
      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
      : "border-indigo-500 text-gray-900";

    const inactiveClass = isMobile
      ? "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

    if (link.name === "Portfolio") {
      return (
        <a
          key={link.name}
          href={link.href}
          onClick={handlePortfolioClick}
          className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
        >
          {link.name}
        </a>
      );
    }

    return (
      <Link
        key={link.name}
        href={link.href}
        className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Gada Vault logo" width={48} height={48} priority />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden sm:ml-6 sm:flex sm:space-x-8" aria-label="Primary navigation">
            {navigationLinks.map((link) => renderLink(link))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1" aria-label="Mobile primary navigation">
            {navigationLinks.map((link) => renderLink(link, true))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
