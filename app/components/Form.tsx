"use client";

import { useActionState } from "react";
import { addUser } from "../actions/action";

export default function AddUserForm() {
  const [state, action, isPending] = useActionState(addUser, null);

  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="text" name="name" placeholder="Enter name" required />
      <button type="submit" disabled={isPending} className="bg-green-500">
        Submit
      </button>
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state?.message && <p style={{ color: "green" }}>{state.message}</p>}
    </form>
  );
}
