import React from "react";
import YouTube from "react-youtube";

const VideoPlayer = (props) => {
  
  const onReady = (event) => {
    console.log("READY", event.target);
  };

  // const stateChange = (event)=>{
  //   console.log("State changed",props.id, event.target.getPlayerState())
  // } 

  const onError = () => {
    console.log("ERROR");
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <YouTube
      videoId={props.id}
      opts={opts}
      onReady={onReady}
      onError={onError}
      onStateChange={props.stateChange}
    />
  );
};

export default VideoPlayer;
