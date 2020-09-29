import React from "react";
import YouTube from "react-youtube";

export default class VideoPlayer extends React.Component {
  render() {
    return ( 
      <YouTube
        videoId={this.props.id}
        opts={this.props.opts} 
        // onReady={this.onReady}
        // onError={this.onError}
        onStateChange={this.props.stateChange}
      />
    )
  }
}