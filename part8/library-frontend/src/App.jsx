import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommendation from "./components/Recommendation";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const tokenValue = localStorage.getItem('library-user-token')
    setToken(tokenValue)
  }, [])

  const padding = {
    padding: 5,
  }

  const logout = () => {
    console.log('logout')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
      onData: ({ data }) => {
        console.log('Subscription data received:', data)
        const bookAdded = data.data.bookAdded
        notify(`${bookAdded.title} added`)
      }
    })

  const notify = (message) => {
    window.alert(message)
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">Authors</Link>
        <Link style={padding} to="/books">Books</Link>
        {
          token ? (
            <>
              <Link style={padding} to="/addbook">Add book</Link>
              <Link style={padding} to="/recommend">Recommend</Link>
              <Link style={padding} onClick={logout}>Logout</Link>
            </>
          ) : <Link style={padding} to="/login">Login</Link>
        }
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addbook" element={
          token
            ? <NewBook />
            : <Navigate to={'/login'} replace={true} />
        } />
        <Route path="/recommend" element={
          token
            ? <Recommendation />
            : <Navigate to={'/login'} replace={true} />
        } />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
