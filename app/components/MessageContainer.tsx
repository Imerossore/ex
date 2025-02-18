"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  user_Id: string;
  created_at: string;
}

interface UserProps {
  user?: { username: string; id: string } | null;
}

export default function MessageContainer({ user }: UserProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (data) {
        setMessages(data);
        const userIds = data.map((msg) => msg.user_Id);
        fetchUsernames(userIds);
      }
      if (error) console.error("Error fetching messages:", error);
    };

    fetchMessages();

    const subscription = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);

          await fetchUsernames([newMessage.user_Id]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchUsernames = async (userIds: string[]) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, username")
      .in("id", userIds);

    if (data) {
      const newUsernames = data.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {} as { [key: string]: string });

      setUsernames((prev) => ({ ...prev, ...newUsernames }));
    }
    if (error) console.error("Error fetching usernames:", error);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-96 w-full border border-gray-300 rounded-lg shadow-md overflow-y-auto p-4 flex flex-col gap-2 bg-gray-100">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
            msg.user_Id === user?.id
              ? "bg-blue-500 text-white self-end"
              : "bg-white text-gray-800 self-start"
          }`}
        >
          <p className="text-xs font-bold text-slate-50 ">
            {msg.user_Id === user?.id
              ? "You"
              : usernames[msg.user_Id] || "Unknown"}
          </p>
          <p className="break-words ">{msg.text}</p>
        </motion.div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
