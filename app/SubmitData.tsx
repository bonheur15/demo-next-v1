"use server"
import { revalidatePath } from "next/cache";

export async function SubmitData(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(formData.get("name"));
  console.log(formData.get("id"));
  revalidatePath("/");
}
