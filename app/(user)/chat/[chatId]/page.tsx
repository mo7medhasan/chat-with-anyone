import { authOptions } from '@/auth';
import ChatInput from '@/components/ChatInput';
import { getServerSession } from 'next-auth';
import React from 'react'

async function ChatPage() {
  const session = await getServerSession(authOptions);
  return (
    <>

      {/* <ChatInput/> */}
    </>
  )
}

export default ChatPage