import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload
    case 'clearNotification':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const showNotification = (message, dispatch) => {
  dispatch({
    type: 'setNotification',
    payload: message
  })
  setTimeout(() => {
    dispatch({ type: 'clearNotification' })
  }, 5000)
}

export default NotificationContext
