import React from 'react'
import './index.scss'
import { FaTrash, FaEdit } from 'react-icons/fa'

interface PostItemProps {
  title: string
  author: string
  timestamp: string
  content: string
  currentUser: string
}

const PostItem: React.FC<PostItemProps> = ({
  title,
  author,
  timestamp,
  content,
  currentUser,
}) => {
  return (
    <article className="post-item">
      <header>
        <h3>{title}</h3>

        {currentUser === author && (
          <div className="actions">
            <FaTrash color="white" cursor="pointer" />
            <FaEdit color="white" cursor="pointer" />
          </div>
        )}
      </header>
      <div className="post-content">
        <div className="meta-data">
          <span>@{author}</span>
          <span>{timestamp}</span>
        </div>
        <p>{content}</p>
      </div>
    </article>
  )
}

export default PostItem
