/*
 * Checkpoint constants
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  CHECKPOINT_CREATE: null,
  CHECKPOINT_COMPLETE: null,
  CHECKPOINT_DESTROY: null,
  CHECKPOINT_DESTROY_COMPLETED: null,
  CHECKPOINT_TOGGLE_COMPLETE_ALL: null,
  CHECKPOINT_UNDO_COMPLETE: null,
  CHECKPOINT_UPDATE_TEXT: null
});
