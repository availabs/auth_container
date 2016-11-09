'use strict';

var AppDispatcher = require('../utils/AppDispatcher'),
    LoadingConstants = require('../constants/LoadingConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),

    CHANGE_EVENT = 'change';

var LOADING = false;

var LoadingStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    loadingStart: function() {
        LOADING = true;
        this.emit(CHANGE_EVENT);
    },
    loadingStop: function() {
        LOADING = false;
        this.emit(CHANGE_EVENT);
    },

    getLoading: function() {
        return LOADING;
    }
});

LoadingStore.dispatchToken = AppDispatcher.register(function(action) {
    switch(action.type) {

    case LoadingConstants.LOADING_START:
        LOADING = true;
        LoadingStore.emitChange();
        break;

    case LoadingConstants.LOADING_STOP:
        LOADING = false;
        LoadingStore.emitChange();
        break;
  }

});

module.exports = LoadingStore;
