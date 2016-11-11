var SailsWebApi = require('../../../components/utils/SailsWebApi'),
    AppDispatcher = require('../../../components/utils/AppDispatcher'),
    ErrorMessageConstants = require('../../../components/constants/ErrorMessageConstants'),
    UserConstants = require('../../../components/constants/UserConstants');

function getCreateUserErrorMessage(error) {
    if (error.error.invalidAttributes['"loginName"']) {
        return "Login name is already in use.";
    }
    if (error.error.invalidAttributes['email']) {
        return "Email is already in use.";
    }
}

module.exports = {
   setSessionUser: function(user) {
      console.log("Testing set session user",user)
      if (typeof (Storage) !== 'undefined') {
        localStorage.setItem('token', user.token)
      }
      if(user.id == -1){
        localStorage.setItem('token', "")        
      }
      AppDispatcher.dispatch({
          type: UserConstants.SET_SESSION_USER,
          user: user
      })
   },
   getAllUsers: function() {
      console.log("Testing get all users")
       SailsWebApi.getAllUsers(function(error, users) {
           AppDispatcher.dispatch({
               type: UserConstants.GET_ALL_USERS,
               users: users
           })
       })
   },
   setEditTarget: function(user) {
       AppDispatcher.dispatch({
           type: UserConstants.SET_EDIT_TARGET,
           user: user
       })
   },
   createUser: function(user) {
       SailsWebApi.createUser(user, function(error, user) {
           if (error) {
               AppDispatcher.dispatch({
                   type: ErrorMessageConstants.ERROR_MESSAGE,
                   event: "Create User Error",
                   error: error,
                   message: getCreateUserErrorMessage(error)
               })
           }
           else {
               AppDispatcher.dispatch({
                   type: UserConstants.CREATE_USER,
                   user: user
               })
           }
       })
   },
   updateUser: function(user) {
       SailsWebApi.updateUser(user, function(error, user) {
           AppDispatcher.dispatch({
               type: UserConstants.UPDATE_USER,
               user: user
           })
       })
   },
   deleteUser: function(user) {
       SailsWebApi.deleteUser(user, function(error, user) {
           AppDispatcher.dispatch({
               type: UserConstants.DELETE_USER,
               user: user
           })
       })
   },
   setUserGroup: function(group) {
       AppDispatcher.dispatch({
           type: UserConstants.SET_USER_GROUP,
           group: group
       })
   }
};
