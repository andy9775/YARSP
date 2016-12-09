import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ListItem from 'client/todos/components/ListItem';
import ListInput from 'client/todos/components/ListInput';

class Todos extends Component {

  // ============================== class methods ==============================
  // =============================== Helpers ===================================
  /**
   * Return the data object matching the requests id
   *
   * @method getDataById
   * @param {ReduxState}          store - redux state object
   * @param {Number}                 id - list item id
   */
  static getDataById(store, id) {
    return _.clone(store.filter(entry => entry.id === id).get(0));
  }


  // ===========================================================================

  constructor(props) {
    super(props);

    this.onListItemClick = this.onListItemClick.bind(this);
    this.onListItemDelete = this.onListItemDelete.bind(this);
  }

  // ============================= event handlers ==============================

  /**
   * Called when a todo list item is clicked.
   *
   * Toggles whether or not a todo item is marked as complete
   *
   * @param {number}        id - todo item id of the clicked item
   */
  onListItemClick(id) {
    const todoItem = Todos.getDataById(this.props.state, id);
    axios.put('/api/v1/todos', todoItem)
      .then((response) => {
        const data = response.data;
        if (data.status === 200) {
          this.props.toggleTodo(data.data);
        } else {
          // couldn't update the resource; display error message
          console.error(`couldn't update the resource ${todoItem}`);
        }
      });
  }

  /**
   * called when the the delete button is clicked
   *
   * @param {number}        id - todo item id of the clicked item
   */
  onListItemDelete(id) {
    const todoItem = Todos.getDataById(this.props.state, id);
    axios.delete('api/v1/todos', { data: todoItem })
      .then((response) => {
        this.props.deleteTodo(response.data.data);
      });
  }

  // ================================ render ===================================
  render() {
    return (
      <div className="todos-wrapper">
        {this.props.state.map(
           (data, index) => <ListItem key={`listItem${data.id}`}
                                      listNumber={index}
                                      displayName={data.content}
                                      done={data.done}
                                      onClickListItem={this.onListItemClick}
                                      onClickDelete={this.onListItemDelete}
                                      entryId={data.id} />
         )}
        <ListInput updateTodos={this.props.updateTodos} />
      </div>
      );
  }
}

Todos.propTypes = {
  state: PropTypes.object.isRequired, // Immutable List of todos
  toggleTodo: PropTypes.func.isRequired, // call to modify the todo store
  deleteTodo: PropTypes.func.isRequired, // called to delete a todo item
  updateTodos: PropTypes.func.isRequired, // add a new todo
};

export default Todos;
