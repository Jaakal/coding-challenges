import React, { Fragment } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import './css/reset.css';
import './css/App.css'
import './css/Algorithms.css'

import Algorithms from './containers/Algorithms'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Algorithms/>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
