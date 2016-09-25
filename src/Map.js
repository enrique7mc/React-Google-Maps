import React, { Component, PropTypes } from 'react';
import GoogleMap from 'google-map-react';
import Geocoder from './api/Geocoder';
import Stores from '../store_directory';
import MyGreatPlace from './MyGreatPlace';
import Cache from './util/Cache';


/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class Map extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [19.3885, -99.140222],
    zoom: 11
  };

  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        lat: 19.3885,
        lng: -99.140222
      }]
    }
  }

  componentDidMount() {
    Stores.slice(0, 2).map(store => {
      return [Geocoder.getLocationFromAddress(store.Address), store];
    }).forEach(([promise, store]) => {
      promise.then(value => {
        store.location = value;
        if (!Cache.get(store.Address)) {
          Cache.set(store.Address, store);
        }
        let markers = this.state.markers;
        this.setState({markers: markers.concat(value)});
      }, reason => {
        console.log(reason)
      });
    });
  }

  render() {
    return (
      <div style={divStyle}>
        <GoogleMap
          bootstrapURLKeys={{key: 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={(e)=>{console.log(e)}} >
          {this.state.markers.map((m, i) =>
            <MyGreatPlace key={`marker${i}`} lat={m.lat} lng={m.lng} text={`${i+1}`} />)}
        </GoogleMap>
      </div>
    );
  }
}

var divStyle = {
  border: 'black',
  borderWidth: 2,
  borderStyle: 'solid',
  height: 600,
  width: 800
};
