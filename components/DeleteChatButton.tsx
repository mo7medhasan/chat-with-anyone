"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import useAdminId from "@/hooks/useAdminId";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
function DeleteChatButton({ chatId }: { chatId: string }) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const { toast } = useToast()
    const router = useRouter();
    const adminId = useAdminId({ chatId });

    const handleDelete = async () => {
        toast({
            title: "Deleting chat",
            description: "Please wait while we delete the chat...",
        })
        console.log("Delete :: ", chatId);

        await fetch("/api/chat/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ chatId: chatId })
        }).then((res) => {
            toast({
                title: "Success",
                description: "Your chat has been deleted!",
                className: "bg-green-600 text-white",
                duration: 3000,
            })
            router.replace('/chat')
        }).finally(()=>setOpen(false))

    }


    return adminId === session?.user.id && (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>
                    Delete chat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Are you sure?
                    </DialogTitle>
                    <DialogDescription>
                        this will delete the chat for all users.
                    </DialogDescription>
                </DialogHeader>


                <div className="grid grid-cols-2 space-x-2 " >

                    <Button variant={"destructive"}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                    <Button variant={"outline"}
                        onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>



    )
}

export default DeleteChatButton