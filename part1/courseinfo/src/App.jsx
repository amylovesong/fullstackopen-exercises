const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ part, exercise }) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Content = ({ parts }) => {
  return <div>
    {parts.map(part =>
      <Part key={part.id} part={part.name} exercise={part.exercise} />
    )}
  </div>
}

const Course = ({ course }) => {
  return <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamental of React',
        exercise: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercise: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercise: 14,
        id: 3
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App
