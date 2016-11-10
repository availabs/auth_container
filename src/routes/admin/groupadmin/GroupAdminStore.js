'use strict';

var AppDispatcher = require('../../../components/utils/AppDispatcher'),
    GroupAdminConstants = require('../../../components/constants/GroupAdminConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    UserStore = require("../../AuthContainer/modules/UserStore"),

    CHANGE_EVENT = 'change';

var GROUPS = [],
    EDIT_TARGET = null;

var GroupAdminStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getUserGroup: function(user) {
        return GROUPS.reduce(function(a, c) {
            return c.name == user.group ? c : a;
        }, null);
    },
    getDisplayName: function(name) {
        return GROUPS.reduce(function(a, c) {
            return c.name == name ? c.displayName : a;
        }, name);
    },
    getAllGroups: function() {
        return GROUPS;
    },
    getEditTarget: function() {
        return EDIT_TARGET;
    }
});

GroupAdminStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.type) {

    case GroupAdminConstants.GET_ALL_GROUPS:
        console.log("getting all groups group-store",action)
        GROUPS = action.groups;
        GroupAdminStore.emitChange();
        break;

    case GroupAdminConstants.SET_GROUP_EDIT_TARGET:
        EDIT_TARGET = action.group;
        GroupAdminStore.emitChange();
        break;

    case GroupAdminConstants.DELETE_GROUP:
        GROUPS = GROUPS.filter(function(d) { return d.id != action.group.id; });
        EDIT_TARGET = null;
        GroupAdminStore.emitChange();
        break;

    case GroupAdminConstants.CREATE_GROUP:
        GROUPS.push(action.group);
        EDIT_TARGET = null;
        GroupAdminStore.emitChange();
        break;

    case GroupAdminConstants.UPDATE_GROUP:
        GROUPS = GROUPS.filter(function(d) { return d.id != action.group.id; });
        GROUPS.push(action.group);
        EDIT_TARGET = action.group;
        //UserStore.getSessionUser().userGroup = action.group;
        GroupAdminStore.emitChange();
        break;
  }

});

module.exports = GroupAdminStore;
