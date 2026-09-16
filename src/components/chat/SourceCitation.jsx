import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

export default function SourceCitation({ sources = [] }) {
  if (!sources || !Array.isArray(sources) || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-xs">
      <div className="flex items-center space-x-1.5 text-[var(--color-text-muted)] font-semibold mb-2">
        <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
        <span>Referensi Resep & Inspirasi:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {sources.map((src, idx) => {
          let hostname = '';
          try {
            hostname = new URL(src.url).hostname.replace(/^www\./, '');
          } catch (e) {
            hostname = 'link';
          }

          return (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[var(--color-surface-alt)] hover:bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium border border-[var(--color-border)]/60 transition-colors shadow-2xs"
              title={src.note || src.title}
            >
              <span>{src.title || hostname}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
