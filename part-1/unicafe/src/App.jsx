import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = {
    good,
    neutral,
    bad
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={() => setGood(good + 1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if(all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  const average = (good - bad) / all
  const positive = good / all * 100

  // return (
  //   <div>
  //     <h1>statistics</h1> 
  //     <StatisticsLine text="good" value={good} />
  //     <StatisticsLine text="neutral" value={neutral} />
  //     <StatisticsLine text="bad" value={bad} />
  //     <StatisticsLine text="all" value={all} />
  //     <StatisticsLine text="average" value={average} />
  //     <StatisticsLine text="positive" value={positive} />
  //   </div>
  // )

  // Display statistics in an HTML table
  return (
    <div>
      <h1>statistics</h1>
      <table>
        {/* 
        chatgpt generated:
        ⚠ IMPORTANT: <tr> cannot be a direct child of <table>.

        According to the HTML specification, a <table> element can only contain:
          - <thead>
          - <tbody>
          - <tfoot>

        NOT <tr> directly.

        If we write:

          <table>
            <tr>...</tr>
          </table>

        The browser will automatically insert a <tbody> element
        when parsing the HTML. So the real DOM becomes:

          <table>
            <tbody>
              <tr>...</tr>
            </tbody>
          </table>

        This creates a mismatch between:
          - React's virtual DOM (what React thinks it rendered)
          - The actual browser DOM (which has an auto-inserted <tbody>)

        In React 18 (especially with SSR or strict mode),
        this mismatch causes a hydration warning/error.

        Therefore, we must explicitly include <tbody>
        to make the DOM structure deterministic.
        */}
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  if(text === "positive") {
    return (<div>{text} {value} %</div>)
  }

  return (<div>{text} {value}</div>)
}

export default App