import React, { Component } from 'react';
import ListItem from './ListItem';

export default class FavoriteList extends Component {
  constructor(props) {
    super(props);
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
              <ListItem
                key={store}
                store={store}
                index={i}
                onItemDeleted={this.onItemDeleted}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

{/* <li key={store}>
  <span>{store}</span>
  <img
    src="../assets/delete.png"
    data-index={i}
    style={{height: 28, width: 28}}
    onClick={this.onItemDeleted}/>
</li> */}
