"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function AddUser(name: number) {
  try {
    await db.insert(usersTable).values({
      name: name,

    });
    revalidatePath("/users/[userId]/review", "page");
    return {
      success: true,
      message: "cool",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "not cool",
    };
  }
}
