const Notification = ({message, error}) => {
    const greenStyle = {
	color: 'green',
	background: 'lightgray',
	fontSize: 20,
	border: 'solid green',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10,
    }

    const redStyle = {
	color: 'red',
	background: 'lightgray',
	fontSize: 20,
	border: 'solid red',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10,
    }
    
    if (message === null) {
	return null
    }

    const  messageStyle = (error)
	  ? redStyle
	  : greenStyle

    return (

	<div style={messageStyle}>
    	    {console.log(error)}
	    {message}
	</div>

    )
}

export default Notification
