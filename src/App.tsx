import React, { useMemo, useState } from "react";
import TimelineSlider from "./components/Timeline/TimelineSlider";
import VisualSimCanvas from "./features/simulation/VisualSimCanvas";
import DepthPerceptionPanel from "./features/simulation/DepthPerceptionPanel";
import ColorVisionPanel from "./features/simulation/ColorVisionPanel";
import AudioSimPanel from "./features/simulation/AudioSimPanel";
import NonReproducibleSensesPanel from "./features/simulation/NonReproducibleSensesPanel";
import LanguageConceptPanel from "./features/simulation/LanguageConceptPanel";
import NumeracyPanel from "./features/simulation/NumeracyPanel";
import LiteracyPanel from "./features/simulation/LiteracyPanel";
import { Disclaimer } from "./components/Evidence";
import { SourcesPanel } from "./components/Sources";
import { MODEL_META } from "./data";

export default function App() {
  const [week, setWeek] = useState(0);

  // Convert week to month for v0.3 model (0-208 weeks → 0-48 months)
  const month = useMemo(() => week / 4.345, [week]);
  const monthDisplay = useMemo(() => Math.round(month * 10) / 10, [month]);

  return (
    <div className="container">
      <h1 style={{ margin: 0, fontSize: 22 }}>Baby World Simulator</h1>
      <div className="small" style={{ marginTop: 6 }}>
        0〜4歳（0〜48ヶ月 / 0〜208週）を週単位で可視化する近似シミュレーター（教育・研究用途）
      </div>
      <div className="small" style={{ marginTop: 4, color: "#666" }}>
        Model v{MODEL_META?.modelVersion || "0.3"} | {MODEL_META?.granularity || "month"} | 10領域統合
      </div>

      <Disclaimer
        disclaimerText={MODEL_META?.disclaimer}
      />

      <div style={{ marginTop: 16 }}>
        <TimelineSlider week={week} onChange={setWeek} />
      </div>

      <div className="row" style={{ marginTop: 16 }}>
        <div style={{ display: "grid", gap: 16 }}>
          {/* Pass month instead of week to use v0.3 model */}
          <VisualSimCanvas month={month} />
          <DepthPerceptionPanel month={month} />
          <ColorVisionPanel month={month} />
          <AudioSimPanel week={week} />
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <NonReproducibleSensesPanel week={week} />
          <LanguageConceptPanel week={week} />
          <NumeracyPanel week={week} />
          <LiteracyPanel week={week} />
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 700 }}>状態</div>
            <div className="small" style={{ marginTop: 8 }}>
              week={week} / month≈{monthDisplay}
            </div>
            <div className="small" style={{ marginTop: 8, opacity: 0.85 }}>
              統合済み: 視覚、聴覚、触覚、味覚、嗅覚、認知、言語、会話、数概念、リテラシー
            </div>
          </div>
        </div>
      </div>

      {/* Sources section at the bottom */}
      <div style={{ marginTop: 24 }}>
        <SourcesPanel />
      </div>
    </div>
  );
}
