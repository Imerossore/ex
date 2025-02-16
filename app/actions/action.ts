"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addName = async (
  prevState: { message?: string },
  formData: FormData
): Promise<{ message?: string }> => {
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return { message: "Please enter a valid name." };
  }

  try {
    await pool.query('INSERT INTO "User"(name) VALUES ($1)', [name]);

    revalidatePath("/");

    return { message: `Hello, ${name}!` };
  } catch (error) {
    console.error("Database error:", error);
    return { message: "Failed to add name." };
  }
};

export const getNames = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const result = await pool.query('SELECT * FROM "User"');
    return result.rows;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
};
