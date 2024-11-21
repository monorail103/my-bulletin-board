// app/page.tsx

'use client'

import { useState, useEffect } from 'react'

interface Post {
  id: number
  content: string
  name: string | null
  createdAt: string
  ipAddress: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    setPosts(data)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, name }),
    })

    if (response.ok) {
      setContent('')
      setName('')
      fetchPosts()
    }
  }

  return (
    <div>
      <h1>掲示板</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <textarea
          placeholder="投稿本文"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">投稿</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.name || 'ゲスト'}</strong> - {post.content} ({new Date(post.createdAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  )
}