import { useState } from 'react'

// tr: table row, td: table data
const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
  const { good, neutral, bad, total } = props

  // good: 1, neutral: 0, bad: -1
  const average_score = (good * 1 + neutral * 0 + bad * -1) / total
  const positive_percentage = (good * 100 / total) + '%'

  if (total > 0) {
    // table tag must have tbody tag inside
    return <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average_score} />
          <StatisticLine text='positive' value={positive_percentage} />
        </tbody>
      </table>
    </div>
  } else {
    return <div>No feedback given</div>
  }
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App
