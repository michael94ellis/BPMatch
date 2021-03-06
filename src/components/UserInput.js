import React from "react";
import { Container, Row, Col } from "react-bootstrap"
import BPMLogo from "./../BPMLogo.png";

const UserInput = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <form onSubmit={props.handleSubmit}>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <input type="button" value="Play/Pause" className='player-control' onClick={props.playVideoAndAudio} disabled={props.playbackDisabled} />
        </Col>
        <Col>
          <input type="button" value="Switch Audio" className='player-control' onClick={props.switchVideoAudio} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserInput;
