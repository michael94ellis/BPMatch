import React from "react";
import Switch from "react-switch"; 

const UserInput = (props) => {
  return (
    <>
    <form className="input-field" onSubmit={props.handleSubmit}>
      <label className="active" htmlFor="first_name2">
        Search
        <input
          value={props.results}
          id="userSearch"
          type="text"
          className="validate"
          onChange={props.handleChange}
        />
      </label> 
      <input type="submit" value="Submit" />
    </form>
    Switch Audio
    <Switch onChange={props.switchAudio} checked={props.audioSwitched} />
    </>
  );
};

export default UserInput;
