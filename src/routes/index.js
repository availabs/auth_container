// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Login from './Login/index'
import Testing from './Testing/index'
import GroupAdmin from './admin/groupadmin/GroupAdmin.react.js'
import UserAdmin from './admin/useradmin/UserAdmin.react.js'
import SysAdmin from './admin/sysadmin/SysAdmin.react.js'

var GroupAdminPage = {component: GroupAdmin}
var UserAdminPage = {component: UserAdmin}
var SysAdminPage = {component: SysAdmin}

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ([
  {
    path        : '/',
    component   : CoreLayout,
    indexRoute  : Home
  },
  {
    path        : '/login',
    component   : CoreLayout,
    indexRoute  : Login   
  },
  {
    path        : '/testing',
    component   : CoreLayout,
    indexRoute  : Testing   
  },
  {
    path        : '/groupadmin',
    component   : CoreLayout,
    indexRoute  : GroupAdminPage   
  },
  {
    path        : '/useradmin',
    component   : CoreLayout,
    indexRoute  : UserAdminPage   
  },
  {
    path        : '/sysadmin',
    component   : CoreLayout,
    indexRoute  : SysAdminPage   
  }
])

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
