import React, { Component } from "react";

class ListItems extends Component {

  constructor(props) {
    super(props);
  }

  render(){

    return(

      <ul className="theList">
        <li>{this.props.selectedPlace.title}</li>
      </ul>

    );
  }

};

export default ListItems
