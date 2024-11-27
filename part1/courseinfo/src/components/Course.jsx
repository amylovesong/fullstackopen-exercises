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

export default Course
