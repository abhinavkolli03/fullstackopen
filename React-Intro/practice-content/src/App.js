import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}. You are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const a = 10
  const b = 20

  console.log('hello from component')
  return (
    <div className="App">
      <p>Greetings</p>
      <Hello name="George" age={a}/>
      <Hello name="Abhinav" age={b}/>
      <p>
        {a} plus {b} is {a+b}
      </p>
    </div>
  )
}

export default App;
