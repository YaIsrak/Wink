import NavBrand from "@/components/layout/NavBrand";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 z-[10] w-full border-b border-muted bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo */}
        <NavBrand href="/" />

        {/* Action Menu */}
        <div className="flex items-center gap-4">
          {/* If User SignedIn */}
          <SignedIn>
            <div className="flex items-center gap-2">
              <RainbowButton className="h-8 rounded-xl px-4 py-4 text-sm">
                <Link href="/explore">Enter Wink</Link>
              </RainbowButton>
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton
                fallbackRedirectUrl={"/explore"}
                forceRedirectUrl={"/explore"}
                signUpFallbackRedirectUrl={"/explore"}
              >
                <Button size="sm" className="rounded-lg" variant={"outline"}>
                  Sign in
                </Button>
              </SignInButton>

              <SignUpButton
                fallbackRedirectUrl={"/explore"}
                forceRedirectUrl={"/explore"}
                signInFallbackRedirectUrl={"/explore"}
              >
                <Button size="sm" className="rounded-lg">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
