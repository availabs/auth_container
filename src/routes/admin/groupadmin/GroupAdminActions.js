var SailsWebApi = require('../../../components/utils/SailsWebApi'),
    AppDispatcher = require('../../../components/utils/AppDispatcher'),
    ErrorMessageConstants = require('../../../components/constants/ErrorMessageConstants'),
    GroupAdminConstants = require('../../../components/constants/GroupAdminConstants');

import $ from 'jquery'

var AUTH_SERVER_URL = "http://test.com:1337/"

module.exports = {
   getAllGroups: function() {

    $.ajax({
      type: "GET",
      url: (AUTH_SERVER_URL + "groups"),
      success:function(responseText,requestStatus,fullResponse){
        console.log("new route getGroups", responseText)
        AppDispatcher.dispatch({
           type: GroupAdminConstants.GET_ALL_GROUPS,
           groups: responseText.groups
        })
      }
    });
       // SailsWebApi.getAllGroups(function(error, groups) {
       //     AppDispatcher.dispatch({
       //         type: GroupAdminConstants.GET_ALL_GROUPS,
       //         groups: groups
       //     })
       // })
   },
   setEditTarget: function(group) {
       AppDispatcher.dispatch({
           type: GroupAdminConstants.SET_GROUP_EDIT_TARGET,
           group: group
       })
   },
   createGroup: function(grp) {
       SailsWebApi.createGroup(grp, function(error, group) {
           if (error) {
               AppDispatcher.dispatch({
                   type: ErrorMessageConstants.ERROR_MESSAGE,
                   event: "Create Group Error",
                   error: error,
                   message: "A group with that name already exists."
               })
           }
           else {
               AppDispatcher.dispatch({
                   type: GroupAdminConstants.CREATE_GROUP,
                   group: group
               })
           }
       })
   },
   updateGroup: function(grp) {
       SailsWebApi.updateGroup(grp, function(error, group) {
           AppDispatcher.dispatch({
               type: GroupAdminConstants.UPDATE_GROUP,
               group: group
           })
       })
   },
   deleteGroup: function(grp) {
       SailsWebApi.deleteGroup(grp, function(error, group) {
           AppDispatcher.dispatch({
               type: GroupAdminConstants.DELETE_GROUP,
               group: group
           })
       })
   }
};
