import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector(state => state.notification)
  console.log('message:', message, 'type:', type)

  if (!message) {
    return null
  }

  const variant = type === 'error' ? 'danger' : 'success'
  return (
    <Alert variant={variant} className='notification'>
      {message}
    </Alert>
  )
}

export default Notification
