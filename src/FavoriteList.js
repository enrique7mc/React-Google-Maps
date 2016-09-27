import React, { Component } from 'react';
import ListItem from './ListItem';
import styles from './app.css';

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
      <div className={styles.list}>
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
