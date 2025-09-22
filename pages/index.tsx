// pages/index.tsx
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gada Vault | Home</title>
        <meta
          name="description"
          content="Discover and shop authentic African traditional products on Gada Vault."
        />
        <meta property="og:title" content="Gada Vault" />
        <meta
          property="og:description"
          content="A vault of African traditional crafts, connecting buyers, sellers, and designers."
        />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Gada Vault
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          Your marketplace for authentic African traditional crafts and designs.
          Explore products, connect with sellers, and preserve cultural heritage.
        </p>

        <Image
          src="/hero.jpg"
          alt="Showcase of African traditional crafts"
          width={600}
          height={400}
          priority
          className="rounded-xl shadow-lg mb-8"
        />

        <Link
          href="/login"
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Get Started
        </Link>
      </main>
    </>
  )
}

export default Home
