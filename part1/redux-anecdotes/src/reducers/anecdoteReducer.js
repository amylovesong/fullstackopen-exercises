import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    newAnecdote(state, action) {
      const anecdoteContent = action.payload
      return [...state, asObject(anecdoteContent)]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteFor, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer