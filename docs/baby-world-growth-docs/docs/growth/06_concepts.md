# 概念獲得（対象永続性/共同注意/象徴/他者視点）（0〜48ヶ月）

概念はフィルタでは再現できません。アプリでは **タスク（観察）＋説明** で見せます。

## アプリでの対応フィールド（JSON）
- `months[n].cognition`（objectPermanence / jointAttention / pretendPlay / causalReasoning / theoryOfMind / featureToMeaning）
- 概念層：`months[n].cognition.conceptRepresentation.layers`

## アンカー（根拠の強い節目）
- [ANCHOR] 9〜12ヶ月：共同注意が言語の前駆として重要という整理。([UPF: Joint attention (Before First Words)](https://beforefirstwords.upf.edu/precursors-of-language/joint-attention/))
- [ANCHOR] 2歳/3歳/4歳：認知・社会・言語の節目（CDC）。([CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html) / [CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html) / [CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html))
- [ANCHOR] 4歳前後の他者視点（ToM）についての議論の一例。([Cognition (2023): true belief error (mentions standard ToM view)](https://www.sciencedirect.com/science/article/pii/S0010027722002438))


## 発達の概観（区間別 / [ANCHOR]+[MODEL]）

- **0〜12ヶ月**：[MODEL] 感覚運動探索→予測→対象永続性の芽。  
- **9〜12ヶ月**：[ANCHOR] 共同注意が顕著になる帯として整理。([UPF: Joint attention (Before First Words)](https://beforefirstwords.upf.edu/precursors-of-language/joint-attention/))
- **12〜24ヶ月**：[ANCHOR] 言語（2語）と概念（用途/目的）が絡み始める節目。([CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html))
- **24〜36ヶ月**：[ANCHOR] ふり遊び/会話の往復など、象徴・社会認知が増える帯。([CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html))
- **36〜48ヶ月**：[ANCHOR] 4語以上、物語、他者視点に関わる節目が参照される。([CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html))

## 実装メモ（概念の見せ方）
- 概念は **タスクでしか見せられない**。hide&seek / pointing / pretend をまずMVPにする。
- 他者視点（ToM）は議論があるので、断定せず **“不確実性込みの説明”** に固定する。([Cognition (2023): true belief error (mentions standard ToM view)](https://www.sciencedirect.com/science/article/pii/S0010027722002438))


## 月次パラメータ（実装向け）
|月|ステージ|対象永続|共同注意|ふり遊び|因果|他者視点|feature→meaning|推奨タスク(例)|
|-:|---|---:|---:|---:|---:|---:|---:|---|
|0|感覚運動探索（反応→予測）|0.00|0.00|0.00|0.05|0.00|0.05|-|
|1|感覚運動探索（反応→予測）|0.02|0.01|0.00|0.07|0.00|0.06|-|
|2|感覚運動探索（反応→予測）|0.03|0.02|0.01|0.08|0.00|0.07|-|
|3|感覚運動探索（反応→予測）|0.05|0.03|0.01|0.10|0.01|0.07|-|
|4|感覚運動探索（反応→予測）|0.07|0.03|0.02|0.12|0.01|0.08|-|
|5|感覚運動探索（反応→予測）|0.08|0.04|0.02|0.13|0.01|0.09|-|
|6|対象永続性が育つ|0.10|0.05|0.03|0.15|0.01|0.10|-|
|7|対象永続性が育つ|0.18|0.12|0.03|0.18|0.01|0.12|-|
|8|対象永続性が育つ|0.27|0.18|0.03|0.22|0.01|0.15|C_OBJECT_PERMANENCE_HIDE_SEEK|
|9|対象永続性が育つ|0.35|0.25|0.04|0.25|0.01|0.17|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|10|対象永続性が育つ|0.45|0.35|0.04|0.28|0.02|0.20|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|11|対象永続性が育つ|0.55|0.45|0.05|0.32|0.02|0.23|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|12|共同注意・指差しが強まる|0.65|0.55|0.05|0.35|0.02|0.25|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|13|共同注意・指差しが強まる|0.68|0.59|0.08|0.38|0.02|0.28|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|14|共同注意・指差しが強まる|0.72|0.63|0.12|0.40|0.02|0.30|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|15|共同注意・指差しが強まる|0.75|0.68|0.15|0.42|0.03|0.33|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|16|共同注意・指差しが強まる|0.78|0.72|0.18|0.45|0.03|0.35|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|17|共同注意・指差しが強まる|0.82|0.76|0.22|0.47|0.03|0.38|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|18|象徴/ふり遊びが増える|0.85|0.80|0.25|0.50|0.03|0.40|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|19|象徴/ふり遊びが増える|0.86|0.81|0.30|0.53|0.03|0.42|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|20|象徴/ふり遊びが増える|0.87|0.83|0.35|0.55|0.03|0.45|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|21|象徴/ふり遊びが増える|0.89|0.84|0.40|0.57|0.04|0.47|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|22|象徴/ふり遊びが増える|0.90|0.85|0.45|0.60|0.04|0.50|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|23|象徴/ふり遊びが増える|0.91|0.87|0.50|0.62|0.04|0.53|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|24|象徴/ふり遊びが増える|0.92|0.88|0.55|0.65|0.04|0.55|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|25|象徴/ふり遊びが増える|0.92|0.88|0.57|0.66|0.04|0.57|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|26|象徴/ふり遊びが増える|0.92|0.89|0.60|0.68|0.04|0.58|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|27|象徴/ふり遊びが増える|0.93|0.89|0.62|0.69|0.04|0.60|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|28|象徴/ふり遊びが増える|0.93|0.89|0.65|0.70|0.05|0.62|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|29|象徴/ふり遊びが増える|0.93|0.89|0.68|0.71|0.05|0.63|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|30|理由説明・ルール理解が増える|0.93|0.90|0.70|0.72|0.05|0.65|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|31|理由説明・ルール理解が増える|0.94|0.90|0.72|0.74|0.07|0.67|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|32|理由説明・ルール理解が増える|0.94|0.90|0.74|0.75|0.10|0.68|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|33|理由説明・ルール理解が増える|0.94|0.90|0.76|0.76|0.12|0.70|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|34|理由説明・ルール理解が増える|0.94|0.91|0.78|0.78|0.15|0.72|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|35|理由説明・ルール理解が増える|0.94|0.91|0.80|0.79|0.17|0.73|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|36|理由説明・ルール理解が増える|0.94|0.91|0.82|0.80|0.20|0.75|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|37|理由説明・ルール理解が増える|0.95|0.91|0.83|0.81|0.24|0.76|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|38|理由説明・ルール理解が増える|0.95|0.92|0.83|0.82|0.28|0.78|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|39|理由説明・ルール理解が増える|0.95|0.92|0.84|0.82|0.33|0.79|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|40|理由説明・ルール理解が増える|0.95|0.92|0.85|0.83|0.37|0.80|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|41|理由説明・ルール理解が増える|0.95|0.92|0.85|0.84|0.41|0.81|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|42|他者視点（心の理論）が育つ|0.96|0.93|0.86|0.85|0.45|0.82|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|43|他者視点（心の理論）が育つ|0.96|0.93|0.87|0.86|0.49|0.84|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|44|他者視点（心の理論）が育つ|0.96|0.93|0.87|0.87|0.53|0.85|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|45|他者視点（心の理論）が育つ|0.96|0.93|0.88|0.88|0.57|0.86|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|46|他者視点（心の理論）が育つ|0.97|0.94|0.89|0.88|0.62|0.88|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|47|他者視点（心の理論）が育つ|0.97|0.94|0.89|0.89|0.66|0.89|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|
|48|他者視点（心の理論）が育つ|0.97|0.94|0.90|0.90|0.70|0.90|C_OBJECT_PERMANENCE_HIDE_SEEK, C_JOINT_ATTENTION_POINTING|

## 参考文献・出典
- [UPF: Joint attention (Before First Words)](https://beforefirstwords.upf.edu/precursors-of-language/joint-attention/)
- [CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html)
- [CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html)
- [CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html)
- [Cognition (2023): true belief error (mentions standard ToM view)](https://www.sciencedirect.com/science/article/pii/S0010027722002438)