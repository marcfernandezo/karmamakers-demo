/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const CONSENT_KEY = 'digitalnord_cookie_consent';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as StoredConsent) : null;
  } catch {
    return null;
  }
}

function storeConsent(prefs: ConsentPreferences): StoredConsent {
  const consent: StoredConsent = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  return consent;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

interface CheckboxRowProps {
  preferences: ConsentPreferences;
  onChange: (key: keyof ConsentPreferences, value: boolean) => void;
}

function CheckboxRow({ preferences, onChange }: CheckboxRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 bg-gray-50 rounded-lg px-4 py-3 w-fit">
      {/* Necessary — always on, non-interactive */}
      <label className="flex items-center gap-2 cursor-not-allowed select-none">
        <input
          type="checkbox"
          checked
          disabled
          aria-label="Necessary cookies (always active)"
          className="w-4 h-4 rounded accent-gray-400"
          readOnly
        />
        <span className="text-sm font-medium text-gray-400">Necessary</span>
      </label>

      {/* Analytics */}
      <label className="flex items-center gap-2 cursor-pointer select-none group">
        <input
          type="checkbox"
          checked={preferences.analytics}
          onChange={(e) => onChange('analytics', e.target.checked)}
          aria-label="Analytics cookies"
          className="w-4 h-4 rounded cursor-pointer accent-gray-900"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          Analytics
        </span>
      </label>

      {/* Marketing */}
      <label className="flex items-center gap-2 cursor-pointer select-none group">
        <input
          type="checkbox"
          checked={preferences.marketing}
          onChange={(e) => onChange('marketing', e.target.checked)}
          aria-label="Marketing cookies"
          className="w-4 h-4 rounded cursor-pointer accent-gray-900"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          Marketing
        </span>
      </label>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false); // drives slide-in animation
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Only show if no consent has been recorded yet
    if (!getStoredConsent()) {
      setVisible(true);
      // Tiny delay so the CSS transition plays on first render
      requestAnimationFrame(() => setMounted(true));
    }
  }, []);

  const dismiss = (prefs: ConsentPreferences) => {
    storeConsent(prefs);
    setMounted(false);
    // Wait for the slide-out transition before unmounting
    setTimeout(() => setVisible(false), 300);
  };

  const handleAcceptAll = () =>
    dismiss({ analytics: true, marketing: true });

  const handleAcceptSelected = () =>
    dismiss(preferences);

  const handleRejectAll = () =>
    dismiss({ analytics: false, marketing: false });

  const handlePreferenceChange = (key: keyof ConsentPreferences, value: boolean) =>
    setPreferences((prev) => ({ ...prev, [key]: value }));

  if (!visible) return null;

  return (
    <>
      {/* Backdrop blur — subtle, doesn't block content */}
      <div
        aria-hidden="true"
        className={`
          fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px]
          transition-opacity duration-300
          ${mounted ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Banner */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie preferences"
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white border-t border-gray-200 shadow-2xl shadow-black/10
          transition-transform duration-300 ease-out
          ${mounted ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* ── Left: Copy + checkboxes ─────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-950 mb-1.5 tracking-tight">
                Privacy Settings
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-4">
                This site uses third-party tracking technologies to provide and continually
                improve our services, and to display advertisements according to users&apos;
                interests. You may revoke or change your consent at any time with effect for
                the future.
              </p>

              <CheckboxRow
                preferences={preferences}
                onChange={handlePreferenceChange}
              />
            </div>

            {/* ── Right: Actions + branding ────────────────────────────────── */}
            <div className="flex flex-col items-start lg:items-end justify-between gap-4 lg:min-w-[200px] shrink-0">

              {/* Primary CTA */}
              <button
                onClick={handleAcceptAll}
                className="
                  inline-flex items-center gap-2
                  bg-gray-950 text-white text-sm font-semibold
                  px-5 py-2.5 rounded-lg w-full lg:w-auto justify-center
                  hover:bg-gray-800 active:scale-[0.98]
                  transition-all duration-150
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950
                "
              >
                Accept All
                <CheckIcon />
              </button>

              {/* Secondary CTAs */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAcceptSelected}
                  className="
                    text-sm font-semibold text-gray-700
                    hover:text-gray-950 transition-colors duration-150
                    underline-offset-2 hover:underline
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 rounded
                  "
                >
                  Accept Selected
                </button>

                <span className="text-gray-300 text-sm" aria-hidden="true">|</span>

                <button
                  onClick={handleRejectAll}
                  className="
                    text-sm font-semibold text-gray-700
                    hover:text-gray-950 transition-colors duration-150
                    underline-offset-2 hover:underline
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 rounded
                  "
                >
                  Reject All
                </button>
              </div>

              {/* Attribution */}
              <p className="text-[11px] text-gray-400 tracking-wider uppercase mt-1 pt-10">
                Powered by{' '}
                <a href='https://digitalnord.es' className="font-bold text-gray-600 not-italic normal-case tracking-normal">
                  Digitalnord
                </a>
                .
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}