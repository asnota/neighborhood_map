import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Search from './Search'
import ListItems from './ListItems'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: [{
        "id": "1",
        "name": "1st Place",
        "title": "1st Place title"
      },
      {
        "id": "2",
        "name": "2nd Place",
        "title": "2nd Place title"
      },
      {
        "id": "3",
        "name": "3rd Place",
        "title": "3rd Place title"
      }]
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  componentDidMount(){
    if (this.marker) {
      this.marker.setMap();
    }
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
   //..
  }

  /*fetchPlaces(mapProps, map) {
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map);
  } */

  render() {
      return (
        <Map
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        >

          <Marker
            title= {this.state.selectedPlace.title}
            name={this.state.selectedPlace.name}
            position={{lat: 37.768519, lng: -122.415640}}
            onMouseover={this.onMouseoverMarker}
            onClick={this.onMarkerClick}
          />
          <Marker
            title={this.state.selectedPlace.title}
            name={this.state.selectedPlace.name}
            position={{lat: 37.778519, lng: -122.405640}}
            onMouseover={this.onMouseoverMarker}
            onClick={this.onMarkerClick}
          />
          <Marker
            title={this.state.selectedPlace.title}
            name={this.state.selectedPlace.name}
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
          <ListItems selectedPlace={this.state.selectedPlace}/>
          <Search />

        </Map>

      );
    }


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB1ijS6t6OKocfsfAdu9Nuawo1NfwzJLHQ'
})(App)
