import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

export default function MessageBubble({ role, content, isStreaming }) {
  const isUser = role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18 }}
      className={`flex w-full mb-5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[78%] rounded-3xl px-5 py-3.5 shadow-xs transition-colors ${
          isUser
            ? 'bg-[var(--color-primary)] text-white rounded-br-xs'
            : 'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-bl-xs'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed text-sm font-medium">{content}</p>
        ) : (
          <div className={`prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed ${isStreaming ? 'streaming-cursor' : ''}`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="mb-2.5 last:mb-0">{children}</p>,
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
          </div>
        )}
      </div>
    </motion.div>
  );
}
