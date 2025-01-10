import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
      setError('wrong username or password')
      setTimeout(() => {
        setError(null)
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
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.error('handleCreate error:', exception);
    }
  }

  const handleDelete = async (blog) => {
    console.log('handleDelete blog:', blog)
    if (confirm(`Remove blog ${blog.title} by ${blog.user.name}`)) {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const handleLike = async (blog) => {
    console.log('handleLike:', blog)

    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log('handleLike newBlog:', newBlog)
    
    const returnedBlog = await blogService.update(blog.id, newBlog)
    console.log('handleLike returnedBlog:', returnedBlog)
    setBlogs(blogs
      .filter(b => b.id !== blog.id)
      .concat(returnedBlog))
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={error} type='error' />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
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
      <Notification message={message} />

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <p/>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlog={handleCreate}/>
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