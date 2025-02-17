import MessageContainer from "./components/MessageContainer";
import SendMessageForm from "./components/SendMessageForm";

export default function Page() {
  return (
    <div className="h-[100vh] flex flex-col items-center pt-28">
      <h1 className="text-3xl font-semibold">Global chat</h1>
      <div className="w-80 border border-slate-400 rounded-md p-3 flex flex-col gap-2">
        <MessageContainer />
        <SendMessageForm />
      </div>
    </div>
  );
}
