import React from "react";
import YouTube from "react-youtube";

export default class VideoPlayer extends React.Component {
  
  onReady = (event) => {
    console.log("READY", event.target);
  }

  // const stateChange = (event) => {
  //   console.log("State changed",props.id, event.target.getPlayerState())
  // } 

  onError = () => {
    console.log("ERROR");
  }

  opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    }
  }

  render() {
    return (
      <YouTube
        videoId={this.props.id}
        opts={opts}
        onReady={onReady}
        onError={onError}
        onStateChange={this.props.stateChange}
      />
    )
  } 
}