import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { clearNotification, createNotification } from '../reducers/notificationReducer'

const Blogs = ({ blogs }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleCreate = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(createBlog(newBlog))
      dispatch(createNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      ))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (exception) {
      console.error('handleCreate error:', exception)
    }
  }

  return (
    <div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs