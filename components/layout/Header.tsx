import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-red-600">GadaVault</h1>
      <nav className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/about">About</Link>
        <Link href="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}
