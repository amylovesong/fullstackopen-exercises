import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { clearNotification, newNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('anecdote:', anecdote)

    dispatch(newAnecdote(anecdote))
    dispatch(newNotification(`you added '${anecdote}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
  </>
}

export default AnecdoteForm
