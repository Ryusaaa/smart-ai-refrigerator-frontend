// client/src/components/dashboard/AIAssistantPanel.jsx
// AI Assistant card matching the reference dashboard photo
import React, { useState } from 'react';
import { Bot, ArrowRight, Sparkles, Utensils, Clock, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';

const SUGGESTIONS = [
  { text: "What's in my fridge?", icon: Sparkles },
  { text: 'Suggest a healthy meal', icon: Utensils },
  { text: 'How long can I store this?', icon: Clock },
  { text: 'Find recipes for today', icon: HelpCircle },
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
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors flex flex-col justify-between">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center space-x-3">
        <div
          className="w-10 h-10 rounded-2xl text-white flex items-center justify-center shadow-sm flex-shrink-0"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">
            AI Assistant
          </h3>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            Ask anything about your food, recipes, or storage.
          </p>
        </div>
      </div>

      {/* Input Field with Blue Circle Button */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="e.g. What can I cook with chicken and broccoli?"
            className="w-full pl-4 pr-11 py-2.5 text-xs bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          />
          <button
            type="button"
            onClick={() => handleAsk()}
            aria-label="Send query"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)] mb-2 px-1">
            Quick Suggestions
          </p>
          <div className="space-y-1.5">
            {SUGGESTIONS.map(({ text, icon: Icon }) => (
              <button
                key={text}
                type="button"
                onClick={() => handleAsk(text)}
                className="w-full flex items-center justify-between text-left text-xs font-medium text-[var(--color-text)] bg-[var(--color-surface-alt)]/60 hover:bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)]/40 px-3 py-2.5 rounded-xl border border-[var(--color-border)]/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Icon className="w-3.5 h-3.5 text-[var(--color-primary)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{text}</span>
                </div>
                <ArrowRight className="w-3 h-3 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
