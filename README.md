# Neighborhoods Map App

## Table of Contents

* [Prerequisites](#prerequisites)
* [Goals](#goals)
* [Instructions](#instructions)
* [Contributing](#contributing)
* [Deployment](#deployment)
* [Authors](#authors)
* [License](#license)


## Prerequisites

This is an example application, which is build using third parties API support from Google Maps and Foursquare. The application should be accessible on any device with the Internet connection.

## Goals

The application helps the user to find a concert hall in the center of Québec, providing with the additional information of the selected concert hall, supported by Foursquare API.

## Instructions

User opens the application and looks for the concert hall in the search bar on the top of the application screen. The filter results are displayed just after the filter set, displaying a list of concert halls and corresponding markers on the map. Clicking on the map marker opens an info window, with the address of the venue; the selected marker bounces.

In order to install the application, please download a zip or clone it via Git and store it to your local directory. Open git and run "npm start" (npm package should be installed on the machine), which will open the page in the web browser and will listed to the localhost: 3000, where the app will be displayed.

In order to run the application in production mode, rum the following commands in your Git bash console:
npm run build
serve -s build

## Contributing

This repository accepts pull requests.

## Deployment

The project is built with pure JavaScript. No dependencies were used.

## Authors

The initial commit belongs to Udacity scholars, provided as a template to the sixth project in the framework of Front-End Nanodegree program at Udacity learning platform.

## License

This project is licensed under the MIT License.
