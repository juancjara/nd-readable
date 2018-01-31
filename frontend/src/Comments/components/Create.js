import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
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

class Create extends Component {
  render() {
    const { onCancel, initialValues, onSubmit } = this.props
    const isNew = !initialValues

    return (
      <div>
        <h2>{isNew ? 'New Comment' : 'Update comment'}</h2>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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
              {isNew && (
                <div>
                  <Field
                    name="author"
                    component={TextFieldAdapter}
                    validate={required}
                    hintText="Author"
                    floatingLabelText="Author"
                  />
                </div>
              )}
              <RaisedButton label="Cancel" onClick={onCancel} />
              <RaisedButton
                primary
                label={isNew ? 'Create' : 'Update'}
                type="submit"
              />
            </form>
          )}
        />
      </div>
    )
  }
}

export default Create
