import { Message } from "@/lib/converters/Message"
import { Session } from "next-auth";


function ChatMessages({chatId,
    session,
    initialMessages
    }:{chatId:string;
        session:Message[] ;
        initialMessages:Session|null;
        }) {
  return (
    <div>ChatMessages</div>
  )
}

export default ChatMessages