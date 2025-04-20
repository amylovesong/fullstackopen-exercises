import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AppBar = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    dispatch(userLogout())
  }

  const navItemStyle = {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
  }

  return (
    <Navbar collapseOnSelect bg='light' expand='lg' variant='light'>
      <Navbar.Toggle aria-colcount='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Link to='/blogs'>blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users'>users</Link>
          </Nav.Link>
          <Nav.Item>
            <div style={navItemStyle}><em>{user.name} logged in</em></div>
          </Nav.Item>
          <Nav.Item>
            <Button onClick={handleLogout}>logout</Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppBar