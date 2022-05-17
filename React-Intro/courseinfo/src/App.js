const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  const parts = props.course.parts.map((part) => 
    <p>{part.name} {part.exercises}</p>)
  return(
    <div>
      {parts}
    </div>
  )
}

const Total = (props) => {
  let total = 0
  props.course.parts.forEach(element => {
    total += element.exercises
    console.log(element)
  });
  return(
    <div>
      <p>{total} exercises total</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App;
