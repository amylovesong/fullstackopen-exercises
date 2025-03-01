import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
    <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>

    <div style={showWhenVisible}>
      {props.children}
      <button onClick={toggleVisibility}>cancel</button>
    </div>
  </div>
})

Togglable.displayName='Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
