import React, { useMemo, useRef, useState } from "react";
import { getCurve } from "../../data";
import { evalCurve } from "../../lib/interp";

type Props = { week: number };

function ensureAudioContext(): AudioContext {
  const AnyWindow = window as any;
  const Ctx = window.AudioContext || AnyWindow.webkitAudioContext;
  return new Ctx();
}

export default function AudioSimPanel({ week }: Props) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const locCurve = getCurve("hearing.localizationErrorDeg");
  const localizationError = useMemo(() => (locCurve ? evalCurve(locCurve, week) : 60), [locCurve, week]);

  const play = async () => {
    if (!ctxRef.current) ctxRef.current = ensureAudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") await ctx.resume();

    // Simple “voice-ish” tone + noise, with panning jitter based on localizationError
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 180;

    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.15;
    noise.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.value = 0.0;

    const pan = ctx.createStereoPanner();
    // Convert errorDeg to a rough -1..1 jitter amplitude
    const jitter = Math.min(1, Math.max(0, localizationError / 90));
    pan.pan.value = (Math.random() * 2 - 1) * jitter;

    osc.connect(gain);
    noise.connect(gain);
    gain.connect(pan);
    pan.connect(ctx.destination);

    const t0 = ctx.currentTime;
    gain.gain.setValueAtTime(0.0, t0);
    gain.gain.linearRampToValueAtTime(0.18, t0 + 0.03);
    gain.gain.linearRampToValueAtTime(0.0, t0 + 0.55);

    osc.start(t0);
    noise.start(t0);
    osc.stop(t0 + 0.6);
    noise.stop(t0 + 0.6);

    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 650);
  };

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>聴覚（近似）</div>
        <div className="small">定位誤差モデル: {Math.round(localizationError)}°（仮）</div>
      </div>

      <div className="small" style={{ marginTop: 8 }}>
        ※ 出生時から聴覚が機能する前提で、ここでは主に「定位/注意」をモデル化します。
      </div>

      <button onClick={play} disabled={isPlaying} style={{ marginTop: 12, padding: "10px 12px", borderRadius: 10 }}>
        {isPlaying ? "再生中…" : "合成音を再生"}
      </button>
    </div>
  );
}
