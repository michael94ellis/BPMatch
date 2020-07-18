import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import VideoPlayer from "./components/videoPlayer";
import "./App.css";
import API from "./utils/API";

function App() {
  let sourceID;

  useEffect(() => {
    API.bpmResults()
      .then((res) => {
        console.log("SONG 1!!", res.data.tempo[0]);
        console.log("SONG 2!!", res.data.tempo[1]);
      })
      .then(() => {
        API.musicVideoSearch().then((res) => {
          console.log("MUSIC VIDEO RESULTS!!", res.data.results[0]);
          API.musicVideoSource(res.data.results[0].id)
            .then((res) => {
              console.log(
                "**MUSIC VIDEO SOURCE",
                res.data.sources[0].source_data
              );
              sourceID = res.data.sources[0].source_data;
            })
        });
      });
  }, []);

  return (
    <div className="App">
      <VideoPlayer/>
    </div>
  );
}

export default App;
