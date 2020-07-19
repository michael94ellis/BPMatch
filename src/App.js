import React, { useState, useEffect } from "react";
import UserInput from "./components/UserInput";
import VideoPlayer from "./components/videoPlayer";
import "./App.css";
import API from "./utils/API";

const App = () => {
  const [audioID, setAudioID] = useState();
  const [search, setSearch] = useState();
  const [videoID, setVideoID] = useState();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.bpmLookup(search)
      .then((res) => {
        console.log("SONG 1!!", res.data.search[0].title);
        console.log("SONG 1!!", res.data.search[0].artist.name);
        
        API.musicVideoSearch(res.data.search[0].artist.name, res.data.search[0].title).then((res) => {
          console.log("MUSIC VIDEO RESULTS!!", res);
          API.musicVideoSource(res.data.results[0].id).then((res) => {
            console.log(
              "**MUSIC VIDEO SOURCE",
              res.data.sources[0].source_data
            );
            setAudioID(res.data.sources[0].source_data);
          });
        });

        API.bpmResults(res.data.search[0].id).then((res) => {
          API.bpmMatch(res.data.song.tempo).then((res) => {
            console.log("~~~~~~~~~~~~~~", res.data.tempo[0].song_title);
            console.log("***********", res.data.tempo[0].artist.name);
            
            API.musicVideoSearch(res.data.tempo[0].artist.name, res.data.tempo[0].song_title).then((res) => {
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
      })

      
      
  };

  return (
    <div className="App">
      <UserInput
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        results={search}
      />
      <VideoPlayer id={audioID} />
      <VideoPlayer id={videoID} />
      
    </div>
  );
};

export default App;
