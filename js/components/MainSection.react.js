/**
 * Main section
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var CheckpointActions = require('../actions/CheckpointActions');
var CheckpointItem = require('./CheckpointItem.react');

var MainSection = React.createClass({

  propTypes: {
    allCheckpoints: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are checkpoints.
    if (Object.keys(this.props.allCheckpoints).length < 1) {
      return null;
    }

    var allCheckpoints = this.props.allCheckpoints;
    var checkpoints = [];

    for (var key in allCheckpoints) {
      checkpoints.push(<CheckpointItem key={key} checkpoint={allCheckpoints[key]} />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="checkpoint-list">{checkpoints}</ul>
      </section>
    );
  },

  /**
   * Event handler to mark all checkpoints as complete
   */
  _onToggleCompleteAll: function() {
    CheckpointActions.toggleCompleteAll();
  }

});

module.exports = MainSection;
