import { Settings, ExternalLink, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif text-[var(--color-text)]">Settings</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Application configuration, theme info & about</p>
      </div>

      <div className="bg-[var(--color-surface)] rounded-3xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center">
          <Settings className="w-5 h-5 text-[var(--color-primary)] mr-3" />
          <h3 className="font-semibold font-serif text-lg text-[var(--color-text)]">App Information</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2.5 border-b border-[var(--color-border)]/60">
            <span className="text-[var(--color-text-muted)] text-sm">Version</span>
            <span className="font-semibold text-[var(--color-text)] text-sm">v3.1 (Cozy Kitchen Edition)</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[var(--color-border)]/60">
            <span className="text-[var(--color-text-muted)] text-sm">API Gateway</span>
            <span className="font-medium text-[var(--color-text)] text-xs bg-[var(--color-surface-alt)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
              {import.meta.env.VITE_API_URL || '/api'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-surface)] rounded-3xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
        <div className="p-6 border-b border-[var(--color-border)] flex items-center">
          <Shield className="w-5 h-5 text-[var(--color-primary)] mr-3" />
          <h3 className="font-semibold font-serif text-lg text-[var(--color-text)]">About SMARTAI Kitchen</h3>
        </div>
        <div className="p-6 text-sm text-[var(--color-text-muted)] leading-relaxed space-y-4">
          <p>
            SMARTAI Refrigerator is an intelligent kitchen inventory and recipe assistant designed to eliminate food waste and bring warmth into home cooking.
          </p>
          <p>
            By tracking your fresh stock and expiry dates, the AI crafts customized recipes using ingredients you already have, actively prioritizing what expires soonest.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <a href="https://github.com/Ryusaaa/smart-ai-refrigerator-frontend.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[var(--color-primary)] hover:underline font-medium">
              Frontend Repository <ExternalLink className="w-4 h-4 ml-1.5" />
            </a>
            <a href="https://github.com/Ryusaaa/smart-ai-refrigerator-backend.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[var(--color-primary)] hover:underline font-medium">
              Backend Repository <ExternalLink className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
