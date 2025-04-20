import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { clearNotification, createErrorNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log('Login username:', username, 'password:', password)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(userLogin({ username, password }))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      console.error('handleLogin error:', exception)
      dispatch(createErrorNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          data-testid='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control
          data-testid='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button type='submit'>login</Button>
    </Form>
  )
}

export default Login