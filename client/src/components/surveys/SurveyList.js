import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSurveys } from '../../actions'

const SurveyList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSurveys())
  }, [dispatch])

  const surveys = useSelector(state => state.surveys)

  const renderSurveys = () => (
    surveys.map(survey => (
      <div className="card darken-1" key={survey.id}>
        <div className="card-content">
          <span className="card-title">{survey.title}</span>
          <p>
            {survey.body}
          </p>
          <p className="right">
            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
          </p>
        </div>
        <div className="card-action">
          <a>Yes: {survey.yes}</a>
          <a>No: {survey.no}</a>
        </div>
      </div>
    ))
  )

  return (
    <div>
      { renderSurveys() }
    </div>
  )
}

export default SurveyList
