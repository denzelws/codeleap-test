import React from 'react'
import './index.scss'
import PostForm from '../PostForm'
import PostItem from '../PostItem'

interface MainScreenProps {
  children?: React.ReactNode
}

// temp data
const mockPosts = [
  {
    id: 1,
    title: 'My First Post at CodeLeap Network!',
    author: 'Victor',
    timestamp: '25 minutes ago',
    content:
      'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...',
  },
  {
    id: 2,
    title: 'My Second Post at CodeLeap Network!',
    author: 'Vini',
    timestamp: '45 minutes ago',
    content:
      'Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam...',
  },
]

const MainScreen: React.FC<MainScreenProps> = () => {
  return (
    <div className="main-screen">
      <header>
        <h1>Codeleap Network</h1>
      </header>

      <div className="content-wrapper">
        <PostForm />
        <section className="post-list">
          {mockPosts.map((post) => (
            <PostItem
              key={post.id}
              title={post.title}
              author={post.author}
              timestamp={post.timestamp}
              content={post.content}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default MainScreen
