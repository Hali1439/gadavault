// components/users/AuthForm.tsx
import React, { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "@/utils/api";
import { setUser } from "@/store/slices/userSlice";
import { useRouter } from "next/router";

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      // ✅ Auto-redirect to portfolio after successful login/register
      router.push("/portfolio");
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow mx-auto mt-12"
    >
      <h2 className="text-xl font-semibold">{mode === "login" ? "Login" : "Sign Up"}</h2>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}

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

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
      </Button>
    </form>
  );
};

export default AuthForm;
