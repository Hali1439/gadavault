// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    section: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    section: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Shipping & Returns", href: "/shipping" },
    ],
  },
];

const socialMedia = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/halima-muktar-b77037371",
    iconSrc: "/icons/Linkedln.png",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/gadavault",
    iconSrc: "/icons/instagram.png",
  },
  {
    name: "Twitter",
    href: "https://x.com/@halima27590",
    iconSrc: "/icons/twitter.png",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Links sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {footerLinks.map((section) => (
              <div key={section.section}>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {section.section}
                </h3>
                <ul className="mt-4 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social media */}
          <div className="mt-8 md:mt-0 flex items-center space-x-6">
            {socialMedia.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <Image
                  src={social.iconSrc}
                  alt={`${social.name} icon`}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Gada Vault. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
