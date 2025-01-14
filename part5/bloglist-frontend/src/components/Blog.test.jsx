import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Blog title',
  author: 'amylovesong',
  url: 'http://localhost:5173',
  likes: 10,
  user: {
    username: 'amylovesong',
    name: 'Amy Sun'
  }
}

const user = {
  username: 'amylovesong',
  name: 'Amy Sun'
}

const handleLike = (blog) => {}

const handleDelete = (blog) => {}

test('renders title and author of a blog by default', () => {

  render(<Blog
    user={user}
    blog={blog}
    handleLike={handleLike}
    handleDelete={handleDelete}
  />)

  const element = screen.getByText('Blog title amylovesong')
  expect(element).toBeDefined()
})
