import { createFileRoute } from '@tanstack/react-router';
import { client } from '../lib/api';

export const Route = createFileRoute('/users')({
  component: RouteComponent,
  loader: async () => {
    const res = await client.api.users.$get();
    return {
      data: await res.json()
    }
  },
});

function RouteComponent() {
  const { data: users } = Route.useLoaderData();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
