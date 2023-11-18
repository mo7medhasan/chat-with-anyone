"use client"
import React, { Dispatch, SetStateAction } from "react";
import { Copy } from "lucide-react";
import {
    Dialog,DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";


  import { Input } from "@/components/ui/input";

  import { useToast } from "./ui/use-toast";
  import { ToastAction } from "@radix-ui/react-toast";


function ShareLink({
  isOpen,
  chatId,
  setIsOpen,
}: {
  isOpen: boolean;
  chatId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return <div>ShareLink</div>;
}

export default ShareLink;
