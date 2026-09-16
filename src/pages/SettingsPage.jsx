import { Settings, ExternalLink, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Application configuration and info</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center">
          <Settings className="w-5 h-5 text-gray-400 mr-3" />
          <h3 className="font-semibold text-gray-900">App Information</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600 text-sm">Version</span>
            <span className="font-medium text-gray-900 text-sm">0.1.0-beta</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600 text-sm">API Endpoint</span>
            <span className="font-medium text-gray-900 text-sm bg-gray-100 px-2 py-1 rounded">
              {import.meta.env.VITE_API_URL || '/api'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center">
          <Shield className="w-5 h-5 text-gray-400 mr-3" />
          <h3 className="font-semibold text-gray-900">About SMARTAI</h3>
        </div>
        <div className="p-6 text-sm text-gray-600 leading-relaxed space-y-4">
          <p>
            SMARTAI Refrigerator is an intelligent inventory management system designed to reduce food waste and inspire creativity in the kitchen.
          </p>
          <p>
            By tracking your ingredients and their expiration dates, the AI can generate custom recipes using exactly what you have available, prioritizing items that are about to expire.
          </p>
          <div className="pt-4 flex gap-4">
            <a href="https://github.com/Ryusaaa/smart-ai-refrigerator-frontend.git" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View Frontend Source <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
