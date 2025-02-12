import React, { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const Listenbar = (props) => {
  const [loading, setLoading] = useState(false);
  const [teacheraudio, setTeacheraudio] = useState(null);

  useEffect(() => {
    if (props.audioURL) {
      setLoading(true);
      setTeacheraudio(new Audio(props.audioURL));
    }
    setLoading(false);
  }, [props]);

  const audioStop = () => {
    teacheraudio.pause();
    teacheraudio.currentTime = 0;
    return;
  };

  const audioPlay = () => {
    if (teacheraudio) {
      teacheraudio.play();
    }
    return;
  };

  return (
    <div
      className="px-3 py-2 border-bottom mb-3"
      style={{
        backgroundColor: "#F57C00 ",
      }}
    >
      <div className="container d-flex">
        <div className="ms-auto">
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            <fieldset>
              <img
                src="/images/volume.png"
                className="img-fluid me-3"
                style={{
                  height: 23,
                }}
              ></img>
              <ButtonGroup>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  defaultValue="stop"
                >
                  <ToggleButton
                    id="listen"
                    variant="outline-success"
                    value="play"
                    onClick={() => audioPlay()}
                  >
                    Listen
                  </ToggleButton>
                  <ToggleButton
                    id="pause"
                    variant="outline-secondary"
                    value="pause"
                    onClick={teacheraudio && teacheraudio.pause()}
                  >
                    Pause
                  </ToggleButton>
                  <ToggleButton
                    id="stop"
                    variant="outline-danger"
                    value="stop"
                    onClick={() => audioStop()}
                  >
                    Stop
                  </ToggleButton>
                </ToggleButtonGroup>
              </ButtonGroup>
            </fieldset>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listenbar;
