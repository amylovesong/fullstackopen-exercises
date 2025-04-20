import { addComment, updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const handleLike = (blog) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    console.log('handleLike blog:', blog, 'newBlog:', newBlog)

    dispatch(updateBlog(blog.id, newBlog))
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    const comment = event.target[0].value
    console.log('handleAddComment comment:', comment)
    event.target[0].value = ''
    dispatch(addComment(blog.id, comment))
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
        <Button onClick={() => handleLike(blog)}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>

      <p />
      <h3>comments</h3>
      <Form onSubmit={handleAddComment}>
        <Form.Control type="text" placeholder="input comment here" name='comment'/>
        <Button type="submit">add comment</Button>
      </Form>
      <Comments comments={blog.comments} />
    </div>
  )
}

const Comments = ({ comments }) => {
  if (!comments || comments.length === 0)
    return <div>No comments yet</div>

  return (<ul>
    {comments.map((comment, index) => (
      <li key={index}>{comment}</li>
    ))}
  </ul>)
}

export default Blog