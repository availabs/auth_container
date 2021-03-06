import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'

import UserActions from './routes/AuthContainer/modules/UserActions'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  console.log("main window",window)

  if(window.localStorage.token && window.localStorage.token != ""){
    UserActions.setSessionUser({token:window.localStorage.token})
  }

  ReactDOM.render(
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <Router history={browserHistory} children={routes} />
      </div>
    </Provider>,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
