"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-50 via-white to-cyan-50 px-4 py-10">
      <div className="w-full max-w-lg space-y-6">
        <Card className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-sky-100/50">
          <div className="h-1.5 w-full bg-linear-to-r from-sky-500 via-cyan-400 to-teal-400" />

          <CardHeader className="space-y-2 px-6 pt-8 text-center sm:px-8">
            <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
              <LogIn className="size-7" />
            </div>

            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Welcome back
            </CardTitle>

            <CardDescription className="text-sm leading-6 text-gray-500">
              Sign in to your account and continue your journey.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8 sm:px-8">
            <form onSubmit={handleEmailLogin}>
              <FieldGroup className="gap-5">
                <FieldSeparator className="text-xs text-gray-400 **:data-[slot=field-separator-content]:bg-white">
                  SIGN IN WITH EMAIL
                </FieldSeparator>

                <Field>
                  <FieldLabel
                    htmlFor="email"
                    className="font-semibold text-gray-700"
                  >
                    Email address
                  </FieldLabel>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 placeholder:text-gray-400 focus-visible:border-sky-400 focus-visible:bg-white focus-visible:ring-sky-100"
                  />
                </Field>

                <Field>
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel
                      htmlFor="password"
                      className="font-semibold text-gray-700"
                    >
                      Password
                    </FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pr-11 placeholder:text-gray-400 focus-visible:border-sky-400 focus-visible:bg-white focus-visible:ring-sky-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-sky-600"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {errorMessage}
                  </div>
                )}

                <Field className="gap-4 pt-1">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-xl bg-sky-600 text-base font-semibold text-white shadow-lg shadow-sky-100 transition-all hover:bg-sky-700 active:scale-[0.99] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="size-4" />
                        Sign in
                      </>
                    )}
                  </Button>

                  <FieldDescription className="text-center text-sm text-gray-500">
                    Dont have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="font-semibold text-sky-600 underline-offset-4 hover:text-sky-700 hover:underline"
                    >
                      Create an account
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <p className="px-5 text-center text-xs leading-5 text-gray-400">
          Securely sign in to access your account.
        </p>
      </div>
    </main>
  );
}
