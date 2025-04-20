import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()

    createBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return <div>
    <h3>create new</h3>
    <Form onSubmit={handleCreate}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type='text'
          value={title}
          name='Text'
          placeholder='write blog title here'
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>author:</Form.Label>
        <Form.Control
          type='text'
          value={author}
          name='Username'
          placeholder='write blog author here'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control
          type='text'
          value={url}
          name='Url'
          placeholder='write blog url here'
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Group>
      <Button type='submit'>create</Button>
    </Form>
  </div>
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
