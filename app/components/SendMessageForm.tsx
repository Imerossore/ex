"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { sendMessage } from "../actions/message";
import { useState, useRef } from "react";

interface UserProps {
  user?: { username: string; id: string } | null;
}

export default function SendMessageForm({ user }: UserProps) {
  const [, action, pending] = useActionState(sendMessage, null);
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <form action={action} className="flex items-end gap-1 w-full">
      <input type="hidden" name="user_Id" value={user?.id} />
      <textarea
        ref={textareaRef}
        rows={1}
        name="text"
        placeholder="Enter message"
        required
        value={text}
        onChange={handleChange}
        className="px-3 py-2 rounded-md bg-slate-100 flex-1 resize-none min-h-[40px] max-h-[150px] overflow-hidden"
        style={{ lineHeight: "1.5em" }}
      />
      <button
        type="submit"
        className="text-white bg-blue-600 px-4 py-2 rounded-md flex items-center justify-center min-h-[40px]"
        disabled={pending}
      >
        <Send />
      </button>
    </form>
  );
}
