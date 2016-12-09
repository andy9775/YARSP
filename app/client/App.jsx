import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

const App = props => (
  <Provider store={props.store}>
    <Router {...props.renderProps} />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired, // redux state
  renderProps: PropTypes.object.isRequired, // react-router props
};

export default App;
