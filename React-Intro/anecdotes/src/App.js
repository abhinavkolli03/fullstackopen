import { render } from '@testing-library/react'
import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return(
    <div>
      <button onClick={handleClick}>
        {text}
      </button>
    </div>
  )
}

const Header = ({title}) => {
  return(
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)

  const nextClick = () => {
    setSelected(Math.round(Math.random() * 7))
  }

  const voteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  function getLarge(...points) {
    return Math.max(...points)
  } 

  return (
    <div>
      <Header title="Anecdote of the day" />
      {anecdotes[selected]}
      <div className="">
        <Button text="next anecdote" handleClick={nextClick} />
        <Button text="vote" handleClick={voteClick} />
      </div>
      <Header title="Anecdote with most votes" />
      {anecdotes[points.indexOf(getLarge(...points))]}
    </div>
  )
}


export default App;