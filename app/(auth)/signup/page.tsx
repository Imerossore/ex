"use client";

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signup, null);

  return (
    <div>
      {state?.success && <p style={{ color: "green" }}>{state.success}</p>}
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      <form action={action} className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
