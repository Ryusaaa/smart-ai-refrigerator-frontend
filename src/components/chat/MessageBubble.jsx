import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles, User } from 'lucide-react';
import { gsap, useGSAP } from '../../lib/gsap';
import StreamingCursor from './StreamingCursor';
import RecipeSuggestionCard from './RecipeSuggestionCard';

export default function MessageBubble({ role, content, isStreaming, recipeSuggestion }) {
  const isUser = role === 'user';
  const bubbleRef = useRef(null);
  const contentRef = useRef(null);
  const prevContentLengthRef = useRef(0);

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

  // Micro-entrance for new chunks when streaming
  useEffect(() => {
    if (isStreaming && contentRef.current && content) {
      const currentLength = content.length;
      if (currentLength > prevContentLengthRef.current) {
        // Animate last added element in content container
        const lastEl = contentRef.current.lastElementChild || contentRef.current;
        gsap.fromTo(
          lastEl,
          { opacity: 0.8, y: 2 },
          { opacity: 1, y: 0, duration: 0.2, ease: 'power1.out' }
        );
        prevContentLengthRef.current = currentLength;
      }
    } else if (!isStreaming) {
      prevContentLengthRef.current = content?.length || 0;
    }
  }, [content, isStreaming]);

  return (
    <div
      ref={bubbleRef}
      className={`flex w-full mb-5 items-start space-x-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-[var(--gradient-primary)] text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-1">
          <Sparkles className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[78%] rounded-3xl px-5 py-3.5 shadow-xs transition-colors ${
          isUser
            ? 'bg-[var(--gradient-primary)] text-white rounded-br-xs'
            : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-bl-xs'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed text-sm font-medium">{content}</p>
        ) : (
          <div ref={contentRef} className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2.5 last:mb-0 inline">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2.5 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2.5 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-[var(--color-text)]">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold font-serif my-2 text-[var(--color-text)]">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold font-serif my-2 text-[var(--color-text)]">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold font-serif my-1.5 text-[var(--color-text)]">{children}</h3>,
                strong: ({ children }) => <strong className="font-semibold text-[var(--color-primary)]">{children}</strong>,
                code: ({ children }) => <code className="bg-[var(--color-surface-alt)] px-1.5 py-0.5 rounded text-xs text-[var(--color-primary)] font-mono">{children}</code>,
                hr: () => <hr className="my-3 border-[var(--color-border)]" />
              }}
            >
              {content || ''}
            </ReactMarkdown>
            {isStreaming && <StreamingCursor />}
          </div>
        )}
        {!isUser && recipeSuggestion && (
          <RecipeSuggestionCard recipe={recipeSuggestion} />
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
