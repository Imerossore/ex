"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUser, logout } from "../actions/auth";

interface HeaderProps {
  user?: { username: string; id: string } | null;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <header className="sticky top-0 bg-slate-900 text-slate-50 px-7 py-3 flex gap-2 justify-end items-center">
      {user ? (
        <>
          <p>{user.username}</p>
          <span className="cursor-pointer" onClick={handleLogout}>
            <LogOut />
          </span>
        </>
      ) : (
        <div className="flex gap-2">
          <Link
            href="/login"
            className={pathname === "/login" ? " font-bold" : ""}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={pathname === "/signup" ? " font-bold" : ""}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
