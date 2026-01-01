import { useState } from 'react'

const Button = ({onClick, text}) =>{
    return (
	<button onClick={onClick}>{text}</button>
    )
}

const AnecdoteDisplay = ({anecdote, count}) => {
    return(
	<>
	    <div>
		{anecdote}
	    </div>
	    <div>
		has {count} votes
	    </div>
	</>
    )
}
	    

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

    const alength = anecdotes.length
    const a = Array(alength).fill(0)
    
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(a)
    const [maxIndex, setMaxIndex] = useState(0)

    const handleRandomClick = () => {
	const randomAnecdoteIndex = Math.floor(Math.random() * alength)
	setSelected(randomAnecdoteIndex)
	console.log(votes)
    }

    const handleVoteClick = () => {
	const updatedVotes = [...votes]
	updatedVotes[selected] += 1
	setVotes(updatedVotes)
	if (updatedVotes[selected] > updatedVotes[maxIndex]) {
	    setMaxIndex(selected)
	}
	console.log(updatedVotes)
    }
    
  return (
      <div>
	  
	  <div>
	      <h1>Anecdote of the day</h1>
	      <AnecdoteDisplay anecdote={anecdotes[selected]} count={votes[selected]}/>
	  </div>
	  
	  <div>
	      <Button onClick={handleRandomClick} text='next anecdote'/>
	      <Button onClick={handleVoteClick} text='vote'/>
	  </div>

	  <div>
	      <h1>Anecdote with most votes</h1>
	      <AnecdoteDisplay anecdote={anecdotes[maxIndex]} count={votes[maxIndex]}/>
	  </div>
	  

      </div>
  )
}

export default App
/*
	if (votes[selected] = votes[maxIndex]) {
	    console.log(maxIndex)
	    setMaxIndex(selected)
	    console.log(maxIndex)
	    }
	    */
