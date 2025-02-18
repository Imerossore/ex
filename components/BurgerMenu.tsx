"use client";

import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutModal from "./LogoutModal";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="p-2 rounded-md transition-all duration-500">
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-180" />
          ) : (
            <MenuIcon className="w-6 h-6 transition-transform duration-300" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>

          <LogoutModal />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
