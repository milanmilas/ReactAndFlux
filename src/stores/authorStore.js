"use strict";

var Dispatcher = require('../dispatcher/apiDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeChangeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    //get all authors
    getAllAuthors: function() {
        return _authors;
    },
    //get suthor by id
    getAuthorById: function(id) {
        return _.find(_authors, {id: id});
    }

});

Dispatcher.register(function(action){
    switch(action.actionType) {
        case ActionTypes.CREATE_AUTHOR:
        _authors.push(action.author);
        //any React component registered will be notified
        AuthorStore.emitChange();
    }
});

module.exports = AuthorStore;