import React, { Component } from 'react';

export default class FavoriteList extends Component {
  constructor() {
    super();
    // this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onItemDeleted(e) {
    e.preventDefault();

  }
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(store => <li key={store}>{store}</li>)}
        </ul>
      </div>
    );
  }
}
