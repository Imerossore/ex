import { getNames } from "./actions/action";
import Form from "./components/Form";

export default async function Home() {
  const users = await getNames();
  return (
    <div className="bg-slate-900 h-[100vh] flex justify-center items-center flex-col">
      <Form />
      {users.map((user: { id: number; name: string }) => (
        <p key={user.id} className="text-white">
          {user.name}
        </p>
      ))}
    </div>
  );
}
