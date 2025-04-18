import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const showDelete = () => {
    console.log('showDelete user:', user, 'blog:', blog)
    return user.username === blog.user.username
      && user.name === blog.user.name
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDetails = blog => {
    return <div>
      <div>{blog.url}</div>
      <div>
        <span data-testid='likes'>{blog.likes}</span>
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {showDelete()
        ? <button onClick={() => handleDelete(blog)}>remove</button>
        : null}
    </div>
  }

  return (
    <div data-testid='blog' style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && blogDetails(blog)}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog