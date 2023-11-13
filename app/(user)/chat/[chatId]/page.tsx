import { authOptions } from '@/auth';
import ChatInput from '@/components/ChatInput';
import ChatMembersBadges from '@/components/ChatMembersBadges';
import ChatMessages from '@/components/ChatMessages';
import { limitedMessageRef } from '@/lib/converters/Message';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

type Props = {
  params: {
    chatId: string;
  }
}

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(limitedMessageRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
    <ChatMembersBadges chatId={chatId} />
      <div className='flex-1'>
        <ChatMessages chatId={chatId} session={session} initialMessages={initialMessages} />
      </div>
      <ChatInput chatId={chatId} />
    </>
  )
}

export default ChatPage