import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import Form from "./form";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    filter?: string;
    modalState?: string;
  };
}) {
  const data = await GetData(searchParams.filter);
  return (
    <div className="p-4 r">
      <div className="flex items-center w-[100%] justify-between">
        {" "}
        <h2 className="text-xl font-bold mb-4">User Table</h2>
        <div className="flex gap-[10px]">
          <Link prefetch={true} href={"/?filter=under2"}>
            {" "}
            <button className="w-fit bg-[black] text-white px-[10px] py-[5px]">
              Under 2
            </button>
          </Link>
          <Link prefetch={true} href={"/?filter=over2"}>
            {" "}
            <button className="w-fit bg-[black] text-white px-[10px] py-[5px]">
              Over 2
            </button>
          </Link>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <Form />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left border-b">ID</th>
            <th className="py-2 px-4 text-left border-b">Name</th>
            <th className="py-2 px-4 text-left border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">
                <Dialog>
                  <DialogTrigger asChild>
                    <Link prefetch={true} href={"/?modalState=1"}>
                      {" "}
                      <button className="w-fit bg-[black] text-white px-[10px] py-[5px]">
                        Edit
                      </button>
                    </Link>
                  </DialogTrigger>
                  <DialogContent>
                    <Form defaultValues={user} />
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function GetData(filter?: string) {
  "use server";
  console.log(filter);
  return await db.select().from(usersTable);
}
