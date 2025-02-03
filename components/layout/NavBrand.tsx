import logo from "@/public/logo-dark.png";
import Image from "next/image";
import Link from "next/link";

// todo: import fix
export default function NavBrand({ href }: { href?: string }) {
  return (
    <Link
      href={href || "/explore"}
      className="flex items-center gap-2 text-3xl font-bold"
    >
      <div className="relative size-8">
        <Image src={logo} placeholder="blur" alt="logo" fill />
      </div>
      <span className="hidden font-mono md:block">Wink</span>
    </Link>
  );
}
