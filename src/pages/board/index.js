import useSWR from 'swr'
import { useState } from 'react'
import { fetchData } from '@/utils/api'
import * as styles from './index.styles'

export async function getServerSideProps() {
  const initialData = await fetchData(`/posts`)
  return {
    props: {
      initialData
    }
  }
}
export default function Board({ initialData }) {
  const {
    data: posts,
    error,
    mutate
  } = useSWR('/posts', {
    fallbackData: initialData
  })

  const [newPost, setNewPost] = useState('')
  const [editPost, setEditPost] = useState(null)

  if (error) return <div>Failed to load posts</div>
  if (!posts) return <div>Loading...</div>

  const handleCreatePost = async () => {
    const response = await fetchData('/posts', {
      method: 'POST',
      body: JSON.stringify({ title: newPost, body: newPost, userId: 1 })
    })
    mutate([...posts, response], false) // Optimistic update
    setNewPost('')
  }

  const handleUpdatePost = async (id) => {
    const response = await fetchData(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: editPost })
    })
    const updatedPost = await response.json()
    mutate(
      posts.map((post) => (post.id === id ? updatedPost : post)),
      false
    )
    setEditPost(null)
  }

  const handleDeletePost = async (id) => {
    await fetchData(`/posts/${id}`, {
      method: 'DELETE'
    })
    mutate(
      posts.filter((post) => post.id !== id),
      false
    )
  }

  return (
    <div css={styles.container}>
      <h1 className="title">Board</h1>

      <div>
        <input
          type="text"
          placeholder="New Post"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handleCreatePost}>Create</button>
      </div>

      {/* Post List */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {editPost === post.id ? (
              <>
                <input
                  type="text"
                  defaultValue={post.title}
                  onChange={(e) => setEditPost(e.target.value)}
                />
                <button onClick={() => handleUpdatePost(post.id)}>Save</button>
              </>
            ) : (
              <>
                {post.title}
                <button onClick={() => setEditPost(post.id)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}