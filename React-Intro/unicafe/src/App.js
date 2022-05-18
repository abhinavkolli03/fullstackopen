import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const Header = ({title}) => <h1>{title}</h1>

const Button = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({report, totalClicks}) => {
  const updatedReport = report.map((part) => 
    <tr><td>{part.category}</td> <td>{part.count}</td></tr>)
  if (totalClicks === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      {updatedReport}
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const results = {
    report: [
      {
        category: "good",
        count: good
      },
      {
        category: "neutral",
        count: neutral
      },
      {
        category: "bad",
        count: bad
      },
      {
        category: "all",
        count: all
      },
      {
        category: "average",
        count: ((good * 1) + (neutral * 0) + (bad * -1)) / all
      },
      {
        category: "positive",
        count: (good / all) + " %"
      }
    ]
  }

  const handleGoodClick = () => {
    setGood(good+1)
    setAll(all+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
    setAll(all+1)
  }

  return(
    <div>
      <Header title={'give feedback'} />
      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>
      <Header title={'statistics'} />
      <Statistics report={results.report} totalClicks={all}/>
    </div>
  )
}

export default App;
