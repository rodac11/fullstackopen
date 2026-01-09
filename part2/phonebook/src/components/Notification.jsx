const Notification = ({message}) => {
    const greenStyle = {
	color: 'green',
	background: 'lightgray',
	fontSize: 20,
	border: 'solid green',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10,
    }
    
    if (message === null) {
	return null
    }

    return (
	<div style={greenStyle}>
	    {message}
	</div>

    )
}

export default Notification
