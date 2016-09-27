import React, { Component, PropTypes } from 'react';
import GoogleMap from 'google-map-react';
import MyGreatPlace from './MyGreatPlace';
import Cache from './util/Cache';

export default class Map extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    markers: PropTypes.array,
    onListItem: PropTypes.func
  };

  static defaultProps = {
    center: [19.3885, -99.140222],
    zoom: 12,
    markers: [{
      lat: 19.3885,
      lng: -99.140222
    }]
  };

  render() {
    return (
      <div style={divStyle}>
        <GoogleMap
          bootstrapURLKeys={{key: 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={this.props.onListItem} >
          {this.props.markers.map((m, i) =>
            <MyGreatPlace key={`${i}`} lat={m.lat} lng={m.lng} text={`${i+1}`} />)}
        </GoogleMap>
      </div>
    );
  }
}

var divStyle = {
  margin: 0,
  height: 600,
  width: '100%'
};
