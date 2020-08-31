import React, { useState, useEffect, useRef } from "react";
import UserInput from "./components/UserInput";
import VideoPlayer from "./components/videoPlayer";
import "./App.css";
import API from "./utils/API";

const App = () => {
  const [audioID, setAudioID] = useState();
  const [search, setSearch] = useState("");
  const [videoID, setVideoID] = useState();
  const [ready, setReady] = useState(0);
  const audioRef = useRef();
  const videoRef = useRef();

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(search)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.bpmLookup(search).then((res) => {
      console.log("SONG 1 title!!:  ", res.data.search[0]);

      API.musicVideoSearch(
        res.data.search[0].artist.name,
        res.data.search[0].title
      ).then((res) => {
        console.log("MUSIC VIDEO RESULTS!!", res);
        API.musicVideoSource(res.data.results[0].id).then((res) => {
          console.log("**MUSIC VIDEO SOURCE", res.data.sources[0].source_data);
          setAudioID(res.data.sources[0].source_data);
        });
      });

      API.bpmResults(res.data.search[0].id).then((res) => {
        API.bpmMatch(res.data.song.tempo).then((res) => {
          let i = Math.floor(Math.random() * res.data.tempo.length);
          console.log("SONG 2: ", res.data.tempo[i]);

          API.musicVideoSearch(
            res.data.tempo[i].artist.name,
            res.data.tempo[i].song_title
          ).then((res) => {
            console.log("MUSIC VIDEO RESULTS!!", res);
            API.musicVideoSource(res.data.results[0].id).then((res) => {
              console.log(
                "**MUSIC VIDEO SOURCE",
                res.data.sources[0].source_data
              );
              setVideoID(res.data.sources[0].source_data);
            });
          });
        });
      });
    });
  };

  const stateChange = (event) => {
    console.log("State changed", event.target.getPlayerState());
    console.log(audioRef);
    if (event.target.getPlayerState() === 5) {
      setReady(ready+1)
      console.log("TEST", ready);
      if (ready === 2) {
        event.target.playVideo();
      }
    }
  };

  return (
    <div className="App">
      <UserInput
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        results={search}
      />
      <VideoPlayer id={audioID} stateChange={stateChange} ref={audioRef} />
      <VideoPlayer id={videoID} stateChange={stateChange} />
    </div>
  );
};

export default App;
