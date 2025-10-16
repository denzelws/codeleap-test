import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../../service/api'

import './index.scss'

type PostFormProps = {
  currentUser: string
}

const PostForm: React.FC<PostFormProps> = ({ currentUser }) => {
  const [fieldTitle, setFieldTitle] = useState('')
  const [fieldContent, setFieldContent] = useState('')

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setFieldTitle('')
      setFieldContent('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      username: currentUser,
      title: fieldTitle,
      content: fieldContent,
    })
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
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
        disabled={
          fieldTitle.length === 0 ||
          fieldContent.length === 0 ||
          mutation.isPending
        }
        type="submit"
      >
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}

export default PostForm
