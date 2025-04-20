import { useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { initializeBlogs } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { initializeUser } from './reducers/userReducer'
import Users from './components/Users'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import Login from './components/Login'
import AppBar from './components/AppBar'

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  // https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization
  const selectSortedBlogs = createSelector(
    state => state.blogs, // input selector
    blogs => [...blogs].sort((a, b) => b.likes - a.likes) // output selector
  )

  const blogs = useSelector(selectSortedBlogs)
  console.log('blogs:', blogs)

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  console.log('user:', user)
  return (
    <div className='container'>
      {user ? <AppBar user={user} /> : <h2>blog app</h2>}
      <Notification />
      <p />

      <Routes>
        <Route path='/' element={
          <Navigate to={user === null ? '/login' : '/blogs'} replace />
        } />
        <Route path='/blogs' element={<Blogs blogs={blogs} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} />} />
        <Route path='/users' element={<Users users={users} />} />
        <Route path='/users/:id' element={<User users={users} />} />
      </Routes>
    </div>
  )
}

export default App