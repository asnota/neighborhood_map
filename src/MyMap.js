import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
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

  render(){

    const markers = this.props.venues.map((venue, i) => {
      const marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        }
      }
      return <Marker key={venue.id} {...marker} onClick={this.onMarkerClick} title={venue.name}/>
    })


    return(
      <Map
        google = {this.props.google}
        center = {this.props.center}
        zoom = {17}
        >
        {markers}

        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingWindow}>{this.props.venues.name}</InfoWindow>
        <ListItems venues={this.props.venues}/>
        <Search />
      </Map>
    )
  }
}



export default GoogleApiWrapper({
  apiKey: 'AIzaSyB1ijS6t6OKocfsfAdu9Nuawo1NfwzJLHQ'
})(MyMap)
