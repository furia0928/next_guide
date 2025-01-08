import { fetchData } from '@/utils/api'
import useSWR from 'swr'
import CustomLayout from '@/components/layout/CustomLayout'

export async function getServerSideProps() {
  const initialData = await fetchData(`/users`)
  return {
    props: {
      initialData
    }
  }
}

export default function UsersPage({ initialData }) {
  const { data, error } = useSWR('/users', {
    fallbackData: initialData
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

UsersPage.getLayout = function getLayout(page) {
  return <CustomLayout>{page}</CustomLayout>
}
