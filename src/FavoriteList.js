import React, { Component } from 'react';

export default class FavoriteList extends Component {
  constructor() {
    super();
    this.onItemDeleted = this.onItemDeleted.bind(this);
  }

  onItemDeleted(e) {
    e.preventDefault();
    this.props.onItemDeleted(e.target.dataset.index);
  }

  render() {
    return (
      <div>
        <h2>Favorite Stores</h2>
        <ul>
          {
            this.props.items.map((store, i) =>
              <li key={store}>
                <span>{store}</span>
                <img
                  src="../assets/delete.png"
                  data-index={i}
                  style={{height: 28, width: 28}}
                  onClick={this.onItemDeleted}/>
              </li>)
          }
        </ul>
      </div>
    );
  }
}
