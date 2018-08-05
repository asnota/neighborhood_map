import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onMouseoverMarker(props, marker, e) {
  // ..
  }

  fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
    // ...
  }

  render() {
      return (
        <Map
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        >

          <Marker
            title={'Fancy place'}
            name={'Fancy place'}
            position={{lat: 37.768519, lng: -122.415640}}
            onMouseover={this.onMouseoverMarker}
            onClick={this.onMarkerClick}
          />
          <Marker
            title={'SOMA'}
            name={'SOMA'}
            position={{lat: 37.778519, lng: -122.405640}}
            onMouseover={this.onMouseoverMarker}
            onClick={this.onMarkerClick}
          />
          <Marker
            title={'Dolores park'}
            name={'Dolores park'}
            position={{lat: 37.759703, lng: -122.428093}}
            onMouseover={this.onMouseoverMarker}
            onClick={this.onMarkerClick}
          />


          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      );
    }


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB1ijS6t6OKocfsfAdu9Nuawo1NfwzJLHQ'
})(App)
