const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null // render nothing
  }

  const style = {
    color: 'green',
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (error) {
    const errorStyle = {
      ...style,
      color: 'red'
    }
    return (
      <div style={errorStyle}>
        {error}
      </div>
    )
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
