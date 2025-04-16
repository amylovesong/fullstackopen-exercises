import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import { clearNotification, setErrorNotification, setNotification } from './reducers/notificationReducer'
import { useNotificationDispatch } from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const messageDispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll()
  })
  console.log('result:', JSON.stringify(result))

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

  const likeBlogMutation = useMutation({
    mutationFn: async (newBlog) => {
      console.log('likeBlogMutation newBlog:', newBlog)
      await blogService.update(newBlog.id, newBlog)
    },
    onSuccess: () => {
      console.log('likeBlogMutation onSuccess')
      refreshBlogs()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (blog) => blogService.deleteBlog(blog),
    onSuccess: refreshBlogs
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setUser(user)
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
    setUser(null)
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

  const handleDelete = async (blog) => {
    console.log('handleDelete blog:', blog)
    if (confirm(`Remove blog ${blog.title} by ${blog.user.name}`)) {
      deleteMutation.mutate(blog)
    }
  }

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    console.log('handleLike blog:', blog, '\n\tnewBlog:', newBlog)
    likeBlogMutation.mutate(newBlog)
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

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

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
      {blogs
        .sort((cur, next) => next.likes - cur.likes)
        .map(blog =>
          <Blog key={blog.id}
            user={user}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        )}
    </div>
  )
}

export default App