// app/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setName('');
    setContent('');
    setLoading(true);
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, name }),
    })
    const data = await response.json()
    setPosts([data, ...posts])
    setLoading(false);
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800'>掲示板</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="名前"
          className='border border-gray-300 rounded p-1'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <textarea
          placeholder="投稿本文"
          className='border border-gray-300 rounded p-1'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button 
          type="submit" 
          className='bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
            投稿
        </button>
      </form>
      <div className="mt-4">
        {loading ? (
          <div className="text-gray-500 flex items-center">
        <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
        Loading...
          </div>
        ) : (
          <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-gray-300 pb-2">
            <div className="text-sm text-gray-600">
          <strong className="text-gray-800">{post.name || 'ゲスト'}</strong> - {new Date(post.createdAt).toLocaleString()}
            </div>
            <p className="mt-1 text-gray-700">{post.content}</p>
          </li>
        ))}
          </ul>
        )}
      </div>
    </div>
  )
}