"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(1000, { message: "Content is too long" }),
});

export default function EditPostModal() {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "editPost";

  const { post } = data;

  const form = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (post) {
      form.setValue("content", post.content);
    }
  }, [post, form]);

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${post?.id}`, values);

      toast.success("Saved");
      router.refresh();
      onClose();
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col items-center border-none bg-transparent shadow-none">
        <h1 className="text-white">New Post</h1>

        <div className="w-full rounded-xl bg-background p-6">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>

            <div className="w-full">
              <h3 className="text-bold mb-2 text-sm">{user?.fullName}</h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            placeholder="What's on your mind?"
                            className="h-96 border-none p-0 shadow-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="shadow-none"
                    variant={"outline"}
                  >
                    {isLoading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
