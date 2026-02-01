# Task: Baby World Sim MVP - v0.3モデル統合

## Overview

`baby_world_monthly_model.v0.3.detailed.json` を使って、胎児〜4歳（0〜48ヶ月）の感覚発達シミュレーターを実装。

## データモデル概要

```
baby_world_monthly_model.v0.3.detailed.json
├── meta: バージョン情報、disclaimer
├── sources: 出典情報（CDC, NIDCD等）
├── curves[32]: 発達曲線（vision.clarity, hearing.localization等）
├── milestones[8]: マイルストーン
├── months[49]: 0〜48ヶ月の詳細データ
│   ├── senses: {vision, hearing, touch, smell, taste}
│   ├── visionRepresentation: 6レベルの視覚表現
│   ├── cognition: 概念表現
│   ├── language: 語彙・文法
│   ├── renderParams: {visual, audio} レンダリング用パラメータ
│   └── tasksRecommended: 推奨タスク
├── taskLibrary: タスク定義
└── requiredAppFeatures: 実装すべきモジュール
```

## 実装すべきモジュール（requiredAppFeatures.modules）

| ID | 説明 | 優先度 |
|----|------|--------|
| visual.filterPipeline | blur/contrast/saturation適用 | P1 |
| audio.webAudio | 音源定位/雑音下音声 | P1 |
| evidence.ui | 出典表示 | P1 |
| visual.depthRenderer | 2D→3D切替 | P2 |
| visual.edgeOverlay | エッジマップ | P2 |
| concept.graphView | 概念グラフ | P3 |
| task.engine | タスク実行 | P3 |

## 技術スタック

- React 18 + TypeScript
- Vite
- Canvas/WebGL (視覚フィルタ)
- Web Audio API (聴覚)

## MVP要件（Phase 1）

### 1. データ統合
- [ ] JSONをsrc/data/に配置
- [ ] TypeScript型定義（src/data/model.ts）
- [ ] データアクセス関数（getMonthData, interpolate）

### 2. 視覚シミュレーション（visual.filterPipeline）
- [ ] months[n].renderParams.visual を読み込み
- [ ] blurRadius, contrast, saturation, vignette 適用
- [ ] 月スライダーと連動

### 3. 聴覚シミュレーション（audio.webAudio）
- [ ] months[n].renderParams.audio を読み込み
- [ ] noiseMixRatio で雑音混合
- [ ] localizationJitterDeg で定位誤差

### 4. 出典表示（evidence.ui）
- [ ] sources のリンク表示
- [ ] isInterpolated バッジ
- [ ] disclaimer 表示

## ファイル構成

```
src/
├── data/
│   ├── model.ts           # 型定義
│   ├── baby-world-model.json  # JSONコピー
│   └── index.ts           # エクスポート
├── lib/
│   ├── interp.ts          # 補間関数
│   └── week.ts            # 週⇔月変換
├── features/simulation/
│   ├── VisualSimCanvas.tsx    # 視覚Canvas
│   ├── AudioSimPanel.tsx      # 聴覚パネル
│   └── EvidenceBadge.tsx      # 出典バッジ
└── components/
    └── Timeline/
        └── TimelineSlider.tsx # 月スライダー
```

## 毎iteration必須

1. `.agent/iteration.log` に追記
2. `git add -A && git commit && git push`
3. `ralph emit "{event}" "{message}"`

## Success Criteria

- [ ] npm run build 成功
- [ ] 月スライダーで0〜48ヶ月を操作
- [ ] 視覚フィルタがrenderParams.visualで変化
- [ ] 出典が表示される
- [ ] COMPLETION_REPORT.md 生成
