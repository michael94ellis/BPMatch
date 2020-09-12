import React from "react";
import YouTube from "react-youtube";

export default class VideoPlayer extends React.Component {

  onReady(event) {
    console.log("READY", event.target);
  }

  stateChange = (event) => {
    console.log("State changed", this.props.id, event.target.getPlayerState());
  } 

  onError() {
    console.log("ERROR");
  }
  
  render() {
    return ( 
      <YouTube
        videoId={this.props.id}
        opts={this.props.opts} 
        onReady={this.onReady}
        onError={this.onError}
        onStateChange={this.props.stateChange}
      />
    )
  } 
}