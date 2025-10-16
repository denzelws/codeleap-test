import React from 'react'
import './index.scss'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { formatDistanceToNow } from '../../utils/formatDistanceToNow'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../../service/api'

export type PostItemProps = {
  id: number
  title: string
  username: string
  created_datetime: string
  content: string
  currentUser: string
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  title,
  username,
  created_datetime,
  content,
  currentUser,
}) => {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id)
    }
  }
  return (
    <article className="post-item">
      <header>
        <h3>{title}</h3>

        {currentUser === username && (
          <div className="actions">
            <FaTrash color="white" cursor="pointer" onClick={handleDelete} />
            <FaEdit color="white" cursor="pointer" />
          </div>
        )}
      </header>

      <div className="post-content">
        <div className="meta-data">
          <span>@{username}</span>
          <span>{formatDistanceToNow(created_datetime)}</span>
        </div>
        <p>{content}</p>
      </div>
    </article>
  )
}

export default PostItem
