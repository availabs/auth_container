import SysAdminConstants from '../../../components/constants/SysAdminConstants'
import SailsWebApi from '../../../components/utils/SailsWebApi'
import AppDispatcher from '../../../components/utils/AppDispatcher'
import assign from 'object-assign'

var EventEmitter = require('events').EventEmitter

var CHANGE_EVENT = 'change',
    MESSAGES = [];

var SysAdminStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getMessages: function() {
        return MESSAGES;
    }
})

SysAdminStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.type) {

    case SysAdminConstants.UPDATE_ROUTES:
// console.log("<SysAdminConstants.UPDATE_ROUTES>",action.message)
        var response = action.response;
        MESSAGES.push(response.message + ", job id: " + response.jobId);
        SysAdminStore.emitChange();
        break;

    case SysAdminConstants.PATCH_ROUTES:
        var response = action.response;
        MESSAGES.push(response.message);
        SysAdminStore.emitChange();
        break;

    case SysAdminConstants.CREATE_AUTO_ROUTES:
        var response = action.response;
        MESSAGES.push(response.message + ", type: " + response.type + ", jobId: " + response.jobId);
        SysAdminStore.emitChange();
        break;

    case SysAdminConstants.DISMISS_MESSAGES:
        MESSAGES = [];
        SysAdminStore.emitChange();
        break;

    case SysAdminConstants.SEND_MESSAGE:
        MESSAGES.push(action.message);
        SysAdminStore.emitChange();
        break;
    }
})

module.exports = SysAdminStore;
