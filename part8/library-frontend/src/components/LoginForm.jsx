import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useNavigate } from "react-router-dom"

const LoginForm = ({ setToken }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({
      variables: { username: name, password }
    })
  }

  return (
    <form onSubmit={submit}>
      <div>
        name<input
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        password<input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="">login</button>
    </form>
  )
}

export default LoginForm