import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import VideoPlayer from './components/videoPlayer'
import './App.css';
import API from './utils/API'

function App() {
  
  useEffect(()=>{
    API.bpmResults().then(res=>{
      console.log(res.data.tempo[0])
      console.log(res.data.tempo[1])
    })
  },[])

  return (
    <div className="App">
      <VideoPlayer/>
    </div>
  );
}

export default App;
