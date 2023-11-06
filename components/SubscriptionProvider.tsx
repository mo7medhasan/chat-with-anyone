"use client"

import { subscriptionRef } from "@/lib/converters/Subscription"
import { onSnapshot, snapshotEqual } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

function SubscriptionProvider() {
const {data:session}=useSession()
useEffect(() => {
 if(!session) return;
return onSnapshot(subscriptionRef(session.user.id),(snapshot)=>{
    if(snapshot.empty){
        console.log('User has No subscription');
        return; }
        else{
            console.log('User has  subscription');
        }
})
}, [session])


  return (
    <div>SubscriptionProvider</div>
  )
}

export default SubscriptionProvider