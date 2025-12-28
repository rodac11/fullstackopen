import { useState } from 'react'

const StatisticLine = ({text, value}) => {
    return (
	<div>{text} {value}</div>
    )
}

const Statistics = (props) => {
    //STEP 3 NOTE: I had already written a component
    //displaying statistics into its component.
    const all = props.good + props.neutral + props.bad
    const avg = (props.good - props.bad) / all
    const positive = props.good / all * 100.0 + " %"
    if (all === 0) {
	return (
	    <div>
		No feedback given
	    </div>
	)
    }
    return(
	<div>
	    <StatisticLine text="good" value={props.good}/>
	    <StatisticLine text="neutral" value={props.neutral}/>
	    <StatisticLine text="bad" value={props.bad}/>
	    <StatisticLine text="all" value={all}/>
	    <StatisticLine text="average" value={avg}/>
	    <StatisticLine text="positive" value={positive}/>  
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
	  <h1>statistics</h1>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
