import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/users/AuthForm";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <AuthForm mode="login" />
      </div>
      <Footer />
    </>
  );
}
