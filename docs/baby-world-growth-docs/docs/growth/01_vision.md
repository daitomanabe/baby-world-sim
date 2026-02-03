# 視覚（0〜48ヶ月）

0〜48ヶ月の視覚発達を、**2D→3D** と **低レベル→意味（セマンティクス）** の流れで整理します。

## アプリでの対応フィールド（JSON）
- 直接描画：`months[n].renderParams.visual`（blur/contrast/saturation/vignette/depthCueStrength/semanticLabelAlpha）
- レイヤー：`months[n].visionRepresentation.levels`（エッジ→意味の6レベル）

## アンカー（根拠の強い節目）
- [ANCHOR] 4〜6ヶ月：奥行き知覚（ステレオ視など）の出現が報告。([Fox et al. (1980) Stereopsis in human infants (Science)](https://www.science.org/doi/10.1126/science.7350666))
- [ANCHOR] 4ヶ月：両眼視・奥行きに関する解説。([Nationwide Children's Hospital: Infant Vision (Birth to One Year)](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year))
- [ANCHOR] 約5ヶ月：奥行き知覚がより発達、色覚についての解説。([American Academy of Ophthalmology: Baby's vision development in the first year](https://www.aao.org/eye-health/tips-prevention/baby-vision-development-first-year) / [American Optometric Association: Infant vision (birth to 24 months)](https://www.aoa.org/healthy-eyes/eye-health-for-life/infant-vision))


## 発達の概観（区間別 / [ANCHOR]+[MODEL]）

- **0〜2ヶ月**：[MODEL] 近距離・高コントラストに強く依存。顔や大きな形に注意が向きやすい（再現はコントラスト強調＋ぼかしで）。  
- **3〜4ヶ月**：[ANCHOR] 追視や焦点の安定が進み、両眼の協調が話題になりやすい帯。([Nationwide Children's Hospital: Infant Vision (Birth to One Year)](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year))
- **4〜6ヶ月**：[ANCHOR] **奥行き（3D手がかり）**が立ち上がる帯（ステレオ視の報告あり）。([Fox et al. (1980) Stereopsis in human infants (Science)](https://www.science.org/doi/10.1126/science.7350666) / [American Academy of Ophthalmology: Baby's vision development in the first year](https://www.aao.org/eye-health/tips-prevention/baby-vision-development-first-year))
- **6〜12ヶ月**：[MODEL] 手を伸ばす/掴む等の行為と視覚が強く結びつき、「見えたものを操作する」方向に加速。
- **12〜24ヶ月**：[MODEL] 物体の同一性（角度・一部隠れ）や、絵本/写真の理解が増えやすい（UIは“物体認識の安定”として見せる）。
- **24〜48ヶ月**：[MODEL] “形・色→意味（カテゴリ/役割）”の結合が強まり、語彙や概念層と相互に補強される（semantic overlayは根拠バッジ必須）。

## 実装メモ（視覚を「嘘っぽくしない」）
- 2D→3Dは、まず **パララックス/遮蔽/サイズ遠近**で表現し、両眼視差の断定表現は避ける。([American Academy of Ophthalmology: Baby's vision development in the first year](https://www.aao.org/eye-health/tips-prevention/baby-vision-development-first-year))
- “意味ラベル”は推定なので、`semanticLabelAlpha` を上げるほど **proxy表示**と **出典リンク**を強く出す。


## 月次パラメータ（実装向け）
|月|ステージ|clarity|depth|sem|blurPx|depthCue|semanticα|推奨タスク(例)|
|-:|---|---:|---:|---:|---:|---:|---:|---|
|0|2D手がかり中心（近距離/コントラスト）|0.15|0.05|0.05|15.3|0.05|0.00|V_EDGE_CONTRAST|
|1|2D手がかり中心（近距離/コントラスト）|0.20|0.07|0.06|14.4|0.07|0.00|V_EDGE_CONTRAST|
|2|2D手がかり中心（近距離/コントラスト）|0.25|0.10|0.07|13.5|0.10|0.00|V_EDGE_CONTRAST, V_COLOR_SALIENCE|
|3|2D優位 + 3Dの芽生え|0.30|0.23|0.07|12.6|0.23|0.00|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES|
|4|3D手がかりが増える|0.35|0.35|0.08|11.7|0.35|0.00|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES|
|5|3D手がかりが増える|0.40|0.47|0.09|10.8|0.47|0.00|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY|
|6|3D手がかりが増える|0.45|0.60|0.10|9.9|0.60|0.00|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY|
|7|3D手がかりが増える|0.49|0.64|0.12|9.2|0.64|0.00|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY|
|8|3D手がかりが増える|0.53|0.68|0.15|8.4|0.68|0.00|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY|
|9|3Dが安定（空間探索が拡張）|0.57|0.72|0.17|7.7|0.72|0.03|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY|
|10|3Dが安定（空間探索が拡張）|0.62|0.77|0.20|6.9|0.77|0.06|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY|
|11|3Dが安定（空間探索が拡張）|0.66|0.81|0.23|6.2|0.81|0.09|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|12|3Dが安定（空間探索が拡張）|0.70|0.85|0.25|5.4|0.85|0.12|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|13|3Dが安定（空間探索が拡張）|0.71|0.86|0.28|5.2|0.86|0.15|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|14|3Dが安定（空間探索が拡張）|0.72|0.87|0.30|5.0|0.87|0.18|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|15|3Dが安定（空間探索が拡張）|0.74|0.88|0.33|4.7|0.88|0.21|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|16|3Dが安定（空間探索が拡張）|0.75|0.88|0.35|4.5|0.88|0.23|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|17|3Dが安定（空間探索が拡張）|0.76|0.89|0.38|4.3|0.89|0.27|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|18|3Dが安定（空間探索が拡張）|0.78|0.90|0.40|4.0|0.90|0.29|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|19|3Dの使いこなし（意味づけと結合）|0.79|0.91|0.42|3.8|0.91|0.32|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|20|3Dの使いこなし（意味づけと結合）|0.80|0.92|0.45|3.6|0.92|0.35|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|21|3Dの使いこなし（意味づけと結合）|0.81|0.93|0.47|3.4|0.93|0.38|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|22|3Dの使いこなし（意味づけと結合）|0.82|0.93|0.50|3.1|0.93|0.41|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|23|3Dの使いこなし（意味づけと結合）|0.84|0.94|0.53|2.9|0.94|0.44|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|24|3Dの使いこなし（意味づけと結合）|0.85|0.95|0.55|2.7|0.95|0.47|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|25|3Dの使いこなし（意味づけと結合）|0.85|0.95|0.57|2.6|0.95|0.49|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|26|3Dの使いこなし（意味づけと結合）|0.86|0.95|0.58|2.5|0.95|0.51|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|27|3Dの使いこなし（意味づけと結合）|0.86|0.96|0.60|2.5|0.96|0.53|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|28|3Dの使いこなし（意味づけと結合）|0.87|0.96|0.62|2.4|0.96|0.55|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|29|3Dの使いこなし（意味づけと結合）|0.87|0.96|0.63|2.3|0.96|0.57|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|30|3Dの使いこなし（意味づけと結合）|0.88|0.96|0.65|2.2|0.96|0.59|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|31|3Dの使いこなし（意味づけと結合）|0.88|0.96|0.67|2.2|0.96|0.61|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|32|3Dの使いこなし（意味づけと結合）|0.88|0.97|0.68|2.1|0.97|0.63|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|33|3Dの使いこなし（意味づけと結合）|0.89|0.97|0.70|2.0|0.97|0.65|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|34|3Dの使いこなし（意味づけと結合）|0.89|0.97|0.72|1.9|0.97|0.67|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|35|3Dの使いこなし（意味づけと結合）|0.90|0.97|0.73|1.9|0.97|0.69|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|36|3Dの使いこなし（意味づけと結合）|0.90|0.97|0.75|1.8|0.97|0.71|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|37|3Dの使いこなし（意味づけと結合）|0.90|0.98|0.76|1.7|0.98|0.72|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|38|3Dの使いこなし（意味づけと結合）|0.91|0.98|0.78|1.6|0.98|0.73|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|39|3Dの使いこなし（意味づけと結合）|0.91|0.98|0.79|1.6|0.98|0.75|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|40|3Dの使いこなし（意味づけと結合）|0.92|0.98|0.80|1.5|0.98|0.77|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|41|3Dの使いこなし（意味づけと結合）|0.92|0.98|0.81|1.4|0.98|0.78|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|42|3Dの使いこなし（意味づけと結合）|0.93|0.99|0.82|1.4|0.99|0.79|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|43|3Dの使いこなし（意味づけと結合）|0.93|0.99|0.84|1.3|0.99|0.81|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|44|3Dの使いこなし（意味づけと結合）|0.93|0.99|0.85|1.2|0.99|0.82|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|45|3Dの使いこなし（意味づけと結合）|0.94|0.99|0.86|1.1|0.99|0.84|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|46|3Dの使いこなし（意味づけと結合）|0.94|1.00|0.88|1.1|1.00|0.85|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|47|3Dの使いこなし（意味づけと結合）|0.95|1.00|0.89|1.0|1.00|0.87|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|
|48|3Dの使いこなし（意味づけと結合）|0.95|1.00|0.90|0.9|1.00|0.88|V_EDGE_CONTRAST, V_COLOR_SALIENCE, V_MOTION_TRACK, V_DEPTH_CUES, V_OBJECT_CONSTANCY, V_SEMANTIC_LABELS|

## 6レベル視覚（説明用）
エッジ/コントラスト → 色 → 動き → 奥行き（3D） → 物体/顔 → 意味（カテゴリ/役割）。

## 参考文献・出典
- [Nationwide Children's Hospital: Infant Vision (Birth to One Year)](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year)
- [American Academy of Ophthalmology: Baby's vision development in the first year](https://www.aao.org/eye-health/tips-prevention/baby-vision-development-first-year)
- [American Optometric Association: Infant vision (birth to 24 months)](https://www.aoa.org/healthy-eyes/eye-health-for-life/infant-vision)
- [Fox et al. (1980) Stereopsis in human infants (Science)](https://www.science.org/doi/10.1126/science.7350666)
- [Frontiers in Psychology (2020): Development of binocular suppression in infants](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.558871/full)