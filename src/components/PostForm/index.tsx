import React, { useState } from 'react'
import './index.scss'

const PostForm: React.FC = () => {
  const [fieldTitle, setFieldTitle] = useState('')
  const [fieldContent, setFieldContent] = useState('')

  return (
    <form className="post-form">
      <h2>What’s on your mind?</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          value={fieldTitle}
          type="text"
          id="title"
          placeholder="Hello world"
          onChange={(e) => setFieldTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          value={fieldContent}
          id="content"
          placeholder="Content here"
          onChange={(e) => setFieldContent(e.target.value)}
        />
      </div>
      <button
        disabled={fieldTitle.length === 0 || fieldContent.length === 0}
        type="submit"
      >
        Create
      </button>
    </form>
  )
}

export default PostForm
