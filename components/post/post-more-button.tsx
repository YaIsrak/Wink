"use client";

import { Edit, MoreHorizontal, Tag, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function PostMoreButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl p-2 shadow-none"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-xl px-4">
            Edit
            <Edit className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl px-4">
            Save
            <Tag className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-xl px-4 text-destructive">
            Delete
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
