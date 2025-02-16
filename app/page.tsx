import { getUsers } from "./actions/action";
import Form from "./components/Form";

export default async function Home() {
  const user = await getUsers();

  return (
    <div className="bg-slate-900 h-[100vh] flex justify-center items-center flex-col">
      <Form />
      {user.map((user: any) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
