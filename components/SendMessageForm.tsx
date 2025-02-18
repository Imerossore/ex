"use client";

import { Loader2, Send } from "lucide-react";
import { sendMessage } from "../app/actions/message";
import { useState, useRef } from "react";

interface UserProps {
  user?: { username: string; id: string } | null;
}

export default function SendMessageForm({ user }: UserProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await sendMessage(null, new FormData(e.currentTarget));
    setText("");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-1 w-full">
      <input type="hidden" name="user_Id" value={user?.id} />
      <textarea
        ref={textareaRef}
        rows={1}
        name="text"
        placeholder="Enter message"
        required
        value={text}
        onChange={handleChange}
        className="px-3 py-2 rounded-md bg-slate-100 flex-1 resize-none min-h-[40px] max-h-[150px] overflow-hidden leading-relaxed  outline-0 focus:ring-2 focus:ring-blue-500 duration-100"
      />
      <button
        type="submit"
        className={`text-white bg-blue-600 px-4 py-2 rounded-md flex items-center justify-center min-h-[40px] w-[50px]${
          isLoading ? " opacity-50" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send />}
      </button>
    </form>
  );
}
