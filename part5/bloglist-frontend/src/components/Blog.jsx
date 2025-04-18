import { updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

  const handleLike = (blog) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    console.log('handleLike blog:', blog, 'newBlog:', newBlog)
  
    dispatch(updateBlog(blog.id, newBlog))
  }

  return (
    <div data-testid='blog'>
      <h2>{blog.title} {blog.user.name}</h2>
      <div>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>
          {blog.url}
        </a>
      </div>
      <div>
        <span data-testid='likes'>{blog.likes} likes</span>
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default Blog