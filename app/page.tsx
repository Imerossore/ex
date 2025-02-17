import { getUsers } from "./actions/action";
import Form from "./components/Form";

export default async function Home() {
  const user = await getUsers();

  return (
    <div className="bg-slate-900 h-[100vh] flex justify-center items-center flex-col">
      <Form />
      {user.map((user: { id: number; name: string }) => (
        <div key={user.id} className="text-white flex flex-col justify-center">
          {user.name}
        </div>
      ))}
    </div>
  );
}
