import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipients List', name: 'emails' }
]

const SurveyForm = ({ handleSubmit }) => {

  const renderFields = () => (
      FIELDS.map(({ label, name }) => <Field
        key={name}
        label={label}
        type="text"
        name={name}
        component={SurveyField}
      />
    )
  )

  return (
    <div>
      <form onSubmit={handleSubmit(values => console.log(values))}>
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  )
}

function validate(values) {
  const errors = {}

  errors.emails = validateEmails(values.emails)

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value for ${name}`
    }
  })

  console.log('errors', errors)

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm)