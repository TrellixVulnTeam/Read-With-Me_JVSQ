import React, { useState } from "react";
import DropdownTranslate from "./Dropdownbutton";
import { storage, colRef } from "../firebase";
import { addDoc } from "firebase/firestore";
import { VoiceRecorder } from "./VoiceRecorder";

import { Button, Popover, OverlayTrigger, ProgressBar } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Translatebar = (props) => {
  const [progress, setProgress] = useState(0);

  const uploadAudio = async () => {
    VoiceRecorder.saveFile.then((file) => {
      if (!file) return;
      const storageRef = ref(
        storage,
        `/${props.uid}/${props.translateStory.title}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) =>
            console.log(url)
          );
        }
      );
    });
  };

  // const addDoc =
  //   (colRef,
  //   {
  //     uid: props.uid,
  //     title: props.translateStory.title,
  //     story: props.translateStory.body,
  //     author: props.translateStory.author,
  //     audioURL: String(`${props.uid}/${props.translateStory.title}`),
  //   });
  // // .then(function (docRef) {
  // //   return docRef.id;
  // // });

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header>
        <div className="d-flex">
          <Button
            variant="success"
            size="sm"
            className="me-2"
            onClick={VoiceRecorder.voiceRecorderStart}
          >
            Start
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="me-2"
            onClick={VoiceRecorder.voiceRecorderStop}
          >
            Stop
          </Button>
          <Button size="sm" onClick={() => uploadAudio}>
            Save
          </Button>
          <div className="row ms-auto align-items-center">
            <h2 style={{ fontSize: 12 }}>{VoiceRecorder.mediaStatus}</h2>
            <ProgressBar
              striped
              now={progress}
              label={`${progress}% uploaded`}
            />
          </div>
        </div>
      </Popover.Header>
      <Popover.Body>
        <audio
          src={VoiceRecorder.audioBlobURL}
          width={250}
          controls
          autoPlay
          loop
          style={{ width: 250 }}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <div
      className="px-3 py-2 border-bottom mb-3"
      style={{
        backgroundColor: "#D3D3D3",
      }}
    >
      <div className="container d-flex">
        <DropdownTranslate translateStory={props.translateStory} />
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button className="btn btn-light text-dark ms-2">Record</Button>
        </OverlayTrigger>
        <div className="ms-auto">
          <Button
            className="btn btn-light text-dark ms-2"
            onClick={() => addDoc()}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Translatebar;
