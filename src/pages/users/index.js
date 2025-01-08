import { fetchWrapper } from "@/utils/api";

export default async function UsersPage() {
  const users = await fetchWrapper("/users");

  return (
    <div>
      <h1>사용자 목록</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
