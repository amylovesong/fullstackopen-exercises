import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { newNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, displayTime) => {
  return dispatch => {
    dispatch(newNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export default notificationSlice.reducer