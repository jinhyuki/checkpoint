/**
 * Controller-View 
 * Communicates with the store
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var CheckpointStore = require('../stores/CheckpointStore');

/**
 * Retrieve the current CHECKPOINT data from the CheckpointStore
 */
function getCheckpointState() {
  return {
    allCheckpoints: CheckpointStore.getAll(),
    areAllComplete: CheckpointStore.areAllComplete()
  };
}

var CheckpointApp = React.createClass({

  getInitialState: function() {
    return getCheckpointState();
  },

  componentDidMount: function() {
    CheckpointStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CheckpointStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allCheckpoints={this.state.allCheckpoints}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allCheckpoints={this.state.allCheckpoints} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the CheckpointStore
   */
  _onChange: function() {
    this.setState(getCheckpointState());
  }

});

module.exports = CheckpointApp;
