import React, { PropTypes, Component } from 'react';
import axios from 'axios';

class ListInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onKeyPress(event) {
    const key = event.key;
    if (key === 'Enter') {
      axios.post('/api/v1/todos', { content: this.state.value })
        .then((response) => {
          if (response.status === 200) {
            this.props.updateTodos(response.data.data);
          } else {
            // alert user
            console.error('Error inserting new todo');
          }
          this.setState({ value: '' });
        });
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="todo-list-item-input-container">
        <input type="text"
               value={this.state.value}
               onKeyPress={this.onKeyPress}
               onChange={this.onChange}
               className="todo-list-item-input"
               placeholder="Todo..." />
      </div>
      );
  }
}

ListInput.propTypes = {
  updateTodos: PropTypes.func.isRequired,
};

export default ListInput;
