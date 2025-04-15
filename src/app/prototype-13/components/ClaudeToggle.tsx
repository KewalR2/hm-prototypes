'use client';

import { useState } from 'react';

interface ClaudeToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export default function ClaudeToggle({ enabled, onChange }: ClaudeToggleProps) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Claude API (Enabled by Default)
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
        }`}
        onClick={() => onChange(!enabled)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {enabled ? 'AI Powered Responses' : 'Using Sample Data'}
      </span>
    </div>
  );
}