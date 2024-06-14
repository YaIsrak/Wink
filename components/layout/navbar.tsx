"use client";
import { navbarItems } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconType } from "react-icons";
import { Button } from "../ui/button";
import SearchButton from "./SearchButton";
import UserDropdown from "./user-dropdown";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-[10] w-full border-b border-muted bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Navbrand */}
        <Link href={"/"} className="flex items-center gap-2 text-3xl font-bold">
          <div className="relative size-8">
            <Image
              src={"/logo-light.png"}
              className="hidden dark:block"
              alt="logo"
              fill
            />
            <Image
              src={"/logo-dark.png"}
              className="block dark:hidden"
              alt="logo"
              fill
            />
          </div>
          <span className="hidden font-mono md:block">Wink</span>
        </Link>

        {/* Search */}
        <Button
          variant={"outline"}
          className="hidden w-12 gap-2 rounded-2xl text-muted-foreground shadow-none md:flex md:w-96"
          onClick={() => setOpen(true)}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          <span className="hidden md:block">Search</span>
        </Button>
        <SearchButton open={open} setOpen={setOpen} />

        <div className="mx-auto"></div>

        {/* NavMenu */}
        <div className="flex items-center gap-4">
          <MagnifyingGlassIcon
            className="block h-5 w-5 md:hidden"
            onClick={() => {
              setOpen(true);
            }}
          />
          {navbarItems.map((item) => (
            <NavMenuItem
              key={item.label}
              name={item.label}
              href={item.href}
              icon={item.icon}
              fillIcon={item.fillIcon}
            />
          ))}
        </div>

        {/* User */}
        <UserDropdown />
      </div>
    </nav>
  );
}

function NavMenuItem({
  name,
  href,
  icon: Icon,
  fillIcon: FillIcon,
}: {
  name: string;
  href: string;
  icon: IconType;
  fillIcon: IconType;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "py-auto mx-auto flex items-center gap-2 text-muted-foreground",
        pathname === href && "font-semibold text-primary",
      )}
    >
      {pathname === href ? (
        <FillIcon className="h-5 w-5" />
      ) : (
        <Icon className="h-5 w-5" />
      )}

      <span className="hidden md:block">{name}</span>
    </Link>
  );
}
