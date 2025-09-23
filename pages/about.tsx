// pages/about.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => (
  <>
    <Header />
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">About Gadavault</h1>
      <p className="mb-4">
        Gadavault is an e-commerce platform with a unique mission:
        <strong> Preserving Roots, while Designing Futures.</strong>
      </p>
      <p className="mb-4">
        We celebrate authentic African fashion, lifestyle, and design —
        connecting traditional markets with the digital world. Every purchase
        supports artisans and small businesses, while giving you access to
        high-quality, culturally-rooted products.
      </p>
      <p>
        Join us in shaping the future of African fashion and heritage, one
        product at a time.
      </p>
    </main>
    <Footer />
  </>
);

export default About;
