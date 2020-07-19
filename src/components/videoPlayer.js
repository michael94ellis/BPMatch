import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = (props) =>{
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    }
    return <YouTube videoId= {props.id}opts={opts}/>
}

export default VideoPlayer;