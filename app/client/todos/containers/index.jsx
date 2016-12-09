import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Todos from 'client/todos/components';
import { todoActions } from 'client/todos/store';

const TodosContainer = props => (
  <div className="todos-container">
    <Todos state={props.state}
           updateTodos={props.updateTodos}
           deleteTodo={props.deleteTodo}
           toggleTodo={props.toggleTodo} />
  </div>
);

TodosContainer.propTypes = {
  state: PropTypes.object.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  updateTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default connect(
  state => ({ state: state.todoReducer }),
  dispatch => ({
    toggleTodo: payload => dispatch(todoActions.toggleTodo(payload)),
    updateTodos: payload => dispatch(todoActions.updateTodos(payload)),
    deleteTodo: payload => dispatch(todoActions.deleteTodo(payload)),
  }))(TodosContainer);
