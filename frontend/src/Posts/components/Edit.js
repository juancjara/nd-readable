import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ''}
  />
)

const required = value => (value ? undefined : 'Required')

class Edit extends Component {
  render() {
    const { onCancel, onSubmit } = this.props

    const { title, body } = this.props

    return (
      <div>
        <h2>Edit post</h2>
        <Form
          onSubmit={onSubmit}
          initialValues={{ title, body }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="title"
                  component={TextFieldAdapter}
                  validate={required}
                  hintText="Title"
                  floatingLabelText="Title"
                />
              </div>
              <div>
                <Field
                  name="body"
                  component={TextFieldAdapter}
                  rows={4}
                  multiLine={true}
                  validate={required}
                  hintText="Content"
                  floatingLabelText="Content"
                />
              </div>
              <RaisedButton label="Cancel" onClick={onCancel} />
              <RaisedButton primary label="Update" type="submit" />
            </form>
          )}
        />
      </div>
    )
  }
}

export default Edit
