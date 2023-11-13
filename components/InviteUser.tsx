"usee client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  
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


const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
  });

function InviteUser({ chatId }: { chatId: string }) {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription);
    const adminId=useAdminId({chatId})

    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false)



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
        },
      });
  return (
    <>
    
    </>
  )
}

export default InviteUser