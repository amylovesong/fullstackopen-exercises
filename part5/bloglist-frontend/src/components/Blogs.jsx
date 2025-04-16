import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useUserValue } from "../UserContext"
import Blog from "./Blog"
import blogService from "../services/blogs"

const Blogs = () => {
  const user = useUserValue()

  const queryClient = useQueryClient()

  const refreshBlogs = () => {
    console.log('refreshBlogs')
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['blogs'] })
  }

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

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    console.log('handleLike blog:', blog, '\n\tnewBlog:', newBlog)
    likeBlogMutation.mutate(newBlog)
  }

  const handleDelete = async (blog) => {
    console.log('handleDelete blog:', blog)
    if (confirm(`Remove blog ${blog.title} by ${blog.user.name}`)) {
      deleteMutation.mutate(blog)
    }
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll()
  })
  console.log('result:', JSON.stringify(result))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return (
    <div>
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

export default Blogs