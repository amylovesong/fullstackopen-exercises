import { useState } from "react"

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
        {blog.likes}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {showDelete()
        ? <button onClick={() => handleDelete(blog)}>remove</button>
        : null}
    </div>
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && blogDetails(blog)}
    </div>
  )
}

export default Blog