import { injectReducer } from 'store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AuthContainer = require('./containers/AuthContainerContainer').default
      const reducer = require('./modules/authContainer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'authContainer', reducer })

      /*  Return getComponent   */
      cb(null, AuthContainer)

    /* Webpack named bundle   */
    }, 'authContainer')
  }
})
