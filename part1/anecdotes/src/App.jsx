import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [maxPointIndex, setMaxPointIndex] = useState(0)

  console.log('rendering with selected:', selected, 'points:', points, 'maxPointIndex', maxPointIndex)
  
  const handleNextClick = () => {
    const max = anecdotes.length
    const random = Math.random()
    const randomIndex = Math.floor(random * max)
    console.log('handleNextClick with max:', max, 'random:', random, 'randomIndex:', randomIndex)
    setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    const newPoints = [...points] // copy first
    newPoints[selected] += 1 // update value of copy

    console.log('handleVoteClick with selected:', selected, 'newPoint:', newPoints[selected],
      'maxPointIndex:', maxPointIndex, 'maxPoint:', points[maxPointIndex])
    // update maxPointIndex when new max point is produced
    if(newPoints[selected] >= points[maxPointIndex] && selected != maxPointIndex) {
      console.log('handleVoteClick update maxPointIndex to', selected)
      setMaxPointIndex(selected)
    }

    setPoints(newPoints) // update state
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleNextClick}>next anecdote</button>
      </div>

      <h1>Anecdote with most votes</h1>
      {anecdotes[maxPointIndex]}
      <div>has {points[maxPointIndex]} votes</div>
    </div>
  )
}

export default App