import { useState, useEffect } from 'react';

const useAudioRecorder = () => {
  const [audioURL, setAudioURL] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          setRecorder(mediaRecorder);

          const audioChunks = [];
          mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
          };

          mediaRecorder.start();
        })
        .catch(err => {
          setError(err);
          setIsRecording(false);
        });
    } else if (recorder) {
      recorder.stop();
      setRecorder(null);
    }
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return { audioURL, isRecording, startRecording, stopRecording, error };
};

export default useAudioRecorder;
