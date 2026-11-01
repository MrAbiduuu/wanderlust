"use client";

import Image from "next/image";
import { User, LogOut, Pencil, Mail } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Add-Destinations", href: "/add-destination" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
];

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/");
  };

  return (
    <header className="relative z-10 bg-neutral-950 text-white">
      <nav className="relative flex h-14 items-center justify-between px-4">
        {/* Left: Primary Navigation */}
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  link.active
                    ? "font-medium text-cyan-400"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center: Logo */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/Images/Wanderlast.png"
            alt="Wanderlast"
            width={100}
            height={24}
            priority
            className="h-5 w-auto brightness-125"
          />
        </Link>
        {/* Right: Dynamic Authentication */}
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              {/* User Profile Popover */}
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-white hover:bg-white/10 hover:text-cyan-400"
                    />
                  }
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-8 items-center justify-center rounded-full bg-neutral-800">
                      <User size={18} />
                    </div>
                  )}

                  <span className="font-medium">{user.name || "User"}</span>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  className="w-72 border-neutral-800 bg-neutral-950 p-0 text-white"
                >
                  {/* User Information */}
                  <PopoverHeader className="border-b border-neutral-800 p-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={48}
                          height={48}
                          className="size-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-12 items-center justify-center rounded-full bg-neutral-800">
                          <User size={24} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <PopoverTitle className="truncate text-sm font-semibold text-white">
                          {user.name || "User"}
                        </PopoverTitle>

                        <PopoverDescription className="mt-1 flex items-center gap-1 truncate text-xs text-neutral-400">
                          <Mail size={12} />
                          {user.email}
                        </PopoverDescription>
                      </div>
                    </div>
                  </PopoverHeader>

                  {/* Profile Actions */}
                  <div className="space-y-1 p-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
                    >
                      <Pencil size={16} />
                      Edit Profile
                    </Link>

                    <div className="my-1 border-t border-neutral-800" />

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="px-3 py-1.5 text-white/80 transition-colors hover:text-cyan-400"
              >
                Login
              </Link>

              {/* Sign Up */}
              <Link
                href="/sign-up"
                className="rounded-md bg-cyan-500 px-3 py-1.5 font-medium text-neutral-950 transition-colors hover:bg-cyan-400"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
