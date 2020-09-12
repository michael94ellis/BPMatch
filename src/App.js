import React, { useEffect, useState } from "react";
import UserInput from "./components/UserInput";
import VideoPlayer from "./components/videoPlayer";
import Switch from "react-switch";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap"
import API from "./utils/API";

const App = () => {
  const [search, setSearch] = useState("");
  const [audioID, setAudioID] = useState();
  const [videoID, setVideoID] = useState();

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(search)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lookup the Song searched on GetSongBPM.com
    API.bpmLookup(search).then((res) => {
      // console.log("SONG 1 title!!:  ", res.data.search[0]);

      // Lookup The Music Video from IMVDB
      API.musicVideoSearch(
        res.data.search[0].artist.name,
        res.data.search[0].title
      ).then((res) => {
        // console.log("MUSIC VIDEO RESULTS!!", res);
        API.musicVideoSource(res.data.results[0].id).then((res) => {
          // console.log("**MUSIC VIDEO SOURCE", res.data.sources[0].source_data);
          setAudioID(res.data.sources[0].source_data);
        });
      });

      // Lookup 
      API.bpmResults(res.data.search[0].id).then((res) => {
        console.log(res.data);
        API.bpmMatch(res.data.song.tempo).then((res) => {
          let i = Math.floor(Math.random() * res.data.tempo.length);
          // console.log("SONG 2: ", res.data.tempo[i]);
          if (typeof res.data.tempo[i] === 'undefined') {
            console.log("No Matches Found!");
          } else {
            API.musicVideoSearch(
              res.data.tempo[i].artist.name,
              res.data.tempo[i].song_title
            ).then((res) => {
              // console.log("MUSIC VIDEO RESULTS!!", res);
              API.musicVideoSource(res.data.results[0].id).then((res) => {
                // console.log(
                //   "**MUSIC VIDEO SOURCE",
                //   res.data.sources[0].source_data
                // );
                setVideoID(res.data.sources[0].source_data);
              });
            });
          }
        });
      });
    });
  };


  const [audioRef, setAudioRef] = useState(null);
  const [videoRef, setvideoRef] = useState(null);

  let audioSwitched = false;
  const switchVideoAudio = () => {
    audioSwitched = !audioSwitched;
    if (audioRef != null && videoRef != null) {
      if (audioSwitched) {
        audioRef.unMute();
        videoRef.mute();
      } else {
        videoRef.unMute();
        audioRef.mute();
      }
    }
  }

  const audioStateChange = (event) => {
    console.log("State changed", event.target.getPlayerState());
    if (event.target.getPlayerState() === 5) {
      setAudioRef(event.target);
      console.log("Audio Ref Set")
    }
  };

  const videoStateChange = (event) => {
    console.log("State changed", event.target.getPlayerState());
    if (event.target.getPlayerState() === 5) {
      setvideoRef(event.target);
      console.log("Video Ref Set")
    }
  };

  useEffect(() => {
    console.log("Audio Ready: " + (audioRef == null) + ", Video Ready: " + (videoRef == null));
    if (audioRef != null && videoRef != null) {
      console.log("Beginning videos");
      videoRef.playVideo();
      audioRef.playVideo();
      switchVideoAudio();
    }
  });

  const videoPlayer = <VideoPlayer id={videoID} stateChange={videoStateChange} opts={{
    height: "180",
    width: "50%",
    playerVars: { autoplay: 0 }
  }} />
  const audioPlayer = <VideoPlayer id={audioID} stateChange={audioStateChange} opts={{
    height: "360",
    width: "100%",
    playerVars: { autoplay: 0 }
  }} />

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <UserInput
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              results={search}
            />
            {audioPlayer}
          </Col>
          <Col>
            Switch Audio
            <Switch onChange={switchVideoAudio} checked={audioSwitched} />
            {videoPlayer}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
