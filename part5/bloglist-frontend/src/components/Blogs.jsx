import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = ({ user, handleLike, handleDelete }) => {
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