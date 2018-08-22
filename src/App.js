import React, { Component } from 'react';
import './App.css';
import MyMap from './MyMap'
import superagent from 'superagent'

export class App extends React.Component {
  constructor() {
    super();
    this.googleError = this.googleError.bind(this);

    this.state = {
      venues: [],
      defaultVenues: [
        { name: "Palais Montcalm",
          location:{address:"995 D'Youville",lat:46.81240512414711,lng:-71.2139403326507}},
        { name: "Le Capitole  (Salle)",
          location:{address:"972, rue Saint-Jean",lat:46.81331725227038,lng:-71.21435986351878}},
        { name: "Theatre Du Capitole De Quebec",
          location:{address:"Place d'Youville",lat:46.813390221577826,lng:-71.21449415203047}},
        { name: "Impérial de Québec",
          location:{address:"252 rue St-Joseph Est",lat:46.81337694176719,lng:-71.22779362944014}},
        { name: "Festival d'été de Quebec - Scène Bell",
            location:{lat:46.80571731516368,lng:-71.21210569263009}}
      ]
    }
  }

//Fetch Foursquare data using superagent
  componentDidMount(){
    const url = 'https://api.foursquare.com/v2/venues/search?v=20180806&ll=46.81228,-71.21454&client_id=W5B33OBMWMISIC0NDNCNS25RHTGUCCCBHKYVMZIQVBNHEXJW&client_secret=GIF3FZKN1JP0MMGCBMDKJCHTVDNHWSRDRIBDEGK2VC3AM1QX&limit=8&categoryId=5032792091d4c4b30a586d5c'

    superagent
      .get(url)
      .query(null)
      .set('Accept', 'text/json')
      .end((error, response) => {

        const venues = response.body.response.venues
        console.log(JSON.stringify(venues))

        this.setState({
            venues: venues
        })

        if (error) {
          const errorContainer = document.querySelector('.theList');
          errorContainer.innerHTML = `
                <div class = "error-container">
                  <h3>Something went wrong while trying to get places!</h2>
                  <div class = "error-message">${error}</div>
                </div>`;
        }
    })
  }


onListItemClick = (props, e) => {
  let myMarkersNodesList = document.querySelectorAll('map area'); // Returns a NodeList
  let myMarkersArray = [...myMarkersNodesList]; // Converts to an Array Object
  let myLiArray = document.getElementsByTagName('li'); //Retunds a HTMLCollection

  if (myLiArray.length !== 0) {
    for(let i = 0; i < myLiArray.length; i++){
        myLiArray[i].addEventListener("click", function(e){
          let foundMarker = myMarkersArray.find(marker => marker.getAttribute('title') === myLiArray[i].getAttribute('name'))
          foundMarker.click();
        });
      }
    }
  }

  // Handle errors from map
	googleError = () => {
		window.gm_authFailure = function () {
			document.querySelector('body').innerHTML = `
				<div class = "error-container">
          <h3>Something went wrong while trying to load the map!</h2>
        </div>`;
		}
	}


  render() {
        const location = {
          lat: 46.81228,
          lng: -71.21454
        }

      return (
          <MyMap center={location} venues={this.state.venues} defaultVenues={this.state.defaultVenues} onListItemClick={this.onListItemClick}/>
      );
    }
}

export default App
