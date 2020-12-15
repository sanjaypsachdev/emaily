import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import formFields from './formFields'
import { submitSurvey } from '../../actions'

const SurveyFormReview = ({ onCancel }) => {

  const formValues = useSelector(state => state.form.surveyForm.values)

  const dispatch = useDispatch()

  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>
        {formValues[name]}
      </div>
    </div>
  ))

  return (
    <div>
      <h5>
        Please confirm your entries
      </h5>
      { reviewFields }
      <button
        className="yellow darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => dispatch(submitSurvey(formValues))}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

export default SurveyFormReview
