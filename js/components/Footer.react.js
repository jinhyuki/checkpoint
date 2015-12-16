/**
 * Footer
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var CheckpointActions = require('../actions/CheckpointActions');

var Footer = React.createClass({

  propTypes: {
    allCheckpoints: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var allCheckpoints = this.props.allCheckpoints;
    var total = Object.keys(allCheckpoints).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allCheckpoints) {
      if (allCheckpoints[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

    return (
      <footer id="footer">
        <span id="checkpoint-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  },

  /**
   * Event handler to delete all completed Checkpoints
   */
  _onClearCompletedClick: function() {
    CheckpointActions.destroyCompleted();
  }

});

module.exports = Footer;
