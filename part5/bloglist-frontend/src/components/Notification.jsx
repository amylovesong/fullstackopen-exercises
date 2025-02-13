import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  console.log(message, type)

  if (message === null) {
    return null
  }

  const style = {
    color: (type === 'error' ? 'red' : 'green'),
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={style} className='notification'>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification
