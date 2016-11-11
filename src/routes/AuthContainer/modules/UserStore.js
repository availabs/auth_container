'use strict';

var AppDispatcher = require('../../../components/utils/AppDispatcher'),
    UserConstants = require('../../../components/constants/UserConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),

    CHANGE_EVENT = 'change';

var USERS = [],
    SESSION_USER = {},
    EDIT_TARGET = null,

    USER_ACTION_ERROR = null,

    USER_GROUP_NAME = null;

var UserStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getUser: function(id) {
        return USERS[id];
    },
    getAllUsers: function() {
        return USERS;
    },
    getSessionUser:function() {
        return SESSION_USER;
    },
    getUserGroup: function() {
// console.log("<UserStore.getUserGroup>", USER_GROUP_NAME);
        return USER_GROUP_NAME;
    },
    getEditTarget: function() {
        return EDIT_TARGET;
    },
    getError: function() {
        return USER_ACTION_ERROR;
    }
});

UserStore.dispatchToken = AppDispatcher.register(function(action) {
console.log("ryan testing new user store.",action);

    switch(action.type) {

    case UserConstants.SET_SESSION_USER:
        SESSION_USER = action.user;
        //UserStore.emitChange();
        break;

    case UserConstants.GET_ALL_USERS:
        USERS = action.users;
        UserStore.emitChange();
        break;

    case UserConstants.SET_EDIT_TARGET:
        EDIT_TARGET = action.user;
        UserStore.emitChange();
        break;

    case UserConstants.DELETE_USER:
        USERS = USERS.filter(function(d) { return d.id != action.user.id; });
        EDIT_TARGET = null;
        UserStore.emitChange();
        break;

    case UserConstants.CREATE_USER:
        USERS.push(action.user);
        EDIT_TARGET = null;
        UserStore.emitChange();
        break;

    case UserConstants.UPDATE_USER:
        USERS = USERS.filter(function(d) { return d.id != action.user.id; });
        USERS.push(action.user);
        EDIT_TARGET = action.user;
        UserStore.emitChange();
        break;

    case UserConstants.CLEAR_ERROR:
        USER_ACTION_ERROR = null;
        UserStore.emitChange();
        break;

    case UserConstants.SET_USER_GROUP:
console.log("<UserGroup.SET_USER_GROUP>", action.group)
        USER_GROUP_NAME = action.group;
        UserStore.emitChange();
        break;
  }

});

module.exports = UserStore;
