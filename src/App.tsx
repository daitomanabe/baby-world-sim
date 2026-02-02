import React, { useMemo, useState } from "react";
import TimelineSlider from "./components/Timeline/TimelineSlider";
import VisualSimCanvas from "./features/simulation/VisualSimCanvas";
import DepthPerceptionPanel from "./features/simulation/DepthPerceptionPanel";
import ColorVisionPanel from "./features/simulation/ColorVisionPanel";
import AudioSimPanel from "./features/simulation/AudioSimPanel";
import NonReproducibleSensesPanel from "./features/simulation/NonReproducibleSensesPanel";
import LanguageConceptPanel from "./features/simulation/LanguageConceptPanel";
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
        Model v{MODEL_META?.modelVersion || "0.3"} | {MODEL_META?.granularity || "month"}
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
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 700 }}>状態</div>
            <div className="small" style={{ marginTop: 8 }}>
              week={week} / month≈{monthDisplay}
            </div>
            <div className="small" style={{ marginTop: 8, opacity: 0.85 }}>
              TODO: 運動（粗大/微細）パネル、聴覚シミュレーション、出典カードの共通UI、個人差レンジなど。
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
