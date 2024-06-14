"use client";

import { useModal } from "@/hooks/use-modal-store";
import { z } from "zod";
import { PostCardProps } from "../post/Posts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const formSchema = z.object({
  comment: z
    .string()
    .min(1, { message: "comment is required" })
    .max(255, { message: "comment is too long" }),
});

export default function CommentForm({ post }: { post: PostCardProps }) {
  const { onOpen } = useModal();
  // const form = useForm<z.infer<typeof formSchema>>({
  //   defaultValues: {
  //     comment: "",
  //   },
  //   resolver: zodResolver(formSchema),
  // });
  // const isLoading = form.formState.isSubmitting;

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   // try {
  //   //   toast.success("Nothing to comment");
  //   // } catch (error: any) {
  //   //   toast.error(error.message);
  //   // }
  // };

  return (
    <div className="border-b">
      <div
        className="flex w-1/2 items-center gap-4 p-6"
        onClick={() => onOpen("createComment", { post })}
      >
        <Avatar>
          <AvatarFallback>W</AvatarFallback>
          <AvatarImage src={post.author.imageUrl} />
        </Avatar>

        <div>
          <p className="text-sm text-muted-foreground">Write something...</p>
        </div>
      </div>
    </div>
  );
}
