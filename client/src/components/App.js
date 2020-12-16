import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/surveys">
            <Dashboard />
          </Route>
          <Route path="/surveys/new">
            <SurveyNew />
          </Route>
        </div>
      </BrowserRouter>
  )
}

export default App