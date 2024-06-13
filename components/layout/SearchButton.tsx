"use client";

import { Profile } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

export default function SearchButton({
  open,
  setOpen,
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
}) {
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    };

    fetchUserData();
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>
            <p>No results found.</p>
          </CommandEmpty>

          <CommandGroup heading="Users">
            {users.map((user) => (
              <CommandItem key={user.id} asChild>
                <Link
                  href={`/user/${user.userId}`}
                  className="flex cursor-pointer items-center gap-2 hover:underline"
                >
                  <Avatar>
                    <AvatarImage src={user.imageUrl} />
                  </Avatar>
                  <div>
                    <p>{user.username}</p>
                  </div>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
