// pages/profile/index.tsx
"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import AvatarMenu from "@/components/users/AvatarMenu";
import { loginUser, registerUser, socialLogin } from "@/utils/api"; // assume you implement socialLogin

type AuthMode = "login" | "register";

export default function ProfilePage() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle login/register submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let data;
      if (mode === "login") {
        data = await loginUser({ email, password });
      } else {
        data = await registerUser({ email, password });
      }

      dispatch(setUser(data.user));
      // After auth, clear form
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setError(errorObj?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider: "google" | "linkedin" | "twitter") => {
    setLoading(true);
    setError(null);
    try {
      const data = await socialLogin(provider);
      dispatch(setUser(data.user));
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setError(errorObj?.message || `Failed to login with ${provider}.`);
    } finally {
      setLoading(false);
    }
  };

  // If logged in, show profile
  if (currentUser) {
    return (
      <>
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-lg bg-white shadow">
              <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
              <p className="text-gray-600">
                Manage your email, password, and other account details here.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-white shadow">
              <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
              <AvatarMenu user={currentUser} />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Otherwise, show login/register
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow">
          <div className="flex justify-between mb-6">
            <button
              className={`flex-1 py-2 font-semibold border-b-2 ${
                mode === "login" ? "border-indigo-500" : "border-transparent text-gray-500"
              }`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 font-semibold border-b-2 ${
                mode === "register" ? "border-indigo-500" : "border-transparent text-gray-500"
              }`}
              onClick={() => setMode("register")}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <p className="text-red-600 bg-red-50 p-2 rounded text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 text-gray-500 mt-4">
            <span>Or continue with</span>
          </div>

          <div className="flex justify-center gap-4 mt-2">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
            >
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("linkedin")}
              disabled={loading}
            >
              LinkedIn
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("twitter")}
              disabled={loading}
            >
              Twitter
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
