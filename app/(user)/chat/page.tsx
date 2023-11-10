import ChatList from "@/components/ChatList";

type Props={
    params:{};
    searchParams:{
        error:string;
    }
}

function ChatsPage({searchParams:{error}}:Props) {
  return (
    <div>
<h1>
  chats
</h1>

        <ChatList/> 
    </div>
  )
}

export default ChatsPage