const Course = ({course}) => {
    return (
	<div>
	<Header name={course.name}/>
	    <Content parts={course.parts}/>
	</div>
    )
}

const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => {
    /*
    let sumExercises = 0
    for (let i = 0; i < parts.length; i++) {
	sumExercises += parts[i].exercises
	}
	*/

    const sumExercises = parts.reduce(
	(accumulator, currentValue) => accumulator +
	    currentValue.exercises,
	0,
    )

    console.log(sumExercises)
    
    return (
	<div>    
	    {parts.map(part =>
		<Part key={part.id} part={part}/>
	    )}
	    <Sum val={sumExercises}/>	    
	</div>
    )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Sum = ({val}) => <p><strong>total of {val} exercises</strong></p>

const App = () => {
    const course = {
	id: 1,
	name: 'Half Stack application development',
	parts: [
	    {
		name: 'Fundamentals of React',
		exercises: 10,
		id: 1
	    },
	    {
		name: 'Using props to pass data',
		exercises: 7,
		id: 2
	    },
	    {
		name: 'State of a component',
		exercises: 14,
		id: 3
	    },
	    {
		name: 'Redux',
		exercises: 11,
		id: 4
	    }   
	]
    }
    
    return <Course course={course} />
}

export default App
