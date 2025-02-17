"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  text: string;
  created_at: string;
}

export default function MessageContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
      if (error) console.error("Error fetching messages:", error);
    };

    fetchMessages();

    const subscription = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-96 w-full border border-black overflow-y-auto p-4 flex flex-col gap-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="self-start max-w-xs bg-white p-3 rounded-lg shadow-md "
        >
          <p className="text-sm text-gray-800 text-wrap">{msg.text}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
