// pages/signup.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        router.push("/"); // redirect to home after signup
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
        >
          Create Account
        </button>
      </form>
      {status === "loading" && <p className="mt-4">Creating account...</p>}
      {status === "success" && <p className="mt-4 text-green-600">Account created! Redirecting...</p>}
      {status === "error" && <p className="mt-4 text-red-600">Signup failed. Try again.</p>}
    </div>
  );
};

export default Signup;
