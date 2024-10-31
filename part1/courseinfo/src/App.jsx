const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  const [part1, part2, part3] = props.parts

  return (
    <>
      <Part part={part1.name} exercise={part1.exercise} />
      <Part part={part2.name} exercise={part2.exercise}/>
      <Part part={part3.name} exercise={part3.exercise}/>
    </>
  )
}

const Total = (props) => {
  const [part1, part2, part3] = props.parts

  return (
    <p>Number of exercise {part1.exercise + part2.exercise + part3.exercise}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamental of React',
      exercise: 10
    },
    {
      name: 'Using props to pass data',
      exercise: 7
    },
    {
      name: 'State of a component',
      exercise: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
