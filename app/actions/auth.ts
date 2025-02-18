"use server";

import { createSession, decrypt, deleteSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(prevState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const cpassword = formData.get("cpassword") as string;

  if (password !== cpassword) return { error: "Passwords do not match" };

  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error checking username:", fetchError);
    return { error: "An error occurred. Please try again later." };
  }

  if (existingUser) {
    return { error: "Username is already taken" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error: insertError } = await supabase
    .from("users")
    .insert([{ username, password: hashedPassword }]);

  if (insertError) {
    console.error("Error signing up:", insertError);
    return { error: insertError.message };
  }

  return { success: "User created successfully" };
}

export async function login(prevState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const { data: user, error } = await supabase
    .from("users")
    .select("id, password")
    .eq("username", username)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return { error: "Invalid username or password" };
  }

  if (!user) {
    return { error: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid username or password" };
  }

  await createSession(user.id);
  redirect("/home");
}

export async function getUser() {
  const sessionToken = (await cookies()).get("session")?.value;
  if (!sessionToken) return null;

  const session = await decrypt(sessionToken);
  if (!session?.userId) return null;

  const { data: user, error } = await supabase
    .from("users")
    .select("id, username")
    .eq("id", session.userId)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return user;
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
