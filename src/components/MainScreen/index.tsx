import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { deletePost, fetchPosts } from '../../service/api'
import PostForm from '../PostForm'
import PostItem, { type PostItemProps } from '../PostItem'
import Modal from '../Modal'

import './index.scss'
import EditPostForm from '../EditPostForm'

interface MainScreenProps {
  children?: React.ReactNode
  currentUser: string
  onLogout: () => void
}

const MainScreen: React.FC<MainScreenProps> = ({ currentUser, onLogout }) => {
  const queryClient = useQueryClient()
  const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null)
  const [postToEdit, setPostToEdit] = useState<PostItemProps | null>(null)

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

  const handleOpenEditModal = (post: PostItemProps) => {
    setPostToEdit(post)
  }
  const handleCloseEditModal = () => {
    setPostToEdit(null)
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
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <div className="content-wrapper">
        <PostForm currentUser={currentUser} />
        <section className="post-list">
          {isLoading && <p>Loading posts...</p>}
          {isError && <p>Error fetching posts.</p>}
          {sortedPosts?.map((post: PostItemProps) => (
            <PostItem
              key={post.id}
              {...post}
              currentUser={currentUser}
              onDelete={handleOpenDeleteModal}
              onEdit={handleOpenEditModal}
            />
          ))}
        </section>
      </div>

      <Modal isOpen={postToDeleteId !== null} onClose={handleCloseDeleteModal}>
        <h4>Are you sure you want to delete this item?</h4>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={handleCloseDeleteModal}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      </Modal>

      <Modal isOpen={postToEdit !== null} onClose={handleCloseEditModal}>
        {postToEdit && (
          <EditPostForm post={postToEdit} onClose={handleCloseEditModal} />
        )}
      </Modal>
    </div>
  )
}

export default MainScreen
