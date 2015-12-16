/*
 * Checkpoint Actions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CheckpointConstants = require('../constants/CheckpointConstants');

var CheckpointActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: CheckpointConstants.CHECKPOINT_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: CheckpointConstants.CHECKPOINT_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} checkpoint
   */
  toggleComplete: function(checkpoint) {
    var id = checkpoint.id;
    var actionType = checkpoint.complete ?
        CheckpointConstants.CHECKPOINT_UNDO_COMPLETE :
        CheckpointConstants.CHECKPOINT_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: CheckpointConstants.CHECKPOINT_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: CheckpointConstants.CHECKPOINT_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: CheckpointConstants.CHECKPOINT_DESTROY_COMPLETED
    });
  }

};

module.exports = CheckpointActions;
