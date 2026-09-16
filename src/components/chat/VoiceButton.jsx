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
      <button disabled className="p-1.5 text-[var(--color-text-muted)]/30 cursor-not-allowed" aria-label="Microphone not supported">
        <Mic className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleRecording}
      type="button"
      aria-label={isRecording ? 'Stop recording voice' : 'Start recording voice'}
      className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
        isRecording
          ? 'bg-[var(--color-danger-soft)] text-[var(--color-danger)] animate-pulse border border-[var(--color-danger)]/30'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]'
      }`}
    >
      <Mic className="w-5 h-5" />
    </button>
  );
}
