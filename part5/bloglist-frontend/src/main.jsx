import ReactDOM from 'react-dom/client'
import App from './App'
import { createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import { Provider } from 'react-redux'

const store = createStore(notificationReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
