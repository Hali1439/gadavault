// components/layout/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

// If there is a mobile menu (hamburger), handle its toggle
const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Flash Sale', href: '/flash-sale' },
  { name: 'Designers', href: '/designers' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((open) => !open);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" passHref>
              <a>
                <Image
                  src="/logo.svg"
                  alt="Gada Vault logo"
                  width={48}
                  height={48}
                  priority
                />
              </a>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav
            className="hidden sm:ml-6 sm:flex sm:space-x-8"
            aria-label="Primary navigation"
          >
            {navigationLinks.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link key={link.name} href={link.href} passHref>
                  <a
                    className={[
                      'inline-flex items-center px-1 pt-1 border-b-2',
                      isActive
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'text-sm font-medium'
                    ].join(' ')}
                  >
                    {link.name}
                  </a>
                </Link>
              );
            })}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <nav
            className="px-2 pt-2 pb-3 space-y-1"
            aria-label="Mobile primary navigation"
          >
            {navigationLinks.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link key={link.name} href={link.href} passHref>
                  <a
                    className={[
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                      isActive
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    ].join(' ')}
                  >
                    {link.name}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
// React.memo to avoid unnecessary re-renders when parent updates but props are stable
