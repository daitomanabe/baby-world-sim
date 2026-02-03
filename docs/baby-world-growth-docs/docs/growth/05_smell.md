# 嗅覚（母子認知/情動を含む）（0〜48ヶ月）

嗅覚はPCで再現できないため、アプリでは **匂いを“手がかり”として学習する構図** を説明します。

## アンカー（根拠の強い節目）
- [ANCHOR] 母子の匂い手がかりによる識別に関するレビュー。([Vaglio (2009) Chemical communication & mother-infant recognition (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2717541/))
- [ANCHOR] 4〜12ヶ月：母親の匂いが顔知覚に影響する可能性という報告。([SRCD (2024): Infants use mother's scent to see faces](https://www.srcd.org/news/research-shows-young-infants-use-their-mothers-scent-see-faces))


## 発達の概観（区間別 / [ANCHOR]+[MODEL]）

- **新生児期**：[ANCHOR] 匂いが母子相互作用/識別の手がかりになりうるという研究整理がある。([Vaglio (2009) Chemical communication & mother-infant recognition (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2717541/))
- **4〜12ヶ月**：[ANCHOR] 母親の匂いが顔知覚を助ける可能性という報告。([SRCD (2024): Infants use mother's scent to see faces](https://www.srcd.org/news/research-shows-young-infants-use-their-mothers-scent-see-faces))
- **12〜48ヶ月**：[MODEL] 匂いは“人/場所/出来事”の記憶・情動と結びつく手がかりとして説明する（再現はしない）。

## 実装メモ
- 「匂いトグル」は“匂いを出す”のではなく、**説明カード/注意の安定**を切り替えるUIとして設計する。


## 月次パラメータ（実装向け）
|月|匂い区別/学習proxy|
|-:|---:|
|0|0.20|
|1|0.23|
|2|0.27|
|3|0.30|
|4|0.33|
|5|0.37|
|6|0.40|
|7|0.42|
|8|0.45|
|9|0.47|
|10|0.50|
|11|0.53|
|12|0.55|
|13|0.57|
|14|0.58|
|15|0.60|
|16|0.62|
|17|0.63|
|18|0.65|
|19|0.67|
|20|0.68|
|21|0.70|
|22|0.72|
|23|0.73|
|24|0.75|
|25|0.76|
|26|0.77|
|27|0.78|
|28|0.78|
|29|0.79|
|30|0.80|
|31|0.81|
|32|0.82|
|33|0.82|
|34|0.83|
|35|0.84|
|36|0.85|
|37|0.85|
|38|0.86|
|39|0.86|
|40|0.87|
|41|0.87|
|42|0.88|
|43|0.88|
|44|0.88|
|45|0.89|
|46|0.89|
|47|0.90|
|48|0.90|

## 参考文献・出典
- [Vaglio (2009) Chemical communication & mother-infant recognition (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2717541/)
- [SRCD (2024): Infants use mother's scent to see faces](https://www.srcd.org/news/research-shows-young-infants-use-their-mothers-scent-see-faces)