import React, { useRef } from 'react';
import { Sparkles, User, Database, BrainCircuit, PenTool, Loader2 } from 'lucide-react';
import { gsap, useGSAP } from '../../lib/gsap';
import TextType from '../common/TextType';
import RecipeSuggestionCard from './RecipeSuggestionCard';

export default function MessageBubble({
  role,
  content,
  isStreaming,
  statusMessage,
  recipeSuggestion,
}) {
  const isUser = role === 'user';
  const bubbleRef = useRef(null);

  // Entrance animation for bubble
  useGSAP(() => {
    if (!bubbleRef.current) return;
    gsap.from(bubbleRef.current, {
      opacity: 0,
      y: 10,
      scale: 0.98,
      duration: 0.25,
      ease: 'power2.out',
    });
  }, { scope: bubbleRef });

  // Determine active step based on statusMessage
  const isCheckingStock = !statusMessage || statusMessage.toLowerCase().includes('stok') || statusMessage.toLowerCase().includes('kulkas');
  const isBuildingContext = statusMessage && (statusMessage.toLowerCase().includes('konteks') || statusMessage.toLowerCase().includes('resep') || statusMessage.toLowerCase().includes('analisis'));
  const isWritingAnswer = statusMessage && (statusMessage.toLowerCase().includes('tulis') || statusMessage.toLowerCase().includes('jawab') || statusMessage.toLowerCase().includes('berpikir'));

  return (
    <div
      ref={bubbleRef}
      className={`flex w-full mb-5 items-start space-x-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div
          className="w-8 h-8 rounded-xl text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1 relative"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Sparkles className="w-4 h-4" />
          {isStreaming && !content && (
            <span
              className="absolute inset-0 rounded-xl opacity-40 animate-ping"
              style={{ background: 'var(--gradient-primary)' }}
            />
          )}
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[78%] rounded-3xl px-5 py-3.5 shadow-sm transition-all ${
          isUser
            ? 'text-white rounded-br-sm'
            : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-bl-sm'
        }`}
        style={isUser ? { background: 'var(--gradient-primary)' } : {}}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed text-sm font-medium">{content}</p>
        ) : !content && isStreaming ? (
          /* ── Combination Loading State in Bubble Chat ── */
          <div className="py-1 space-y-3 min-w-[240px] sm:min-w-[300px]">
            {/* Status Headline with glowing pulse */}
            <div className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] relative" />
              </div>
              <span
                className="text-sm font-semibold tracking-wide bg-[var(--gradient-text)] bg-clip-text text-transparent animate-pulse"
                style={{ backgroundSize: '200% 100%' }}
              >
                {statusMessage || 'AI sedang menyiapkan...'}
              </span>
              <div className="flex space-x-1 items-center ml-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>

            {/* Dynamic Step Progression Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {/* Step 1: Cek Stok */}
              <div
                className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
                  isCheckingStock
                    ? 'bg-[var(--color-primary)]/15 border-[var(--color-primary)]/50 text-[var(--color-primary)] shadow-xs'
                    : 'bg-[var(--color-surface-alt)] border-[var(--color-border)]/60 text-[var(--color-text-muted)] opacity-60'
                }`}
              >
                <Database className={`w-3 h-3 ${isCheckingStock ? 'animate-pulse text-[var(--color-primary)]' : ''}`} />
                <span>Cek Stok Kulkas</span>
              </div>

              {/* Step 2: Susun Konteks */}
              <div
                className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
                  isBuildingContext
                    ? 'bg-[var(--color-primary)]/15 border-[var(--color-primary)]/50 text-[var(--color-primary)] shadow-xs'
                    : 'bg-[var(--color-surface-alt)] border-[var(--color-border)]/60 text-[var(--color-text-muted)] opacity-60'
                }`}
              >
                <BrainCircuit className={`w-3 h-3 ${isBuildingContext ? 'animate-pulse text-[var(--color-primary)]' : ''}`} />
                <span>Susun Konteks Resep</span>
              </div>

              {/* Step 3: Tulis Jawaban */}
              <div
                className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
                  isWritingAnswer
                    ? 'bg-[var(--color-primary)]/15 border-[var(--color-primary)]/50 text-[var(--color-primary)] shadow-xs'
                    : 'bg-[var(--color-surface-alt)] border-[var(--color-border)]/60 text-[var(--color-text-muted)] opacity-60'
                }`}
              >
                <PenTool className={`w-3 h-3 ${isWritingAnswer ? 'animate-pulse text-[var(--color-primary)]' : ''}`} />
                <span>Tulis Jawaban</span>
              </div>
            </div>

            {/* Subtle progress shimmer line */}
            <div className="w-full h-1 bg-[var(--color-surface-alt)] rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full animate-pulse"
                style={{
                  background: 'var(--gradient-primary)',
                  width: isCheckingStock ? '40%' : isBuildingContext ? '75%' : '95%',
                  transition: 'width 0.5s ease-in-out',
                }}
              />
            </div>
          </div>
        ) : (
          /* ── React Bits TextType Typing Stream ── */
          <div>
            <TextType content={content || ''} isStreaming={isStreaming} />
            {recipeSuggestion && <RecipeSuggestionCard recipe={recipeSuggestion} />}
          </div>
        )}
      </div>

      {isUser && (
        <div
          className="w-8 h-8 rounded-xl text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
