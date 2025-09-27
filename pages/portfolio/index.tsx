import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Portfolio() {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <Head>
        <title>My Portfolio - GadaVault</title>
        <meta name="description" content="Your portfolio of designs and products" />
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Portfolio</h1>
            <p className="text-lg text-gray-600">Welcome to your portfolio, {currentUser.name}!</p>
            <p className="mt-4 text-gray-500">This is a stub page. Add your portfolio content here.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
