/**
 * Header
 */

var React = require('react');
var CheckpointActions = require('../actions/CheckpointActions');
var CheckpointTextInput = require('./CheckpointTextInput.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>Checkpoints</h1>
        <CheckpointTextInput
          id="new-checkpoint"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    );
  },

  /**
   * Event handler called within CheckpointTextInput.
   * Defining this here allows CheckpointTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      CheckpointActions.create(text);
    }

  }

});

module.exports = Header;
