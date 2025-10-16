const BASE_URL = 'https://dev.codeleap.co.uk/careers/'

export const fetchPosts = async () => {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data.results
}

export const createPost = async (postData: {
  username: string
  title: string
  content: string
}) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  if (!response.ok) {
    throw new Error('Failed to create post')
  }
  return response.json()
}

export const deletePost = async (postId: number) => {
  const response = await fetch(`${BASE_URL}${postId}/`, {
    method: 'DELETE',
  })
  if (response.status !== 204) {
    throw new Error('Failed to delete post')
  }
}

export const updatePost = async ({
  postId,
  data,
}: {
  postId: number
  data: { title: string; content: string }
}) => {
  const response = await fetch(`${BASE_URL}${postId}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to update post')
  }
  return response.json()
}
