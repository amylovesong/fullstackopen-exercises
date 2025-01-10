import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
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