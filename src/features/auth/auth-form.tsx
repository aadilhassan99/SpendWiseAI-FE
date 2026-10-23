"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { authStorage } from "@/lib/auth";
import { authApi } from "./api";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const register = mode === "register";
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  async function submit(formData: FormData) {
    setError(undefined);
    setLoading(true);
    try {
      const payload = {
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      };
      const session = register
        ? await authApi.register({
            ...payload,
            firstName: String(formData.get("firstName")),
            lastName: String(formData.get("lastName")),
          })
        : await authApi.login(payload);
      authStorage.setToken(session.accessToken);
      router.replace(params.get("next") || "/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form action={submit} className="auth-form">
      <div>
        <p className="eyebrow">Welcome to SpendWise</p>
        <h1>{register ? "Create your account" : "Sign in to your account"}</h1>
        <p className="muted">
          {register
            ? "Start organizing your financial life."
            : "Manage your money with clarity."}
        </p>
      </div>
      {register && (
        <div className="form-grid">
          <Input
            name="firstName"
            label="First name"
            required
            autoComplete="given-name"
          />
          <Input
            name="lastName"
            label="Last name"
            required
            autoComplete="family-name"
          />
        </div>
      )}
      <Input
        name="email"
        type="email"
        label="Email address"
        required
        autoComplete="email"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        minLength={8}
        required
        autoComplete={register ? "new-password" : "current-password"}
      />
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" loading={loading}>
        {register ? "Create account" : "Sign in"}
      </Button>
      <p className="auth-switch">
        {register ? "Already have an account?" : "New to SpendWise?"}{" "}
        <Link href={register ? "/login" : "/register"}>
          {register ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
