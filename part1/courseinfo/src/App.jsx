const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Content = ({ parts }) => {
  return <div>
    {parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )}
  </div>
}

const Total = ({ parts }) => {
  const total = parts.reduce((previous, currentValue, curIndex) => {
    console.log('reduce previous:', previous,
      'currentValue:', currentValue, 'curIndex:', curIndex);
    return previous + currentValue.exercises // currentValue is a part object
  }, 0) // initial value is 0, so previous is 0 in the first loop
  console.log('total:', total);

  return <h4>total of {total} exercises</h4>
}

const Course = ({ course }) => {
  return <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamental of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App
