"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";

export default function SearchButton({
  open = false,
  setOpen,
}: {
  open?: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen?: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (query) {
      router.push(`/search?q=${query}`);
    }

    if (setOpen) {
      setOpen(false);
    }
    setQuery("");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col items-center border-none bg-transparent shadow-none">
          <h1 className="text-white">Search</h1>

          <form
            onSubmit={onSearch}
            className="flex w-full flex-row gap-2 rounded-xl bg-background p-6"
          >
            <Input
              placeholder="Search"
              className="rounded-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button size="icon" className="shrink-0 rounded-lg">
              <MagnifyingGlassIcon />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
