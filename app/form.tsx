"use client";
import { DialogClose } from "@/components/ui/dialog";
import { SubmitData } from "./SubmitData";
import { useRef, useState } from "react";

export default function Form({
  defaultValues,
}: {
  defaultValues?: {
    id?: number;
    name?: string;
  };
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [data] = useState({
    id:defaultValues?.id,
    name:defaultValues?.name
  });
  return (
    <form
      className="flex flex-col gap-4 max-w-md mx-auto mt-8 p-4"
      action={SubmitData}
    >
      <div>
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={data?.name}

          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="id" className="block mb-2">
          ID:
        </label>
        <input
          type="text"
          id="id"
          defaultValue={data?.id}
          name="id"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        onClick={() => {
          // close
        }}
      >
        Try
      </button>
      <DialogClose ref={closeRef}>Close</DialogClose>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => {
          closeRef.current?.click(); 
        }}
      >
        Submit
      </button>
    </form>
  );
}
