import React, { useState, useEffect } from "react";
import UserInput from "./components/UserInput";
import VideoPlayer from "./components/videoPlayer";
import "./App.css";
import API from "./utils/API";

const App = () => {
  const [sourceID, setSourceID] = useState();
  const [search, setSearch] = useState();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.bpmLookup(search)
      .then((res) => {
        console.log("SONG 1!!", res.data.search[0].id);
        API.bpmResults(res.data.search[0].id).then((res) => {
          console.log("***********",res.data.song.tempo)
        });
      })

      .then(() => {
        API.musicVideoSearch(search).then((res) => {
          console.log("MUSIC VIDEO RESULTS!!", res.data.results[0]);
          API.musicVideoSource(res.data.results[0].id).then((res) => {
            console.log(
              "**MUSIC VIDEO SOURCE",
              res.data.sources[0].source_data
            );
            setSourceID(res.data.sources[0].source_data);
          });
        });
      });
  };

  return (
    <div className="App">
      <VideoPlayer id={sourceID} />
      <UserInput
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        results={search}
      />
    </div>
  );
};

export default App;
