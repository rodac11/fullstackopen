const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Part = (props) => {
    return(
	<p>{props.part.name} {props.part.exercises}</p>
    )
}

const Content = (props) => {
    return (
	<div>
	    <Part part={props.parts[0]} />
	    <Part part={props.parts[1]} />
	    <Part part={props.parts[2]} />
	</div>
    )
    
}

const Total = (props) =>{
    return(
	<p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
	</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
	name: 'Fundamentals of React',
	exercises: 10
    }

    const part2 = {
	name: 'Using props to pass data',
	exercises: 7
    }
    const part3 = {
	name: 'State of a component',
	exercises: 14
    }
    
    {/*   const part1 = 'Fundamentals of React'
	  const exercises1 = 10

    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    const partsArr = [part1, part2, part3]
    const exercisesArr = [exercises1, exercises2, exercises3]
     */}    
  return (
      <div>
	  <Header name={course} />
	  <Content parts={[part1,part2,part3]} />
	  <Total parts={[part1,part2,part3]} />
      </div>
  )
}

export default App
