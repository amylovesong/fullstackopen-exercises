import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes= () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (newObject) =>
  axios.post(baseUrl, newObject).then(res => res.data)

export const udpateAnecdote = (updatedAnecdote) =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
