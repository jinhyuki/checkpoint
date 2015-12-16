/*
 * Checkpoint store test
 */

jest.dontMock('../../constants/CheckpointConstants');
jest.dontMock('../CheckpointStore');
jest.dontMock('object-assign');

describe('CheckpointStore', function() {

  var CheckpointConstants = require('../../constants/CheckpointConstants');
  var AppDispatcher;
  var CheckpointStore;
  var callback;

  // mock actions
  var actionCheckpointCreate = {
    actionType: CheckpointConstants.CHECKPOINT_CREATE,
    text: 'foo'
  };
  var actionCheckpointDestroy = {
    actionType: CheckpointConstants.CHECKPOINT_DESTROY,
    id: 'replace me in test'
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    CheckpointStore = require('../CheckpointStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with no to-do items', function() {
    var all = CheckpointStore.getAll();
    expect(all).toEqual({});
  });

  it('creates a to-do item', function() {
    callback(actionCheckpointCreate);
    var all = CheckpointStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    expect(all[keys[0]].text).toEqual('foo');
  });

  it('destroys a to-do item', function() {
    callback(actionCheckpointCreate);
    var all = CheckpointStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    actionCheckpointDestroy.id = keys[0];
    callback(actionCheckpointDestroy);
    expect(all[keys[0]]).toBeUndefined();
  });

  it('can determine whether all to-do items are complete', function() {
    var i = 0;
    for (; i < 3; i++) {
      callback(actionCheckpointCreate);
    }
    expect(Object.keys(CheckpointStore.getAll()).length).toBe(3);
    expect(CheckpointStore.areAllComplete()).toBe(false);

    var all = CheckpointStore.getAll();
    for (key in all) {
      callback({
        actionType: CheckpointConstants.CHECKPOINT_COMPLETE,
        id: key
      });
    }
    expect(CheckpointStore.areAllComplete()).toBe(true);

    callback({
      actionType: CheckpointConstants.CHECKPOINT_UNDO_COMPLETE,
      id: key
    });
    expect(CheckpointStore.areAllComplete()).toBe(false);
  });

});
