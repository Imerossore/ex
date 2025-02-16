"use server";

import { supabase } from "../../lib/supabase";

export const addUser = async (prevState: any, formdata: FormData) => {
  const name = formdata.get("name") as string;

  const { data, error } = await supabase.from("users").insert([{ name }]);

  if (error) {
    console.error("Supabase Error:", error);
    return { error: error.message };
  }

  return { message: "User added successfully!", data };
};

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return data;
}
