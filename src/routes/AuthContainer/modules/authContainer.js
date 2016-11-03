// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_ID = 'LOGIN_ID'
export const AUTH_STATUS = 'AUTH_STATUS'

// ------------------------------------
// Actions
// ------------------------------------

export function loginId (userId){
  return{
    type : LOGIN_ID,
    payload : userId
  }
}

export function authStatus(status){
  return{
    type:AUTH_STATUS,
    payload:status
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const userIdUpdate = (userId) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(loginId(userId))
      resolve()
    })
  }
}

export const authStatusUpdate = (status) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(authStatus(status))
      resolve()
    })
  }
}

export const actions = {
  loginId,
  userIdUpdate,
  authStatus,
  authStatusUpdate
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_ID] : (state,action) => {
    var newState = Object.assign({},state);
    newState['id'] = action.payload.id;
    newState['token'] =  action.payload.token
    newState['status'] = action.payload.status
    return newState;
  },
  [AUTH_STATUS] : (state,action) => {
    var newState = Object.assign({},state);
    console.log("auth status",action.payload)
    newState['status'] = action.payload
    return newState;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function authContainerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
