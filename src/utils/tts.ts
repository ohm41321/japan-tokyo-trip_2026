"use client";

/**
 * Text-to-Speech utility for Japanese pronunciation.
 * Works across Chrome, Safari (iOS), and Edge.
 * Handles the async voice loading quirk in Chromium browsers.
 */

let _voicesLoaded = false;
let _loadPromise: Promise<SpeechSynthesisVoice[]> | null = null;

/**
 * Get available voices, loading them if needed.
 */
export function getVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }

  const synth = window.speechSynthesis;

  // Already have voices
  const voices = synth.getVoices();
  if (voices.length > 0) {
    _voicesLoaded = true;
    return Promise.resolve(voices);
  }

  // Loading in progress
  if (_loadPromise) return _loadPromise;

  // Start loading
  _loadPromise = new Promise<SpeechSynthesisVoice[]>((resolve) => {
    // Some browsers fire voiceschanged, some never do. Set a timeout fallback.
    const timeout = setTimeout(() => {
      _voicesLoaded = true;
      resolve(synth.getVoices());
    }, 2000);

    synth.addEventListener(
      'voiceschanged',
      () => {
        clearTimeout(timeout);
        _voicesLoaded = true;
        resolve(synth.getVoices());
      },
      { once: true }
    );

    // Force trigger voice load
    synth.getVoices();
  });

  return _loadPromise;
}

/**
 * Speak Japanese text aloud.
 * @param text - Japanese text to speak
 * @param rate - Speech rate (default 0.75, slower = clearer for learners)
 */
export async function speakJapanese(text: string, rate = 0.75): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported');
    return;
  }

  const synth = window.speechSynthesis;

  // Cancel any currently speaking utterance
  synth.cancel();

  // Small delay after cancel to let the engine reset
  await new Promise((r) => setTimeout(r, 50));

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to find a Japanese voice — prefer female voices (clearer for learners)
  try {
    const voices = await getVoices();

    // Priority order: female voices first (clearer, more natural for Japanese)
    const femaleKeywords = ['haruka', 'mizuki', 'kyoko', 'female', 'otoko', 'sayaka', 'hikari'];
    const maleKeywords = ['ichiro', 'kenji', 'otoko', 'taro', 'male', 'daiki'];

    let selectedVoice: SpeechSynthesisVoice | null = null;

    // 1st: Try to find a known female Japanese voice
    for (const keyword of femaleKeywords) {
      selectedVoice = voices.find(
        (v) =>
          (v.lang === 'ja-JP' || v.lang.startsWith('ja')) &&
          v.name.toLowerCase().includes(keyword)
      ) ?? null;
      if (selectedVoice) {
        console.log('🔊 Using female JP voice:', selectedVoice.name, selectedVoice.lang);
        break;
      }
    }

    // 2nd: Any Japanese voice (system default on iOS/Android is usually female)
    if (!selectedVoice) {
      selectedVoice = voices.find(
        (v) => v.lang === 'ja-JP' || v.lang.startsWith('ja')
      ) ?? null;
      if (selectedVoice) {
        console.log('🔊 Using JP voice:', selectedVoice.name, selectedVoice.lang);
      }
    }

    // 3rd: No Japanese voice — warn user
    if (!selectedVoice) {
      console.warn('⚠️ No Japanese voice found. Available:', voices.map(v => `${v.name} (${v.lang})`).join(', '));
      console.info('💡 iOS/Android: Japanese voice should be available by default.');
      console.info('💡 Windows: Settings → Time & Language → Speech → Add voices → Japanese');
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  } catch (err) {
    console.warn('⚠️ Could not load voices:', err);
  }

  // On iOS Safari, we need to resume the speech synthesis if it's in a paused state
  if (synth.paused) {
    synth.resume();
  }

  synth.speak(utterance);
  console.log('🔊 Speaking:', text);
}

/**
 * Check if SpeechSynthesis is supported.
 */
export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
