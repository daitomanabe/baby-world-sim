import React, { useMemo, useState } from "react";
import TimelineSlider from "./components/Timeline/TimelineSlider";
import VisualSimCanvas from "./features/simulation/VisualSimCanvas";
import AudioSimPanel from "./features/simulation/AudioSimPanel";
import NonReproducibleSensesPanel from "./features/simulation/NonReproducibleSensesPanel";
import LanguageConceptPanel from "./features/simulation/LanguageConceptPanel";

export default function App() {
  const [week, setWeek] = useState(0);

  const monthApprox = useMemo(() => Math.round((week / 4.345) * 10) / 10, [week]);

  return (
    <div className="container">
      <h1 style={{ margin: 0, fontSize: 22 }}>Baby World Simulator</h1>
      <div className="small" style={{ marginTop: 6 }}>
        0〜4歳（0〜48ヶ月 / 0〜208週）を週単位で可視化する近似シミュレーター（教育・研究用途）
      </div>

      <div style={{ marginTop: 16 }}>
        <TimelineSlider week={week} onChange={setWeek} />
      </div>

      <div className="row" style={{ marginTop: 16 }}>
        <div style={{ display: "grid", gap: 16 }}>
          <VisualSimCanvas week={week} />
          <AudioSimPanel week={week} />
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <NonReproducibleSensesPanel week={week} />
          <LanguageConceptPanel week={week} />
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 700 }}>状態</div>
            <div className="small" style={{ marginTop: 8 }}>
              week={week} / month≈{monthApprox}
            </div>
            <div className="small" style={{ marginTop: 8, opacity: 0.85 }}>
              TODO: 運動（粗大/微細）パネル、出典カードの共通UI、個人差レンジなど。
            </div>
          </div>
        </div>
      </div>

      <div className="small" style={{ marginTop: 20, opacity: 0.8 }}>
        ⚠️ 本アプリは近似モデルです。医療・診断目的では使用しないでください。
      </div>
    </div>
  );
}
