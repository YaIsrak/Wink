"use client";
import { navbarItems } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import SearchButton from "./SearchButton";
import UserDropdown from "./user-dropdown";

export default function Navbar() {
  return (
    <nav className="fixed w-full border-b bg-background/10 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Navbrand */}
        <Link href={"/"} className="font-mono text-3xl font-bold">
          Wink
        </Link>

        {/* Search */}
        <SearchButton />

        <div className="mx-auto"></div>

        {/* NavMenu */}
        <div className="flex items-center gap-4">
          <MagnifyingGlassIcon
            className="h-5 w-5"
            onClick={() => {
              //   TODO: Search
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
