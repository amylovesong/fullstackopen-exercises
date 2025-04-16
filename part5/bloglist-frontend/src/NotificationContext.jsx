import { createContext, useContext, useReducer } from "react"
import notificationReducer from "./reducers/notificationReducer"

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [message, messageDispatch] = useReducer(notificationReducer, null)

  return <NotificationContext.Provider value={[message, messageDispatch]}>
    {children}
  </NotificationContext.Provider>
}

export const useNotificationValue = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[1]
}

export default NotificationContext