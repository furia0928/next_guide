import { fetchData } from '@/utils/api'
import useSWR from 'swr'

export async function getServerSideProps() {
  const userInitialData = await fetchData(`/users`)
  return {
    props: {
      userInitialData
    }
  }
}

export default function UsersPage({ userInitialData }) {
  const { data, error } = useSWR('/users', fetchData, {
    fallbackData: userInitialData
  })

  if (error) return <div>Error loading data.</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}
