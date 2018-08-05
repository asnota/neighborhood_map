import React, { Component } from "react";

class ListItems extends Component {

  render(){

    const list = this.props.venues.map((venue, i) => {
      return (
        <li key={i}>{venue.name}</li>
      )

    })

    return(
      <div>
      <ol className="theList">
        {list}
      </ol>
      </div>

    );
  }

};

export default ListItems
