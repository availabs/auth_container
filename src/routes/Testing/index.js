import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'testing',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Testing = require('./containers/TestingContainer').default
      const reducer = require('../AuthContainer/modules/authContainer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'authContainer', reducer })

      /*  Return getComponent   */
      cb(null, Testing)

    /* Webpack named bundle   */
    }, 'testing')
  }
})