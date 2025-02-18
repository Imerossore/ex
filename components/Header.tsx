"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutModal from "./LogoutModal";
import UserAvatar from "./UserAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HeaderProps {
  user?: { username: string; id: string } | null;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 bg-slate-900 text-slate-50 px-7 py-3 flex gap-2 justify-end items-center">
      {user ? (
        <div className="flex gap-6 items-center">
          <div className="flex gap-2 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/profile">
                    <UserAvatar />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p>{user.username}</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <LogoutModal />
              </TooltipTrigger>
              <TooltipContent>Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
