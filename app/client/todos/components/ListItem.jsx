import React, { PropTypes, Component } from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.onClickListItem = this.onClickListItem.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  // ========================== event handlers =================================
  /**
   * handle clicking the list item
   */
  onClickListItem() {
    this.props.onClickListItem(this.props.entryId);
  }

  /**
   * Handle clicking the list item delete button
   */
  onClickDelete() {
    this.props.onClickDelete(this.props.entryId);
  }

  // ============================ render =======================================
  render() {
    const doneClassName = this.props.done ?
      ' todos-list-item-container-done' : '';
    const colorClassName = (this.props.listNumber % 2) === 0 ?
      'todos-list-item-container-even' :
      'todos-list-item-container-odd';
    const className = 'todos-list-item-container ' +
      `${doneClassName} ${colorClassName}`;

    return (
      <div>
        <button className={className}
                onClick={this.onClickListItem}>
          {this.props.displayName}
        </button>
        <button onClick={this.onClickDelete}
                className="todos-list-item-delete">
          X
        </button>
      </div>
      );
  }
}

ListItem.propTypes = {
  done: PropTypes.bool,
  displayName: PropTypes.string,
  entryId: PropTypes.number.isRequired,
  onClickListItem: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  listNumber: PropTypes.number.isRequired,
};

ListItem.defaultProps = { done: false };

export default ListItem;
