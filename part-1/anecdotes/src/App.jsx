import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const handleRandomAnecdote = () => {
    // Generate random integer in range of 0 to anecdotes.length - 1
    const randomInteger = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomInteger)
  }
  const handleVote = () => {
    const tmp = [...votes]
    tmp[selected] += 1
    setVotes(tmp)
  }

  const findIndexOfMaxValue = (arr) => {
    let indexOfMax = 0
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] > arr[indexOfMax])
        indexOfMax = i
    }
    
    return indexOfMax
  }

  // Find index of max value in votes i.e. index of best anecdote. 
  // If there are multiple values are identical and max,
  // the index of value appears more before will be returned
  const index = findIndexOfMaxValue(votes)

  return (
    <div>
      <Anecdote text={anecdotes[selected]} />
      <Votes count={votes[selected]} />
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleRandomAnecdote} />
      <BestAnecdote text={anecdotes[index]} voteCount={votes[index]} />
    </div>
  )
}

const Anecdote = ({text}) => (
  <div>
    <h1>Anecdote of the day</h1>
    {text}
  </div>
)

const Votes  = ({count: voteCount}) => (
  <div>
    has {voteCount} votes
  </div>
)

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const BestAnecdote = ({text, voteCount}) => (
  <div>
    <h1>Anecdote with most votes</h1>
    {text}
    <br />
    has {voteCount} votes
  </div>
)

export default App