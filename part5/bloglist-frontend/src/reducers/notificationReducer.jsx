const initialState = null

const notificationReducer = (state = initialState, action) => {
  console.log('notificationReducer', 'state:', state, 'action:', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      type: '',
      content: message,
    },
  }
}

export const setErrorNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      type: 'error',
      content: message,
    },
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer