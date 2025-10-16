import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchPosts } from '../../service/api'
import PostForm from '../PostForm'
import PostItem, { type PostItemProps } from '../PostItem'

import './index.scss'

interface MainScreenProps {
  children?: React.ReactNode
  currentUser: string
}

const MainScreen: React.FC<MainScreenProps> = ({ currentUser }) => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  const sortedPosts = posts?.sort(
    (a: PostItemProps, b: PostItemProps) =>
      new Date(b.created_datetime).getTime() -
      new Date(a.created_datetime).getTime()
  )

  return (
    <div className="main-screen">
      <header>
        <h1>Codeleap Network</h1>
      </header>

      <div className="content-wrapper">
        <PostForm currentUser={currentUser} />
        <section className="post-list">
          {isLoading && <p>Loading posts...</p>}
          {isError && <p>Error fetching posts.</p>}
          {sortedPosts?.map((post: PostItemProps) => (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title}
              username={post.username}
              created_datetime={post.created_datetime}
              content={post.content}
              currentUser={currentUser}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default MainScreen
