import React, { useState } from 'react'
import { useUpdatePost } from '../../hooks/usePostMutation'
import { type PostItemProps } from '../PostItem'

import './index.scss'

interface EditPostFormProps {
  post: PostItemProps
  onClose: () => void
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const { mutate: updateExistingPost, isPending } = useUpdatePost()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateExistingPost(
      { postId: post.id, data: { title, content } },
      { onSuccess: onClose }
    )
  }

  return (
    <form className="edit-post-form" onSubmit={handleSubmit}>
      <h4>Edit item</h4>
      <div className="form-group">
        <label htmlFor="edit-title">Title</label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="edit-content">Content</label>
        <textarea
          id="edit-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className="confirm-btn"
          disabled={!title || !content || isPending}
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default EditPostForm
