/**
 * Checkpoint item
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var CheckpointActions = require('../actions/CheckpointActions');
var CheckpointTextInput = require('./CheckpointTextInput.react');

var classNames = require('classnames');

var CheckpointItem = React.createClass({

  propTypes: {
   checkpoint: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var checkpoint = this.props.checkpoint;

    var input;
    if (this.state.isEditing) {
      input =
        <CheckpointTextInput
          className="edit"
          onSave={this._onSave}
          value={checkpoint.text}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={classNames({
          'completed': checkpoint.complete,
          'editing': this.state.isEditing
        })}
        key={checkpoint.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={checkpoint.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {checkpoint.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  },

  _onToggleComplete: function() {
    CheckpointActions.toggleComplete(this.props.checkpoint);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within CheckpointTextInput.
   * Defining this here allows CheckpointTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    CheckpointActions.updateText(this.props.checkpoint.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    CheckpointActions.destroy(this.props.checkpoint.id);
  }

});

module.exports = CheckpointItem;
