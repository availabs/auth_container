// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_ID = 'LOGIN_ID'

// ------------------------------------
// Actions
// ------------------------------------

export function loginId (userId){
  return{
    type : LOGIN_ID,
    payload : userId
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

export const actions = {
  loginId,
  userIdUpdate
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_ID] : (state,action) => {return action.payload}

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
