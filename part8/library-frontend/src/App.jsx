import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Recommendation from "./components/Recommendation";

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const padding = {
    padding: 5,
  }

  const logout = () => {
    console.log('logout')
    setToken(null)
    localStorage.clear()
    client.resetStore()
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
