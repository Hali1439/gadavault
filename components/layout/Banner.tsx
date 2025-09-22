export default function Banner() {
  return (
    <section className="relative bg-black text-white flex flex-col md:flex-row items-center justify-between px-8 py-12">
      <div>
        <h2 className="text-4xl font-bold">Preserving Roots, while Designing Futures</h2>
        <p className="mt-4 text-gray-300">Shop authentic African fashion, lifestyle, and design.</p>
        <button className="mt-6 px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600">
          Shop Now →
        </button>
      </div>
      <img
        src="/logo.png"
        alt="African Design"
        className="w-48 md:w-64 rounded-lg mt-6 md:mt-0"
      />
    </section>
  );
}
