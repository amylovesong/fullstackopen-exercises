import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'

const Blogs = ({ user }) => {
  // 对 blogs 的处理逻辑不能放在 UI 代码中，应在 selector 中处理
  // 否则会报错：A state mutation was detected between dispatches
  const blogs = useSelector(state => {
    console.log('state.blogs', state.blogs)
    if (state.blogs.length === 0) {
      return state.blogs
    } else {
      return [...state.blogs].sort((cur, next) => next.likes - cur.likes)
    }
  })

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