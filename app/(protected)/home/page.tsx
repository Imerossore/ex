import { getUser } from "@/app/actions/auth";
import MessageContainer from "@/components/MessageContainer";
import SendMessageForm from "@/components/SendMessageForm";

export default async function HomePage() {
  const user = await getUser();

  return (
    <div className="flex justify-center items-center h-full">
      <div className=" flex flex-col items-center gap-3">
        <h1 className="text-3xl font-bold text-slate-900">Global Chat</h1>
        <div className="border-2 border-slate-900 rounded-md p-3 flex flex-col gap-2 w-[90vw] sm:w-[90vw] md:w-[50vw] lg:w-[30vw]">
          <MessageContainer user={user} />
          <SendMessageForm user={user} />
        </div>
      </div>
    </div>
  );
}
