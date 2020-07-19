import React from "react";

const UserInput = (props) => {
  return (
    <form className="input-field" onSubmit={props.handleSubmit}>
      <label className="active" for="first_name2">
        Search
        <input
          value={props.results}
          id="userSearch"
          type="text"
          class="validate"
          onChange={props.handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UserInput;
