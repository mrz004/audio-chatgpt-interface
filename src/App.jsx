import "./App.scss";
import { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import askOpenAI from "./AiConnect";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(
    (_) => {
      if (!browserSupportsSpeechRecognition)
        alert("Browser doesn't support speech recognition.");

      if (!isMicrophoneAvailable) alert("Unable to get Microphone Access!");
    },
    [browserSupportsSpeechRecognition, isMicrophoneAvailable]
  );

  // useEffect(
  //   (_) => {
  //     console.log(`transcript : ${transcript}`);
  //   },
  //   [transcript]
  // );

  const botResp = useRef(null);

  const handleClick = async () => {
    SpeechRecognition.stopListening();
    const response = await askOpenAI(transcript);
    botResp.current.innerText = response;
  };

  return (
    <>
      <div className="main">
        <div data_tag="User" className="user-disp">
          {transcript}
        </div>
        <div data_tag="AI" ref={botResp} className="bot-disp"></div>
        <span>
          <button onClick={SpeechRecognition.startListening}>Talk 🔊</button>
          <button onClick={handleClick}>Send 🚀</button>
        </span>
        <span className="small">{listening ? "lessening..." : ""}</span>
      </div>
    </>
  );
}

export default App;
