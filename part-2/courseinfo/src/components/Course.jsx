const Course = ({course}) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({course}) => (
  <div>
    {course.parts.map((part) => <Part key={part.id} part={part} />)}
  </div>
)

const Total = ({course}) => {
  const total = course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

  return (
    <div>
      <strong>total of {total} exercises</strong>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

export default Course