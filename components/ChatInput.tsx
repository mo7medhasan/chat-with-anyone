"use client"

import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User, messageRef } from "@/lib/converters/Message"
import { addDoc, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    input: z.string().max(1000)
})

function ChatInput({ chatId }: { chatId: string }) {
    const { data: session } = useSession()
    const router=useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: '',
        }
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.input.length === 0) {
            return;
        }
        if (!session?.user) {
            return;
        }

        const userToStore:User={
            id:session.user.id!,
            name:session.user.name!,
            email:session.user.email!,
            image:session.user.image ||""
        }
        addDoc(
            messageRef(chatId),{
                input:values.input,
                timestamp:serverTimestamp(),
                user:userToStore
            }
        );

        form.reset()
    }


    return (
        <div className="sticky bottom-0">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="  flex space-y-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800">
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        className="border-none bg-transparent dark:placeholder:text-white/70"
                                        placeholder="Enter Message in Any Language" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-violet-600 text-white ">Submit</Button>
                </form>
            </Form></div>
    )


}

export default ChatInput