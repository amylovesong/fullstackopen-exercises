import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification, createErrorNotification, createNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import { initializeUser, userLogin, userLogout } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(userLogin({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('handleLogin error:', exception)
      dispatch(createErrorNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    dispatch(userLogout())
  }

  const handleCreate = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
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

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <p />
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlog={handleCreate} />
      </Togglable>
      <Blogs user={user} />
    </div>
  )
}

export default App