import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const message = useNotificationValue()
  // console.log('Notification', message)

  if (message === null) {
    return null
  }

  const { type, content } = message
  const style = {
    color: (type === 'error' ? 'red' : 'green'),
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={style} className='notification'>{content}</div>
}

export default Notification
