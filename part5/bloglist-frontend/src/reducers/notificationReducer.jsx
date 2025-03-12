const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload
    case 'clearNotification':
      return {}
    default:
      return state
  }
}

export const createNotification = (message) => {
  return {
    type: 'setNotification',
    payload: {
      message
    }
  }
}

export const createErrorNotification = (message) => {
  return {
    type: 'setNotification',
    payload: {
      message,
      type: 'error'
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'clearNotification'
  }
}

export default notificationReducer
