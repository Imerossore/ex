"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function sendMessage(prevState: unknown, formData: FormData) {
  const text = formData.get("text") as string;
  const user_Id = formData.get("user_Id") as string;

  if (!text) return { error: "Message cannot be empty" };

  const { error } = await supabase.from("messages").insert([{ text, user_Id }]);

  if (error) {
    console.error("Error sending message:", error);
    return { error: error.message };
  }
  console.log("Message sent successfully");

  revalidatePath("/home");
  return { success: true };
}
