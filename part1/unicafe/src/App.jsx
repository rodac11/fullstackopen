import { useState } from 'react'

//

const Statistics = ({good, neutral, bad}) => {
    //STEP 3 NOTE: I had already written a component
    //displaying statistics into its component.
    const all = good + neutral + bad
    const avg = (good - bad) / all
    const positive = good / all * 100.0
    if (all === 0) {
	return (
	    <div>
		<h1>statistics</h1>
		No feedback given
	    </div>
	)
    }
    return(
	<div>
	    <h1>statistics</h1>
	    <div>good {good}</div>
	    <div>neutral {neutral}</div>
	    <div>bad {bad}</div>
	    <div>all {all}</div>
	    <div>average {avg}</div>
	    <div>positive {positive} %</div>
	</div>
    )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    //handlers
    const handleGoodClick = () => {
	const updatedGood = good + 1
	setGood(updatedGood)
    }

    const handleNeutralClick = () => {
	const updatedNeutral = neutral + 1
	setNeutral(updatedNeutral)
    }

    const handleBadClick = () => {
	    const updatedBad = bad + 1
	    setBad(updatedBad)
    }
    

  return (
      <div>
	  <h1>give feedback</h1>
	  <Button onClick={handleGoodClick} text='good'/>
	  <Button onClick={handleNeutralClick} text='neutral'/>
	  <Button onClick={handleBadClick} text='bad'/>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
