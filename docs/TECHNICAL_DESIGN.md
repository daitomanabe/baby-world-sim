# TECHNICAL_DESIGN（技術設計書）

## 1. 方針
- フロントエンドのみで動く（MVPはサーバ不要）
- ただし、将来的にデータ更新/分析/AI支援ワークフローのために、拡張しやすい構造にする
- “近似モデル”を安全に運用できるよう、データとロジックを分離し、出典をUIに埋め込む

## 2. 技術スタック（想定）
- Vite + React + TypeScript
- Canvas（視覚シミュレーション）
- WebAudio API（聴覚シミュレーション）
- 状態管理：React state（MVP）→ 必要なら Zustand 等
- テスト：Vitest（将来） / Playwright（将来）
- Lint/format：ESLint / Prettier（将来）

## 3. アーキテクチャ
### 3.1 モジュール
- `src/data/*`：マイルストーン/曲線（JSON）
- `src/lib/*`：週変換、補間、スケーリング
- `src/features/simulation/*`：表示パネル（視覚/聴覚/非再現感覚/言語概念）
- `src/components/Timeline/*`：タイムラインUI

### 3.2 データ駆動
UIの表示は原則 `milestones` と `curves` から生成する。
- マイルストーン：イベント（点/区間）
- 曲線：週→パラメータ（連続値）

## 4. データモデル
### 4.1 Milestone（イベント）
最低限の形：
```ts
type EvidenceLevel =
  | "public_guideline"
  | "hospital_handout"
  | "peer_reviewed"
  | "book"
  | "expert_article"
  | "placeholder";

type Domain =
  | "vision"
  | "hearing"
  | "touch"
  | "smell"
  | "taste"
  | "language"
  | "motor"
  | "cognition";

type Milestone = {
  id: string;
  weekStart: number;   // inclusive
  weekEnd?: number;    // inclusive (optional)
  domain: Domain;
  title: string;
  summary: string;
  details?: string;
  sourceTitle: string;
  sourceUrl: string;
  evidenceLevel: EvidenceLevel;
  notes?: string;      // 補足・注意
};
```

### 4.2 Curve（連続パラメータ）
例：
```ts
type Curve = {
  key: string;                 // e.g. "vision.clarity"
  description: string;
  weekMin: number;             // 0
  weekMax: number;             // 208
  unit?: string;               // e.g. "0..1"
  points: Array<{ week: number; value: number }>; // piecewise linear
  isInterpolated: boolean;     // trueなら“補間モデル”
  evidence: {
    sourceTitle: string;
    sourceUrl: string;
    evidenceLevel: EvidenceLevel;
    notes?: string;
  };
};
```

## 5. 視覚シミュレーション（Canvas）
### 5.1 目的
- 「ぼんやり→色→奥行き」の大枠を視覚的に理解できるようにする
- ただし **断定表現は禁止**（“赤ちゃんはこう見える”ではなく、“近似”）

### 5.2 パイプライン（MVP）
- 入力：静止画（将来は動画も）
- 処理例：
  - ブラー（ガウシアン風）
  - 彩度/コントラスト調整
  - 周辺減光（視野の分布をそれっぽく）
- パラメータは `curves` から取得（週→値）

### 5.3 将来拡張
- 空間周波数特性（CSF）に基づくフィルタ
- 注視（顔優先など）のヒートマップ表示（“注意”の可視化）

## 6. 聴覚シミュレーション（WebAudio）
### 6.1 目的
- 聴力の有無を誇張しない（出生時から聴覚は機能する前提）
- “定位/注意/聞き分け”の発達を、誤差モデルとして表現する

### 6.2 MVP実装
- 合成音源（sine / noise / simple envelope）
- `curves` で定位誤差やSNR（聞き取りやすさ）のスケールを週で変える
- HRTF等の高精度再現は後回し（将来検討）

## 7. 触覚・味覚・嗅覚（非再現）
- “刺激を再現できない”を前提に、説明の設計がプロダクトの品質を決める
- 表示例：
  - 探索の主役（口→手→道具）
  - 好み/拒否の芽生え（ただし断定しない）
  - 経験の増加を示す指標（例：食材バリエーションのレンジ）

## 8. 言語・概念（非再現）
- マイルストーンカード（根拠ありの節目）
- 連続曲線（語彙数の目安など）は必ず「推定」と明記
- 概念は1スコアにせず、カテゴリ（対象永続性/共同注意/象徴遊び/他者理解 等）で並列表示

## 9. 品質（CI）
- まずは `npm run build` が通ることを最低ライン
- 将来：
  - 型チェック
  - Lint
  - スモークテスト（Playwright）
