/*
 * Checkpoint store
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CheckpointConstants = require('../constants/CheckpointConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _checkpoints = {};

/**
 * Create a CHECKPOINT item.
 * @param  {string} text The content of the CHECKPOINT
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _checkpoints[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a CHECKPOINT item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _checkpoints[id] = assign({}, _checkpoints[id], updates);
}

/**
 * Update all of the CHECKPOINT items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _checkpoints) {
    update(id, updates);
  }
}

/**
 * Delete a CHECKPOINT item.
 * @param  {string} id
 */
function destroy(id) {
  delete _checkpoints[id];
}

/**
 * Delete all the completed CHECKPOINT items.
 */
function destroyCompleted() {
  for (var id in _checkpoints) {
    if (_checkpoints[id].complete) {
      destroy(id);
    }
  }
}

var CheckpointStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining CHECKPOINT items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _checkpoints) {
      if (!_checkpoints[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of CHECKPOINTs.
   * @return {object}
   */
  getAll: function() {
    return _checkpoints;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case CheckpointConstants.CHECKPOINT_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        CheckpointStore.emitChange();
      }
      break;

    case CheckpointConstants.CHECKPOINT_TOGGLE_COMPLETE_ALL:
      if (CheckpointStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      CheckpointStore.emitChange();
      break;

    case CheckpointConstants.CHECKPOINT_UNDO_COMPLETE:
      update(action.id, {complete: false});
      CheckpointStore.emitChange();
      break;

    case CheckpointConstants.CHECKPOINT_COMPLETE:
      update(action.id, {complete: true});
      CheckpointStore.emitChange();
      break;

    case CheckpointConstants.CHECKPOINT_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        CheckpointStore.emitChange();
      }
      break;

    case CheckpointConstants.CHECKPOINT_DESTROY:
      destroy(action.id);
      CheckpointStore.emitChange();
      break;

    case CheckpointConstants.CHECKPOINT_DESTROY_COMPLETED:
      destroyCompleted();
      CheckpointStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = CheckpointStore;
