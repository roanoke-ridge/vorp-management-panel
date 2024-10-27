
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import Link from "next/link";
import { Github } from "lucide-react";
import Image from 'next/image';
import { UserNav } from "@/components/layout/user-nav";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={"/"}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <Image src="/vmp.png" alt="vorp-management-panel logo" width={24} height={24} />
          <h1 className="text-lg font-semibold">VORP Management Panel by Roanoke Ridge</h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md border"
            asChild
          >
            <Link href="https://github.com/roanoke-ridge/vorp-management-panel" target="_blank">
              <Github />
              <span className="sr-only">Github</span>
            </Link>
          </Button>
          <ThemeToggle />

          {sessionData?.user ? (
            <UserNav user={sessionData.user} />
          ) : (
            <Button size="sm"
              onClick={() => {
                void signIn("discord");
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}