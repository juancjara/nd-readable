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

const SelectAdapter = ({ input, items, meta, ...rest }) => (
  <SelectField
    {...input}
    {...rest}
    onChange={(e, index, value) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ''}
  >
    {items.map(v => <MenuItem key={v} value={v} primaryText={v} />)}
  </SelectField>
)

const required = value => (value ? undefined : 'Required')

class CreatePost extends Component {
  render() {
    const { onCancel, categories, onSubmit } = this.props

    return (
      <div>
        <h2>New post</h2>
        <Form
          onSubmit={onSubmit}
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
                  name="author"
                  component={TextFieldAdapter}
                  validate={required}
                  hintText="Author"
                  floatingLabelText="Author"
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
              <div>
                <Field
                  items={categories}
                  name="category"
                  component={SelectAdapter}
                  validate={required}
                  hintText="Category"
                  floatingLabelText="Category"
                />
              </div>

              <RaisedButton label="Cancel" onClick={onCancel} />
              <RaisedButton primary label="Create" type="submit" />
            </form>
          )}
        />
      </div>
    )
  }
}

export default CreatePost
