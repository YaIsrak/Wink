"use client";

import useCurrentUser from "@/hooks/use-current-user";
import { useModal } from "@/hooks/use-modal-store";
import { Post } from "@prisma/client";
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

export default function PostMoreButton({ post }: { post: Post }) {
  const { onOpen } = useModal();
  const { user } = useCurrentUser();

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
          {user?.id === post.authorId && (
            <DropdownMenuItem
              className="rounded-xl px-4"
              onClick={() => onOpen("editPost", { post })}
            >
              Edit
              <Edit className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="rounded-xl px-4">
            Save
            <Tag className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {user?.id === post.authorId && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="rounded-xl px-4 text-rose-500"
                onClick={() => onOpen("deletePost", { post })}
              >
                Delete
                <Trash className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
