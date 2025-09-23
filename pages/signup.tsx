import AuthForm from "@/components/users/AuthForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <AuthForm mode="register" />
    </div>
  );
}
