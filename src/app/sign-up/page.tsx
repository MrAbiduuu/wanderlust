"use client";

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
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import type { FormEvent } from "react";

export default function SignUpPage() {
  const handleEmailSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };
    const { data, error } = await authClient.signUp.email({
      ...user,
    });
    if (data) {
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-sky-50 via-white to-cyan-50 px-4 py-10">
      <div className="w-full max-w-lg space-y-6">
        <Card className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-sky-100/50">
          {/* Top Accent */}
          <div className="h-1.5 w-full bg-linear-to-r from-sky-500 via-cyan-400 to-teal-400" />

          <CardHeader className="space-y-2 px-6 pt-8 text-center sm:px-8">
            <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-2xl font-bold text-sky-600 ring-1 ring-sky-100">
              ✦
            </div>

            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Create your account
            </CardTitle>

            <CardDescription className="text-sm leading-6 text-gray-500">
              Join us today and start your next adventure.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8 sm:px-8">
            <form onSubmit={handleEmailSignUp}>
              <FieldGroup className="gap-5">
                {/* Social Login */}
                <Field className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="h-11 rounded-xl border-gray-200 bg-white font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="currentColor"
                    >
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                    Apple
                  </Button>

                  <Button
                    variant="outline"
                    type="button"
                    className="h-11 rounded-xl border-gray-200 bg-white font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-5"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.09-1.93 3.27-4.77 3.27-8.09Z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.99 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.15a11 11 0 0 0 0 9.88l3.69-2.84Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45.99 14.97 0 12 0A11 11 0 0 0 2.15 7.06l3.69 2.84C6.71 7.29 9.14 4.36 12 4.36Z"
                      />
                    </svg>
                    Google
                  </Button>
                </Field>

                <FieldSeparator className="text-xs text-gray-400 **:data-[slot=field-separator-content]:bg-white">
                  OR SIGN UP WITH EMAIL
                </FieldSeparator>

                {/* Name */}
                <Field>
                  <FieldLabel
                    htmlFor="name"
                    className="font-semibold text-gray-700"
                  >
                    Full name
                  </FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Abid Hasan"
                    autoComplete="name"
                    required
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 transition-all placeholder:text-gray-400 focus-visible:border-sky-400 focus-visible:bg-white focus-visible:ring-sky-100"
                  />
                </Field>

                {/* Email */}
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
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 transition-all placeholder:text-gray-400 focus-visible:border-sky-400 focus-visible:bg-white focus-visible:ring-sky-100"
                  />
                </Field>

                {/* Image URL */}
                <Field>
                  <FieldLabel
                    htmlFor="imageUrl"
                    className="font-semibold text-gray-700"
                  >
                    Profile image URL
                    <span className="ml-1 font-normal text-gray-400">
                      (Optional)
                    </span>
                  </FieldLabel>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/profile.jpg"
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 transition-all placeholder:text-gray-400 focus-visible:border-sky-400 focus-visible:bg-white focus-visible:ring-sky-100"
                  />
                  <FieldDescription className="text-xs text-gray-400">
                    Add a direct link to your profile picture.
                  </FieldDescription>
                </Field>

                {/* Password */}
                <Field>
                  <FieldLabel
                    htmlFor="password"
                    className="font-semibold text-gray-700"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                    className="h-11 rounded-xl border-gray-200 bg-gray-50/50 transition-all placeholder:text-gray-400 focus-visible:border-sky-400 focus-visible:bg-white focus-visible:ring-sky-100"
                  />
                  <FieldDescription className="text-xs text-gray-400">
                    Use a strong password to protect your account.
                  </FieldDescription>
                </Field>

                {/* Submit */}
                <Field className="gap-4 pt-1">
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-sky-600 text-base font-semibold text-white shadow-lg shadow-sky-100 transition-all hover:bg-sky-700 active:scale-[0.99]"
                  >
                    Create account
                  </Button>

                  <FieldDescription className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-semibold text-sky-600 underline-offset-4 hover:text-sky-700 hover:underline"
                    >
                      Log in
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        {/* Terms */}
        <FieldDescription className="px-5 text-center text-xs leading-5 text-gray-400">
          By creating an account, you agree to our{" "}
          <a
            href="/terms"
            className="font-medium text-gray-600 underline-offset-4 hover:text-sky-600 hover:underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="font-medium text-gray-600 underline-offset-4 hover:text-sky-600 hover:underline"
          >
            Privacy Policy
          </a>
          .
        </FieldDescription>
      </div>
    </div>
  );
}
