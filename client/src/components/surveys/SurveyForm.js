import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {

  const renderFields = () => (
    formFields.map(({ label, name }) => <Field
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
      <form onSubmit={handleSubmit(onSurveySubmit)}>
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

  errors.recipients = validateEmails(values.recipients)

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value for ${name}`
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)