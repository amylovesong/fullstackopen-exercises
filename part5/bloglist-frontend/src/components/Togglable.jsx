import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = {
    display: visible ? '' : 'none'
  }
  const hideWhenVisible = {
    display: visible ? 'none' : ''
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return <div>
    <Button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</Button>

    <div style={showWhenVisible}>
      {props.children}
      <Button onClick={toggleVisibility}>cancel</Button>
    </div>
  </div>
})

Togglable.displayName='Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
