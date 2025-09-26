import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/utils/api";
import { setToken } from "@/features/user/userSlice";
import { setToken as saveToken } from "@/utils/auth";
import { LoginPayload } from "@/types/user";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      if (res?.access) {
        saveToken(res.access);
        dispatch(setToken(res.access));
        setStatus("✅ Login successful!");
      } else {
        setStatus("❌ Invalid credentials");
      }
    } catch {
      setStatus("⚠️ Login failed");
    }
  };

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
      {status && <p className="mt-2">{status}</p>}
    </main>
  );
}
