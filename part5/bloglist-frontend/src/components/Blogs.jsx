import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const Blogs = ({ user }) => {
  // https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization
  const selectSortedBlogs = createSelector(
    state => state.blogs, // input selector
    blogs => [...blogs].sort((a, b) => b.likes - a.likes) // output selector
  )

  const blogs = useSelector(selectSortedBlogs)
  console.log('blogs:', blogs)

  const dispatch = useDispatch()

  const handleLike = (blog) => {
    console.log('handleLike:', blog)
  
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log('handleLike newBlog:', newBlog)
  
    dispatch(updateBlog(blog.id, newBlog))
  }

  const handleDelete = (blog) => {
    console.log('handleDelete blog:', blog)
    if (confirm(`Remove blog ${blog.title} by ${blog.user.name}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div>
      {blogs
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

export default Blogs