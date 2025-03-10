"use client";

import { navbarItems } from "@/lib/constant";
import { useNotificationStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconType } from "react-icons";
import { Button } from "../ui/button";
import NavBrand from "./NavBrand";
import SearchButton from "./SearchButton";
import UserDropdown from "./user-dropdown";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { unReadCount } = useNotificationStore();

  return (
    <nav className="sticky top-0 z-[10] w-full border-b border-muted bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Navbrand */}
        <NavBrand href="/explore" />

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
              badge={(item.href === "/notification" && unReadCount()) || 0}
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
  badge,
}: {
  name: string;
  href: string;
  icon: IconType;
  fillIcon: IconType;
  badge: number;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "py-auto relative mx-auto flex items-center gap-2 text-muted-foreground",
        pathname === href && "font-semibold text-primary",
      )}
    >
      {pathname === href ? (
        <FillIcon className="h-5 w-5" />
      ) : (
        <Icon className="h-5 w-5" />
      )}

      <span className="hidden md:block">{name}</span>
      {badge > 0 && (
        <span className="absolute -right-1 -top-1 flex size-4 translate-x-2 items-center justify-center rounded-full bg-primary text-xs text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}
