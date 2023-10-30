import { CheckIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import CheckoutButton from './CheckoutButton';
const tiers = [
  {
    name: "Starter",
    id: "starter_ID",
    href: "",
    priceMonthly: null,
    description: "Get chatting right away with anyone, anywhere!",
    features: [
      "20 Message Chat Limit in Chats",
      "3 Chat Rooms Limit",
      "Z Participant limit in Chat",
      "Supports 2 languages",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "si_OnlcsLNQYBMVZV",
    href: "",
    priceMonthly: "5.99",
    description: "Unlock the Full Potential with Pro!",
    features: [
      "Unlimited Chat Rooms",
      "Unlimited Messages in Chats",
      "Unlimited Participants in Chats",
      "Multimedia support in chats (coming soon)",
      "1-hour, dedicated support response time",
      "Early access to New Features",
      "Supports up to 10 languages",
    ],
  },
];
function PricingCards({ redirect }: { redirect: boolean }) {
  return (
    <div>
      <div className='mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 '>
        {tiers.map(tier => (<div key={tier.id}
          className='flex flex—col justify—between rounded—3xl
      ring—1 p-8 ring—gray-900/10 sm:p-10"
      bg—white shadow—xl'>
          <div>
            <h3
              id={tier.id + tier.name}
              className={`text-base font-semibold leading-7 text-indigo-600 ${tier.name}`}
            >
              {tier.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-x-2">
              {tier.priceMonthly ? (<>
                <span className="text-5xl font-bold tracking-tight text-gray-988">
                  {tier.priceMonthly}
                </span>
                <span className="text-base font-semibold leading-7 text-gray-500">
                  /month
                </span></>
              ) : (
                <span className="text-5xl font-bold tracking-tight Otext-gray-900">
                  Free
                </span>
              )}
            </div>
            <p className="nt-6 text-base leading-7 text-gray-690">
              {tier.description}
            </p>
            <ul
              role="List"
              className="mt-10 space-y-4 text-sm leading-6 @text-gray-680"
            >
              {tier.features.map(feature => (
                <li key={feature} className="Lex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {redirect ?(
            <Link href={'/register'} className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 
            text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
              Get Stated Today
            </Link>
          ):(tier.id&&<CheckoutButton/>)}
        </div>))}
      </div>
    </div>
  )
}

export default PricingCards