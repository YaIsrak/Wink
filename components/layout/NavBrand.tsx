import logoDark from "@/public/logo-dark.png";
import logoLight from "@/public/logo-light.png";
import Image from "next/image";
import Link from "next/link";

// todo: import fix
export default function NavBrand({
  href,
  theme = "light",
}: {
  href?: string;
  theme?: "light" | "dark";
}) {
  return (
    <Link
      href={href || "/explore"}
      className="flex items-center gap-2 text-3xl font-bold"
    >
      <div className="relative size-8">
        {theme === "light" ? (
          <Image src={logoDark} alt="logo" />
        ) : (
          <Image src={logoLight} alt="logo" />
        )}
      </div>
      <span className="hidden font-mono md:block">Wink</span>
    </Link>
  );
}
