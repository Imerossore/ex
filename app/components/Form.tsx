// app/page.tsx
"use client";

import { useActionState } from "react";
import { addName } from "./../actions/action";

export default function Form() {
  const [state, action, isPending] = useActionState(addName, { message: "" });

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Enter Your Name</h1>
      <form action={action} className="flex justify-center flex-col">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        />
        <button type="submit" disabled={isPending} className="bg-green-600">
          Submit
        </button>
      </form>
      {state?.message && (
        <p style={{ marginTop: "1rem", fontSize: "1.2rem", color: "yellow" }}>
          {state.message}
        </p>
      )}
    </div>
  );
}
