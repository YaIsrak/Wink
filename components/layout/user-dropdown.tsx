"use client";
import { useCurrentUserStore } from "@/lib/store";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserDropdown() {
  const { user } = useCurrentUserStore();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ring-ring ring-offset-2 transition hover:ring-2">
          <AvatarFallback className="font-mono">W</AvatarFallback>
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="shadow-none">
        <DropdownMenuGroup>
          {/* Profile Button */}
          <DropdownMenuItem
            onClick={() =>
              router.push(`/user/${user?.id}`, {
                scroll: false,
              })
            }
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {/* Settings Button */}
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Logout Button */}
          <SignOutButton>
            <DropdownMenuItem className="text-rose-500 hover:bg-rose-500 hover:text-white">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
