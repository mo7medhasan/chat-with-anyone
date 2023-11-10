"use client"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Skeleton } from "./ui/skeleton"
import { Message, limitedSortedMessagesRef } from "@/lib/converters/Message"
function ChatListRow({ chatId }: { chatId: string }) {
  const [members, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId))


  return (
    <div>ChatListRow</div>
  )
}

export default ChatListRow