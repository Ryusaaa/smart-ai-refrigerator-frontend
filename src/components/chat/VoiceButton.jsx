import { useState, useCallback } from 'react';
import { Mic } from 'lucide-react';

export default function VoiceButton({ onTranscript }) {
  const [isRecording, setIsRecording] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const toggleRecording = useCallback(() => {
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    if (isRecording) {
      // It handles auto-stop or we could keep a ref to recognition to stop it
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };
    recognition.onerror = () => setIsRecording(false);

    try {
      recognition.start();
    } catch (e) {
      setIsRecording(false);
    }
  }, [isRecording, SpeechRecognition, onTranscript]);

  if (!SpeechRecognition) {
    return (
      <button disabled className="p-1.5 text-gray-300 cursor-not-allowed">
        <Mic className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleRecording}
      type="button"
      className={`p-1.5 rounded-full transition-colors ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}
    >
      <Mic className="w-5 h-5" />
    </button>
  );
}
