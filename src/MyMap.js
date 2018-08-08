import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ListItems from './ListItems'

export class MyMap extends React.Component {
    constructor() {
      super();
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},

      }
      this.onMarkerClick = this.onMarkerClick.bind(this);
    }


  onMarkerClick = (props, marker, e) => {
    this.setState(
      {
      venues: this.props.venues,
      activeMarker: marker,
      showingInfoWindow: true
      }
    );
  }

  onListItemClick = (marker) => {
    this.setState(
      {
        venues: this.props.venues,
        activeMarker: marker,
        showingWindow: true
      }
    );
  }


  render(){

    const markers = this.props.venues.map((venue, i) => {
      const marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        },
        animation: window.google.maps.Animation.DROP
      }
      return <Marker key={venue.id} {...marker} onClick={this.onMarkerClick} title={venue.name} address={venue.location.address}/>

    })


    return(
      <Map
        google = {this.props.google}
        center = {this.props.center}
        zoom = {13}
        onClick={this.onMapClick}
        >
        {markers}

        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.activeMarker.title}</h3>
            <h4>{this.state.activeMarker.address}</h4>
          </div>
        </InfoWindow>
        <ListItems venues={this.props.venues} marker={this.state.activeMarker} onListItemClick={this.onListItemClick}/>

      </Map>
    )
  }
}



export default GoogleApiWrapper({
  apiKey: 'AIzaSyB1ijS6t6OKocfsfAdu9Nuawo1NfwzJLHQ'
})(MyMap)
