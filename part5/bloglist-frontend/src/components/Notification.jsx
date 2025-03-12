import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector(state => state)
  console.log('message:', message, 'type:', type)

  if (!message) {
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

export default Notification
