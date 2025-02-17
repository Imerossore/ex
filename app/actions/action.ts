"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/supabase";

export async function addUser(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;

  const { error } = await supabase.from("users").insert([{ name }]);

  if (error) {
    return { error: "Failed to add user" };
  }
  revalidatePath("/");

  return { success: "User added successfully" };
}

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return data;
}
