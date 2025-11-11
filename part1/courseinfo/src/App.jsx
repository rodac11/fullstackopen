const Header = (props) => {
    return (
	<h1>{props.name}</h1>
    )
}

const Part = (props) => {
    return(
	<p>{props.p} {props.e}</p>
    )
}

const Content = (props) => {
    return (
	<div>
	    <Part p={props.parts[0]} e={props.exercises[0]} />
	    <Part p={props.parts[1]} e={props.exercises[1]} />
	    <Part p={props.parts[2]} e={props.exercises[2]} />
	</div>
    )
    
}

const Total = (props) =>{
    return(
	<p> Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}
	</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    const partsArr = [part1, part2, part3]
    const exercisesArr = [exercises1, exercises2, exercises3]
    
  return (
      <div>
	  <Header name={course} />
	  <Content parts={partsArr} exercises = {exercisesArr} /> 
	  <Total exercises= {exercisesArr} />
      </div>
  )
}

export default App
