"use client"

import { MessageSquarePlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import {useState } from "react"
import { useToast } from "./ui/use-toast"
import { useSubscriptionStore } from "@/store/store"
import LoadingSpinner from "./LoadingSpinner"
function CreateChatButton({isLarge}:{isLarge?:boolean}) {
  const {data:session}=useSession();
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {toast}=useToast()
  const setSubscription = useSubscriptionStore((state) => state.setSubscription)

  const createNewChat = async () => {
    if (!session?.user.id) return;
    setLoading(true);
    toast({
      title:"Create new chat...",
      description:"Hold tight while we create your new chat...",
      duration:3000
    })
    // const chatId=uuidv4()dzd

    router.push(`/chat/${'abc'}`)
  }
if(isLarge)return(<div>
  <Button variant={"default"} onClick={createNewChat}>
    {loading?<LoadingSpinner/>:"create a New Chat"}
  </Button>
</div>)
  return (
    <Button variant={"ghost"}><MessageSquarePlusIcon /></Button>
  )
}

export default CreateChatButton