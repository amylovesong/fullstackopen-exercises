import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import { clearNotification, setErrorNotification, setNotification } from './reducers/notificationReducer'
import { useNotificationDispatch } from './NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clearUser, setUser } from './reducers/userReducer'
import { useUserContext } from './UserContext'
import Blogs from './components/Blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, userDispatch] = useUserContext()

  const messageDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const refreshBlogs = () => {
    console.log('refreshBlogs')
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['blogs'] })
  }

  const newBlogMutation = useMutation({
    mutationFn: (newBlog) => blogService.create(newBlog),
    onSuccess: refreshBlogs
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistAppUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      userDispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('handleLogin error:', exception)
      messageDispatch(setErrorNotification('wrong username or password'))
      setTimeout(() => {
        messageDispatch(clearNotification())
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    userDispatch(clearUser())
    blogService.setToken('')
  }

  const handleCreate = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await newBlogMutation.mutateAsync(newBlog)
      messageDispatch(setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      )
      setTimeout(() => {
        messageDispatch(clearNotification())
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
      <Blogs />
    </div>
  )
}

export default App