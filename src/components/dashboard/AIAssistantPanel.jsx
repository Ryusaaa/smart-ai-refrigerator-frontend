// client/src/components/dashboard/AIAssistantPanel.jsx
// Quick-access panel to the AI chat, mirroring the reference dashboard's
// right-hand assistant widget. Selecting a suggestion jumps to /chat and
// pre-fills the message via ChatContext so the conversation continues there
// (this panel intentionally doesn't duplicate the streaming chat UI).
import { Bot, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';

const SUGGESTIONS = [
  "What's in my fridge?",
  'Suggest a healthy meal',
  'How long can I store this?',
  'Find recipes for today',
];

export default function AIAssistantPanel() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const { sendMessage } = useChat();

  const handleAsk = (text) => {
    const question = text ?? value;
    if (!question.trim()) return;
    sendMessage(question);
    setValue('');
    navigate('/chat');
  };

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors flex flex-col">
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex items-center space-x-2.5">
        <div
          className="w-8 h-8 rounded-xl text-white flex items-center justify-center shadow-sm"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Bot className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">AI Assistant</h3>
      </div>

      <div className="p-4.5 flex flex-col gap-3.5 flex-1">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
            placeholder="e.g. What can I cook with chicken and broccoli?"
            className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-primary)] transition-colors"
          />
          <button
            type="button"
            onClick={() => handleAsk()}
            aria-label="Send"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white hover:opacity-90 transition-opacity cursor-pointer"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)] mb-2">Quick Suggestions</p>
          <div className="space-y-1.5">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => handleAsk(s)}
                className="w-full text-left text-xs text-[var(--color-text)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)] px-3 py-2 rounded-xl border border-[var(--color-border)]/50 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
