import React, { Component } from 'react';
import Cache from './util/Cache';
import Map from './Map';
import FavoriteList from './FavoriteList';
import Stores from '../store_directory';
import Geocoder from './api/Geocoder';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      stores: [],
      favorites: []
    };
    this.onListItem = this.onListItem.bind(this);
    this.onItemDeleted = this.onItemDeleted.bind(this);
  }

  componentDidMount() {
    Stores.slice(0, 20).map(store => {
      return [Geocoder.getLocationFromAddress(store.Address), store];
    }).forEach(([promise, store]) => {
      promise.then(value => {
        store.location = value;
        if (!Cache.get(store.Address)) {
          Cache.set(store.Address, store);
        }
        let markers = this.state.markers;
        let stores = this.state.stores;
        this.setState({markers: markers.concat(value)});
        this.setState({stores: stores.concat(store)});
      }, reason => {
        console.log(reason)
      });
    });
  }

  onListItem(key) {
    const items = this.state.favorites;
    const itemClicked = this.state.stores[parseInt(key)];
    if (itemClicked && !items.includes(itemClicked.Name)) {
      this.setState({ favorites: items.concat(itemClicked.Name) });
    }
  }

  onItemDeleted(key) {
    const items = this.state.favorites;
    const index = parseInt(key);
    if (index >= 0) {
      this.setState({ favorites: items.filter((_, i) => i !== index) });
    }
  }

  render() {
    return (
      <div>
  		  <Map markers={this.state.markers} onListItem={this.onListItem} />
        <FavoriteList items={this.state.favorites} onItemDeleted={this.onItemDeleted}/>
      </div>
    );
  }
}
