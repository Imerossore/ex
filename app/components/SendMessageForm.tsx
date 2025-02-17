"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { sendMessage } from "../actions/message";

export default function SendMessageForm() {
  const [, action, pending] = useActionState(sendMessage, null);

  return (
    <form action={action} className="flex gap-2 px-2">
      <textarea
        rows={1}
        name="text"
        placeholder="Enter message"
        required
        className="px-3 py-2 rounded-md bg-slate-100 flex-1"
      />
      <button
        type="submit"
        className="text-white bg-blue-600 px-3 py-2 rounded-md self-start"
        disabled={pending}
      >
        <Send />
      </button>
    </form>
  );
}
