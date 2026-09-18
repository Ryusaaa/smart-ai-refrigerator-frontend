import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, User, Database, BrainCircuit, PenTool, RefreshCw } from 'lucide-react';
import { gsap, useGSAP } from '../../lib/gsap';
import TextType from '../common/TextType';
import RecipeSuggestionCard from './RecipeSuggestionCard';

const PHASE_PHRASES = {
  stock: [
    'Mengecek stok kulkas...',
    'Melihat bahan yang tersedia...',
    'Menyortir bahan yang masih segar...',
  ],
  context: [
    'Menyusun konteks percakapan...',
    'Menganalisis riwayat obrolan...',
    'Menghubungkan dengan preferensi kamu...',
  ],
  retry: [
    'Server AI sedang sibuk, mencoba lagi...',
    'Menunggu model merespons...',
    'Mohon tunggu, sedang mencoba ulang...',
  ],
  recipe: [
    'Menyiapkan visual resep...',
    'Mencari gambar yang cocok...',
  ],
  writing: [
    'AI sedang menyusun jawaban...',
    'Meracik saran terbaik untukmu...',
    'Merangkai kata demi kata...',
  ],
  default: [
    'AI sedang berpikir...',
    'Menyiapkan jawaban terbaik...',
    'Sebentar lagi selesai...',
  ],
};

const ROTATE_INTERVAL_MS = 2200;

function detectPhase(statusMessage) {
  if (!statusMessage) return 'default';
  const s = statusMessage.toLowerCase();
  if (s.includes('sibuk') || s.includes('coba lagi') || s.includes('mencoba')) return 'retry';
  if (s.includes('stok') || s.includes('kulkas')) return 'stock';
  if (s.includes('konteks') || s.includes('riwayat')) return 'context';
  if (s.includes('visual') || s.includes('gambar')) return 'recipe';
  if (s.includes('tulis') || s.includes('jawab') || s.includes('berpikir')) return 'writing';
  return 'default';
}

function useRotatingStatusText(statusMessage) {
  const phase = detectPhase(statusMessage);
  const phrases = PHASE_PHRASES[phase] || PHASE_PHRASES.default;
  const indexRef = useRef(0);
  const [display, setDisplay] = useState(statusMessage || phrases[0]);

  useEffect(() => {
    indexRef.current = 0;
    setDisplay(statusMessage || phrases[0]);
  }, [statusMessage, phase]);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % phrases.length;
      setDisplay(phrases[indexRef.current]);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [phase]);

  return { display, phase };
}

export default function MessageBubble({
  role,
  content,
  isStreaming,
  statusMessage,
  recipeSuggestion,
}) {
  const isUser = role === 'user';
  const bubbleRef = useRef(null);
  const statusTextRef = useRef(null);

  const { display: rotatingStatus, phase } = useRotatingStatusText(statusMessage);

  useEffect(() => {
    if (!statusTextRef.current) return;
    gsap.fromTo(
      statusTextRef.current,
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
    );
  }, [rotatingStatus]);

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

  const isCheckingStock = phase === 'stock';
  const isBuildingContext = phase === 'context';
  const isRetrying = phase === 'retry';
  const isWritingAnswer = phase === 'writing' || phase === 'default';

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
          <div className="py-1 space-y-3 min-w-[240px] sm:min-w-[300px]">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center flex-shrink-0">
                <span
                  className={`w-2.5 h-2.5 rounded-full absolute animate-ping ${
                    isRetrying ? 'bg-amber-500' : 'bg-[var(--color-primary)]'
                  }`}
                />
                <span
                  className={`w-2.5 h-2.5 rounded-full relative ${
                    isRetrying ? 'bg-amber-500' : 'bg-[var(--color-primary)]'
                  }`}
                />
              </div>
              <span
                ref={statusTextRef}
                className="text-sm font-semibold tracking-wide bg-[var(--gradient-text)] bg-clip-text text-transparent"
              >
                {rotatingStatus}
              </span>
              <div className="flex space-x-1 items-center ml-auto flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
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

              {isRetrying && (
                <div className="text-[10px] px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 transition-all bg-amber-500/15 border-amber-500/50 text-amber-600 dark:text-amber-400 shadow-xs">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Mencoba Ulang</span>
                </div>
              )}
            </div>
          </div>
        ) : (
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