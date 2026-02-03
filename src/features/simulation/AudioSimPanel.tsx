import React, { useMemo, useRef, useState, useCallback } from "react";
import { getGrowthDataInterpolated } from "../../data";
import { EvidenceBadge } from "../../components/Evidence";

type Props = {
  /** Current week (0-208) */
  week: number;
};

// Helper to format month for display
function formatMonth(m: number): string {
  if (m < 1) return `${Math.round(m * 4.345)}週`;
  if (m < 12) return `${m.toFixed(1)}ヶ月`;
  const years = Math.floor(m / 12);
  const months = Math.round(m % 12);
  return months > 0 ? `${years}歳${months}ヶ月` : `${years}歳`;
}

function ensureAudioContext(): AudioContext {
  const AnyWindow = window as any;
  const Ctx = window.AudioContext || AnyWindow.webkitAudioContext;
  return new Ctx();
}

export default function AudioSimPanel({ week }: Props) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(0.5);

  // Convert week to month for v0.3 model
  const month = useMemo(() => week / 4.345, [week]);

  // Get comprehensive growth data
  const growthData = useMemo(() => getGrowthDataInterpolated(month), [month]);
  const { hearing } = growthData;
  const ageLabel = formatMonth(month);

  // Calculate audio parameters from hearing data
  const snrDb = hearing.suggestedSNRdB;
  const panningJitter = hearing.panningJitter;
  const localizationErrorDeg = hearing.localizationErrorDeg;

  const play = useCallback(async () => {
    if (!ctxRef.current) ctxRef.current = ensureAudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") await ctx.resume();

    const duration = 1.2;
    const t0 = ctx.currentTime;

    // === Speech-like tone ===
    const speechGain = ctx.createGain();
    const speechPan = ctx.createStereoPanner();

    // Create a more speech-like sound with multiple oscillators
    const fundamentalFreq = 180; // Adult voice fundamental ~180Hz
    const oscillators: OscillatorNode[] = [];

    // Fundamental + harmonics for voice-like quality
    [1, 2, 3, 4, 5].forEach((harmonic, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "sawtooth" : "sine";
      osc.frequency.value = fundamentalFreq * harmonic;

      const harmonicGain = ctx.createGain();
      harmonicGain.gain.value = 0.15 / (harmonic * harmonic); // Decreasing harmonics

      osc.connect(harmonicGain);
      harmonicGain.connect(speechGain);
      oscillators.push(osc);
    });

    // Apply panning jitter based on localization error
    speechPan.pan.value = (Math.random() * 2 - 1) * panningJitter;

    speechGain.connect(speechPan);
    speechPan.connect(ctx.destination);

    // Envelope for speech
    const speechVolume = 0.25;
    speechGain.gain.setValueAtTime(0, t0);
    speechGain.gain.linearRampToValueAtTime(speechVolume, t0 + 0.05);
    speechGain.gain.setValueAtTime(speechVolume, t0 + duration - 0.1);
    speechGain.gain.linearRampToValueAtTime(0, t0 + duration);

    // === Background noise ===
    const noiseGain = ctx.createGain();
    const noiseBuffer = ctx.createBuffer(2, ctx.sampleRate * duration, ctx.sampleRate);

    // Generate pink-ish noise (more natural sounding)
    for (let channel = 0; channel < 2; channel++) {
      const data = noiseBuffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Calculate noise volume based on SNR and user slider
    // Lower SNR = harder to hear speech over noise
    // SNR of 0dB means equal volume, negative means noise louder
    const snrLinear = Math.pow(10, snrDb / 20);
    const noiseVolume = (speechVolume / snrLinear) * noiseLevel;

    noiseGain.gain.setValueAtTime(noiseVolume, t0);
    noiseSource.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Start everything
    oscillators.forEach(osc => {
      osc.start(t0);
      osc.stop(t0 + duration);
    });
    noiseSource.start(t0);
    noiseSource.stop(t0 + duration);

    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), duration * 1000 + 100);
  }, [panningJitter, snrDb, noiseLevel]);

  // Progress bar component
  const ProgressBar = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <span style={{ fontSize: 11 }}>{label}</span>
        <span style={{ fontSize: 11 }}>{(value * 100).toFixed(0)}%</span>
      </div>
      <div style={{ height: 6, backgroundColor: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
        <div
          style={{
            width: `${value * 100}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 3,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>聴覚シミュレーション</div>
        <EvidenceBadge
          evidenceLevel="hospital_handout"
          sourceUrl="https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169"
          sourceTitle="Stanford Medicine: Hearing Milestones"
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: "#666" }}>
        {ageLabel} - {hearing.stage}
      </div>

      {/* Hearing development metrics */}
      <div style={{ marginTop: 12 }}>
        <ProgressBar value={hearing.speechSalience} label="音声への注意" color="#3b82f6" />
        <ProgressBar value={1 - hearing.panningJitter} label="音源定位精度" color="#10b981" />
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        <div>
          <label className="small" style={{ display: "block", marginBottom: 4 }}>
            背景ノイズレベル: {Math.round(noiseLevel * 100)}%
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={noiseLevel}
            onChange={e => setNoiseLevel(parseFloat(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <button
          onClick={play}
          disabled={isPlaying}
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: isPlaying ? "#94a3b8" : "#3b82f6",
            color: "white",
            fontWeight: 600,
            cursor: isPlaying ? "not-allowed" : "pointer",
          }}
        >
          {isPlaying ? "再生中…" : "▶ 音声を再生"}
        </button>
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: "#888", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
        <div>定位誤差: {Math.round(localizationErrorDeg)}°</div>
        <div>パンニングジッター: {panningJitter.toFixed(2)}</div>
        <div>推奨SNR: {snrDb.toFixed(1)}dB</div>
      </div>

      <div className="small" style={{ marginTop: 8, padding: "8px", backgroundColor: "#f8f9fa", borderRadius: 6 }}>
        ※ 定位誤差が大きいほど音源の位置が不明確に、SNRが低いほど雑音下での聞き取りが困難になります。
        これは聴覚発達の傾向を近似したものです。
      </div>
    </div>
  );
}
