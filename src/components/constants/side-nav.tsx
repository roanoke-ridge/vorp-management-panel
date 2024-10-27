import { BookOpenCheck, LayoutDashboard } from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    title: "Characters",
    icon: BookOpenCheck,
    href: "/characters",
    color: "text-green-500",
  },
  {
    title: "Items",
    icon: BookOpenCheck,
    href: "/items",
    color: "text-green-500",
  }
];
