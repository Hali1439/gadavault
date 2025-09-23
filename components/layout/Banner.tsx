import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BannerProps {
  imageSrc: string;
  altText: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

const Banner: React.FC<BannerProps> = ({
  imageSrc,
  altText,
  title,
  subtitle,
  buttonText,
  buttonHref,
}) => {
  return (
    <section
      className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden"
      aria-label={title}
    >
      <Image
        src={imageSrc}
        alt={altText}
        fill
        priority
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-6 sm:p-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200">
            {subtitle}
          </p>
        )}
        {buttonText && buttonHref && (
          <Link
            href={buttonHref}
            className="mt-6 inline-block bg-indigo-600 text-white py-2 px-4 rounded shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default React.memo(Banner);
