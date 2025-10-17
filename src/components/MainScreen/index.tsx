import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { deletePost, fetchPosts } from '../../service/api'
import PostForm from '../PostForm'
import PostItem, { type PostItemProps } from '../PostItem'
import Modal from '../Modal'

import './index.scss'

interface MainScreenProps {
  children?: React.ReactNode
  currentUser: string
}

const MainScreen: React.FC<MainScreenProps> = ({ currentUser }) => {
  const queryClient = useQueryClient()
  const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null)

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleOpenDeleteModal = (id: number) => {
    setPostToDeleteId(id)
  }

  const handleCloseDeleteModal = () => {
    setPostToDeleteId(null)
  }

  const handleConfirmDelete = () => {
    if (postToDeleteId) {
      deleteMutation.mutate(postToDeleteId)
      handleCloseDeleteModal()
    }
  }

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
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </section>
      </div>

      <Modal
        isOpen={postToDeleteId !== null}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      >
        <h4>Are you sure you want to delete this item?</h4>
      </Modal>
    </div>
  )
}

export default MainScreen
