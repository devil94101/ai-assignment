import React, { useState, useRef } from 'react';
import { FaMicrophone, FaStop, FaPlay } from 'react-icons/fa';

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        console.log(e)
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    // Stop recording
    // Save the audioBlob
    setRecording(false);
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current?.setAttribute('src', audioUrl);
      audioRef.current?.play();
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? <FaStop /> : <FaMicrophone />}
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioBlob && (
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={playAudio}
          >
            <FaPlay /> Play Recorded Audio
          </button>
          <audio ref={audioRef} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
