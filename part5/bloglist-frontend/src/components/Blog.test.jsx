import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

test('show URL and likes number when button clicked', async () => {
  const mockUser = userEvent.setup()

  render(<Blog
    user={user}
    blog={blog}
    handleLike={handleLike}
    handleDelete={handleDelete}
  />)

  const button = screen.getByText('view')
  await mockUser.click(button)

  const urlDiv = screen.getByText('http://localhost:5173')
  expect(urlDiv).toBeDefined()

  const likesDiv = screen.getByText('10')
  expect(likesDiv).toBeDefined()
})

test('click the like button twice calls event handler twice', async () => {
  const mockLikeHandler = vi.fn()
  const mockUser = userEvent.setup()

  render(<Blog
    user={user}
    blog={blog}
    handleLike={mockLikeHandler}
    handleDelete={handleDelete}
  />)

  // click view button to show blog details
  const viewBtn = screen.getByText('view')
  await mockUser.click(viewBtn)

  // act
  const likeBtn = screen.getByText('like')
  await mockUser.click(likeBtn)
  await mockUser.click(likeBtn)

  // verify
  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
