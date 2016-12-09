/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
/* eslint react/jsx-filename-extension: 0*/
import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
import ListItem from 'client/todos/components/ListItem';

chai.use(sinonchai);

describe('Test <ListItem />', () => {
  it('Should contain done class when done', () => {
    // invoke
    const listItem = shallow(<ListItem done />);

    // assert
    expect(listItem.find('.todos-list-item-container-done'))
      .to.have.length(1);
  });

  it('Should contain even class when even list number', () => {
    // invoke
    const listItem = shallow(<ListItem listNumber={2} />);

    // assert
    expect(listItem.find('.todos-list-item-container-even'))
      .to.have.length(1);
  });

  it('Should contain odd class when odd list number', () => {
    // invoke
    const listItem = shallow(<ListItem listNumber={3} />);

    // assert
    expect(listItem.find('.todos-list-item-container-odd'))
      .to.have.length(1);
  });

  it('Should invoke the delete callback when delete is clicked', () => {
    // setup
    const callback = sinon.spy();
    const entryId = 4;
    // invoke
    const listItem = shallow(<ListItem onClickDelete={callback}
                                       entryId={entryId} />);
    listItem.find('.todos-list-item-delete').simulate('click');

    // assert
    expect(callback).to.be.calledWith(entryId);
  });

  it('Should invoke the list callback when list item is clicked', () => {
    // setup
    const callback = sinon.spy();
    const entryId = 4;
    // invoke
    const listItem = shallow(<ListItem onClickListItem={callback}
                                       entryId={entryId} />);
    listItem.find('.todos-list-item-container').simulate('click');

    // assert
    expect(callback).to.be.calledWith(entryId);
  });

  it('Should display the todo item', () => {
    // setup
    const display = 'buy food';

    // invoke
    const listItem = shallow(<ListItem displayName={display} />);
    const button = listItem.find('.todos-list-item-container');

    // assert
    expect(button.node.props.children).to.equal(display);
  });
});
