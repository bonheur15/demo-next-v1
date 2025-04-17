"use client";
import { DialogClose } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { AddUser } from "./actions";
import { InferSelectModel } from "drizzle-orm";
import { usersTable } from "@/db/schema";

export default function Form({
  defaultValues,
}: {
  defaultValues?: InferSelectModel<typeof usersTable>;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [data,setData] = useState({
    id: defaultValues?.id,
    name: defaultValues?.name,
  });
  return (
    <form className="flex flex-col gap-4 max-w-md mx-auto mt-8 p-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="number"
          id="name"
          name="name"
          defaultValue={data?.name??0}
          value={data?.name ?? 0}
          onChange={(e) => {
            setData({
              ...data,
              name:Number( e.target.value),
            });
          }}
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
      <DialogClose className="hidden" ref={closeRef}>
        Close
      </DialogClose>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={async () => {
          const response = await AddUser(data.name ?? 0);
         
          if(response.success)
          closeRef.current?.click();
        else  alert(response.message);
        }}
      >
        Submit
      </button>
    </form>
  );
}
