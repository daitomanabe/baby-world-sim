# Monthly JSON schema (v0.3 detailed)

## Top-level
- `meta`：生成情報・免責
- `sources`：出典URLと証拠レベル
- `curves`：月→値（piecewise linear, proxy）
- `milestones`：根拠のある節目（点/区間）
- `taskLibrary`：アプリ内タスク（観察/説明用）
- `requiredAppFeatures`：追加で必要な機能一覧（実装要件）
- `months`：月ごとの状態（0..48）

## months[n]
- `senses`：五感 proxy + stage
- `visionRepresentation`：6レベル視覚 + 2D↔3D + 前月比
- `language`：理解/産出/語彙/構文/語用 proxy
- `motor`：粗大/微細 proxy
- `cognition`：概念 proxy（注意/WM/抑制/模倣を追加）
- `narrative`：月ごとの説明（文章/箇条書き）
- `tasksRecommended`：その月に表示するタスク（観察用）
- `renderParams`：アプリレンダリング便宜パラメータ
- `appFlags`：UI切替フラグ（発達段階に応じて有効化）
- `uncertainty`：確度の雰囲気（統計推定ではない）

## Evidence levels
- public_guideline / hospital_handout / peer_reviewed / expert_article / placeholder
