import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { formatDistanceToNow } from '../../utils/formatDistanceToNow'

import './index.scss'

export type PostItemProps = {
  id: number
  title: string
  username: string
  created_datetime: string
  content: string
  currentUser: string
  onDelete: (id: number) => void
  onEdit: (post: PostItemProps) => void
}

const PostItem: React.FC<PostItemProps> = (props) => {
  const {
    id,
    title,
    username,
    created_datetime,
    content,
    currentUser,
    onDelete,
    onEdit,
  } = props

  return (
    <article className="post-item">
      <header>
        <h3>{title}</h3>

        {currentUser === username && (
          <div className="actions">
            <FaTrash
              color="white"
              cursor="pointer"
              onClick={() => onDelete(id)}
            />

            <FaEdit
              color="white"
              cursor="pointer"
              onClick={() => onEdit(props)}
            />
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
