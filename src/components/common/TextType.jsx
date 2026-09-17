// client/src/components/common/TextType.jsx
// React Bits inspired TextType / Typewriter reveal animation component
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import StreamingCursor from '../chat/StreamingCursor';

export default function TextType({
  content = '',
  isStreaming = false,
  speed = 15,
  onComplete,
  className = '',
}) {
  const [displayedLength, setDisplayedLength] = useState(content.length);
  const animFrameRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());

  // Smooth typewriter reveal when content changes or during stream
  useEffect(() => {
    if (!isStreaming) {
      setDisplayedLength(content.length);
      if (onComplete) onComplete();
      return;
    }

    // When streaming, smoothly catch up to the content length
    const tick = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current >= speed) {
        setDisplayedLength((prev) => {
          if (prev < content.length) {
            // Reveal 1-3 characters at a time for natural typewriter cadence
            const step = Math.min(3, content.length - prev);
            return prev + step;
          }
          return prev;
        });
        lastUpdateRef.current = now;
      }

      if (displayedLength < content.length || isStreaming) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [content, isStreaming, speed, displayedLength, onComplete]);

  // Keep displayedLength within bounds
  const currentText = isStreaming
    ? content.slice(0, Math.max(displayedLength, Math.min(content.length, 10)))
    : content;

  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed ${className}`}>
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
          code: ({ children }) => (
            <code className="bg-[var(--color-surface-alt)] px-1.5 py-0.5 rounded text-xs text-[var(--color-primary)] font-mono">
              {children}
            </code>
          ),
          hr: () => <hr className="my-3 border-[var(--color-border)]" />,
        }}
      >
        {currentText || ''}
      </ReactMarkdown>
      {isStreaming && <StreamingCursor />}
    </div>
  );
}
