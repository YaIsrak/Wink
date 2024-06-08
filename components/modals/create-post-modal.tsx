"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function CreatePostModal() {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createPost";

  const form = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/posts", values);
      toast.success("Posted");
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
              <h3>{user?.fullName}</h3>

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
                            className="border-none p-0 shadow-none focus-visible:ring-0"
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
                    {isLoading ? "Posting..." : "Post"}
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
