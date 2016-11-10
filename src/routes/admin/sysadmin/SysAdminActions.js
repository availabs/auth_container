import SailsWebApi from '../../../components/utils/SailsWebApi'
import AppDispatcher from '../../../components/utils/AppDispatcher'
import SysAdminConstants from '../../../components/constants/SysAdminConstants'

var SysAdminActions = {
    updateRoutes: function(request) {
        SailsWebApi.updateRoutes(request, function(error, response) {
            AppDispatcher.dispatch({
                type: SysAdminConstants.UPDATE_ROUTES,
                response: response
            })
        })
    },
    patchRoutes: function(request) {
        SailsWebApi.patchRoutes(request, function(error, response) {
            AppDispatcher.dispatch({
                type: SysAdminConstants.PATCH_ROUTES,
                response: response
            })
        })
    },
    dismissMessages: function() {
        AppDispatcher.dispatch({
            type: SysAdminConstants.DISMISS_MESSAGES
        })
    },
    sendMessage: function(message) {
        AppDispatcher.dispatch({
            type: SysAdminConstants.SEND_MESSAGE,
            message: message
        })
    },
    createAutoRoutes: function(request) {
        SailsWebApi.createAutoRoutes(request, function(error, response) {
            AppDispatcher.dispatch({
                type: SysAdminConstants.CREATE_AUTO_ROUTES,
                response: response
            })
        })
    }
}

module.exports = SysAdminActions;
