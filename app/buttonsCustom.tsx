"use client"
import { DialogClose } from '@/components/ui/dialog';
import React, { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom';

export default function ButtonsCustom() {
    const closeRef = useRef<HTMLButtonElement>(null);
    const {pending} = useFormStatus();
    const [mounted,setMounted] =useState(false);

      useEffect(()=>{
        if(!pending && mounted){
            closeRef.current?.click();
        }
      },[mounted, pending])
  return (
   <>
     <DialogClose className="hidden" ref={closeRef}>
        Close
      </DialogClose>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={()=>{
            setMounted(true)
        }}
      >
       {pending ? 'Loading...' : 'Submit'}
      </button></>
  )
}


// closeRef.current?.click();