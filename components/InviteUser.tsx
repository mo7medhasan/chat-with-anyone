"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";

import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import useAdminId from "@/hooks/useAdminId";
import { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { getUserByEmailRef } from "@/lib/converters/User";
import ShareLink from "./ShareLink";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function InviteUser({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const adminId = useAdminId({ chatId });

  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user.id) return;
    toast({
      title: "Sending invite",
      description: "Please wait while we send the invite..."
    })

    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.role === "pro" && subscription.status === "active";
    if (!isPro && noOfUsersInChat >= 5) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You have exceeded the limit of users in a single chat for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}>
            Upgrade to  PRO
          </ToastAction>
        )
      });
      return;
    }
    const querySnapshot = await getDocs(getUserByEmailRef(values.email))

    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter an email address of a registered user OR resend the invitation once they have signed up!",
        variant: "destructive",

      });
      return;
    } else {
      const user = querySnapshot.docs[0].data();
      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
      }).then(() => {
        setOpen(false)
        toast({
          title: "Added to chat",
          description: "The user has been added to the chat successfully!",
          className: "bg-green-600 text-white",
          duration: 3000,
        })
        setOpenInviteLink(true)
      }).catch(() => {
        toast({
          title: "Error",
          description: "Whoops... there was an error adding the user to the chat!",
          variant: "destructive"

        })
        setOpen(false);
      })
    }
    form.reset();
  }



  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User To Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email address to invite them to this
                Chat! <span className="">(Note: they must be registered)</span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="john@doe.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
}

export default InviteUser;
