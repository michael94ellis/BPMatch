import React, { useEffect, useState } from "react";
import UserInput from "./components/UserInput";
import VideoPlayer from "./components/videoPlayer";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap"
import API from "./utils/API";

const App = () => {
  const [search, setSearch] = useState("");
  const [audioID, setAudioID] = useState("");
  const [videoID, setVideoID] = useState("");
  const [audioRef, setAudioRef] = useState(null);
  const [videoRef, setVideoRef] = useState(null);
  const [playbackDisabled, setPlaybackDisabled] = useState(true);

  let audioSwitched = false;

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(search);
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

  const switchVideoAudio = () => {
    audioSwitched = !audioSwitched;
    if (audioRef != null && videoRef != null) {
      handleMuting();
    }
  }

  const handleMuting = () => {
    if (audioSwitched) {
      audioRef.unMute();
      videoRef.mute();
    } else {
      videoRef.unMute();
      audioRef.mute();
    }
  }

  const audioStateChange = (event) => {
    console.log("Audio State changed", event.target.getPlayerState());
    // Playing
    if (event.target.getPlayerState() === 1) {
      videoRef.playVideo();
    }
    // Pause
    if (event.target.getPlayerState() === 2) {
      videoRef.pauseVideo();
    }
    // Buffering
    if (event.target.getPlayerState() === 3) {
      videoRef.seekTo(audioRef.getCurrentTime(), true);
      // audioRef.pauseVideo();
      // console.log(event.target.getCurrentTime())
      // audioRef.playVideoAt(event.target.getCurrentTime());
    }
    // Loaded
    if (event.target.getPlayerState() === 5) {
      setAudioRef(event.target);
    }
  };

  const videoStateChange = (event) => {
    console.log("Video State changed", event.target.getPlayerState());
    // Playing
    if (event.target.getPlayerState() === 1) {
      audioRef.playVideo();
    }
    // Pause
    if (event.target.getPlayerState() === 2) {
      audioRef.pauseVideo();
    }
    // Buffering
    if (event.target.getPlayerState() === 3) {
      audioRef.seekTo(videoRef.getCurrentTime(), true);
      // videoRef.pauseVideo();
      // console.log(event.target.getCurrentTime())
      // videoRef.playVideoAt(event.target.getCurrentTime());
    }
    // Loaded
    if (event.target.getPlayerState() === 5) {
      setVideoRef(event.target);
    }
  };

  const handlePlayback = () => {
    if (audioRef == null && audioID != null && videoRef == null && videoID != null) {
      setVideoID("KQ6zr6kCPj8");
      setAudioID("UV1MTZVQYoE");
    }
    if (audioRef != null && videoRef != null) {
      setPlaybackDisabled(false);
    }
  }

  useEffect(() => {
    console.log("Audio Ready: " + (audioRef != null) + ", Video Ready: " + (videoRef != null));
    handlePlayback();
  });

  let isPlayingMedia = false
  function playAudioAndVideo() {
    if (audioRef != null && videoRef != null) {
      console.log("Beginning videos");
      if (isPlayingMedia) {
        videoRef.pauseVideo();
        audioRef.pauseVideo();
      } else {
        handleMuting();
        videoRef.playVideo();
        audioRef.playVideo();
      }
      isPlayingMedia = !isPlayingMedia
    }
  }

  const videoPlayer = <VideoPlayer
    id={videoID}
    opts={{
      height: "360",
      width: "100%",
      playerVars: { autoplay: 0 }
    }}
    stateChange={videoStateChange}
  />
  const audioPlayer = <VideoPlayer
    id={audioID}
    opts={{
      height: "360",
      width: "100%",
      playerVars: { autoplay: 0 }
    }}
    stateChange={audioStateChange}
  />


  return (
    <div>
      <Container>
        <Row>
          <Col>
            <UserInput
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              playVideoAndAudio={playAudioAndVideo}
              results={search}
              playbackDisabled={playbackDisabled}
              switchVideoAudio={switchVideoAudio}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {audioPlayer}
          </Col>
          <Col>
            {videoPlayer}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

