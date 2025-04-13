import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (id, blog) => {
  return async (dispatch, getState) => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch(setBlogs(getState().blogs.map(blog => (blog.id === id ? updatedBlog : blog))))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    await blogService.deleteBlog(blog)
    dispatch(setBlogs(getState().blogs.filter(b => b.id !== blog.id)))
  }
}

export const { appendBlog, setBlogs } = blogSlice.actions

export default blogSlice.reducer