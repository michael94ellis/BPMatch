import React from "react";
import BPMLogo from "./../BPMLogo.png";

const UserInput = (props) => {
  return (
    <div className='horizontal-box'>
      <form className="input-field" onSubmit={props.handleSubmit}>
      <img src={BPMLogo} alt='Site Logo' className='bpmlogo bpm-logo-height' />
      <input
          value={props.results}
          id="userSearch"
          type="text"
          className="input-search"
          onChange={props.handleChange}
        />
      <input type="submit" value="Search" className='search-button' />
      </form>
    </div>
  );
};

export default UserInput;
