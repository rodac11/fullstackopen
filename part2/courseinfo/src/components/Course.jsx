const Course = ({course}) => {
    return (
	<div>
	<Header name={course.name}/>
	    <Content parts={course.parts}/>
	</div>
    )
}

const Header = ({name}) => <h2>{name}</h2>

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

export default Course
