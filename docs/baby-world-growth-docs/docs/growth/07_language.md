# 言語（理解/産出/語彙/構文）（0〜48ヶ月）

言語は **理解→産出→構文→語用（会話）** の連続として扱います。

## アンカー（根拠の強い節目）
- [ANCHOR] 2歳：2語（"More milk"）。([CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html))
- [ANCHOR] 30ヶ月：およそ50語、動詞を含む2語以上。([CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html))
- [ANCHOR] 3歳：2往復以上の会話、質問。([CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html))
- [ANCHOR] 4歳：4語以上の文、日中の出来事を話す。([CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html))
- [ANCHOR] 0〜5歳の一般向けチェックリスト。([NIDCD: Speech and Language Developmental Milestones](https://www.nidcd.nih.gov/health/speech-and-language))


## 発達の概観（区間別 / [ANCHOR]+[MODEL]）

- **0〜12ヶ月**：[MODEL] 音声のリズム→喃語→意味の前駆（共同注意と強く結合）。  
- **18〜24ヶ月**：[ANCHOR] 2語の出現など、産出が“組み合わせ”になる節目。([CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html))
- **30ヶ月**：[ANCHOR] 約50語、動詞を含む2語以上の節目が参照される。([CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html))
- **3歳**：[ANCHOR] 2往復以上の会話・質問。([CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html))
- **4歳**：[ANCHOR] 4語以上の文、出来事を話す。([CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html))

## 実装メモ
- 語彙“数”を断定しない。節目はアンカー、月次はproxyとして表示する。([NIDCD: Speech and Language Developmental Milestones](https://www.nidcd.nih.gov/health/speech-and-language))


## 月次パラメータ（実装向け）
|月|ステージ|理解|産出|語彙proxy|構文proxy|語用proxy|
|-:|---|---:|---:|---:|---:|---:|
|0|泣き・反射的発声|0.05|0.00|0.05|0.00|0.10|
|1|泣き・反射的発声|0.07|0.03|0.05|0.01|0.12|
|2|クーイング/喃語の準備|0.10|0.05|0.05|0.02|0.15|
|3|クーイング/喃語の準備|0.14|0.07|0.05|0.03|0.17|
|4|クーイング/喃語の準備|0.17|0.10|0.05|0.03|0.20|
|5|クーイング/喃語の準備|0.21|0.12|0.05|0.04|0.23|
|6|喃語（反復）が増える|0.25|0.15|0.05|0.05|0.25|
|7|喃語（反復）が増える|0.29|0.18|0.05|0.06|0.28|
|8|喃語（反復）が増える|0.33|0.22|0.05|0.07|0.32|
|9|喃語（反復）が増える|0.38|0.25|0.05|0.07|0.35|
|10|初語が出始める（個人差）|0.42|0.28|0.05|0.08|0.38|
|11|初語が出始める（個人差）|0.46|0.32|0.05|0.09|0.42|
|12|初語が出始める（個人差）|0.50|0.35|0.05|0.10|0.45|
|13|初語が出始める（個人差）|0.53|0.39|0.06|0.12|0.48|
|14|初語が出始める（個人差）|0.57|0.43|0.07|0.15|0.52|
|15|語彙増加・二語へ|0.60|0.47|0.09|0.17|0.55|
|16|語彙増加・二語へ|0.63|0.52|0.10|0.20|0.58|
|17|語彙増加・二語へ|0.67|0.56|0.11|0.23|0.62|
|18|語彙増加・二語へ|0.70|0.60|0.12|0.25|0.65|
|19|語彙増加・二語へ|0.72|0.62|0.14|0.28|0.67|
|20|語彙増加・二語へ|0.73|0.63|0.16|0.30|0.68|
|21|語彙増加・二語へ|0.75|0.65|0.18|0.33|0.70|
|22|語彙増加・二語へ|0.77|0.67|0.21|0.35|0.72|
|23|語彙増加・二語へ|0.78|0.68|0.23|0.38|0.73|
|24|文が長くなる・質問が増える|0.80|0.70|0.25|0.40|0.75|
|25|文が長くなる・質問が増える|0.81|0.72|0.27|0.42|0.76|
|26|文が長くなる・質問が増える|0.82|0.73|0.29|0.45|0.77|
|27|文が長くなる・質問が増える|0.82|0.75|0.32|0.47|0.78|
|28|文が長くなる・質問が増える|0.83|0.77|0.34|0.50|0.78|
|29|文が長くなる・質問が増える|0.84|0.78|0.36|0.53|0.79|
|30|文が長くなる・質問が増える|0.85|0.80|0.38|0.55|0.80|
|31|文が長くなる・質問が増える|0.86|0.81|0.41|0.58|0.81|
|32|文が長くなる・質問が増える|0.87|0.83|0.44|0.62|0.82|
|33|文が長くなる・質問が増える|0.88|0.84|0.47|0.65|0.82|
|34|文が長くなる・質問が増える|0.88|0.85|0.49|0.68|0.83|
|35|文が長くなる・質問が増える|0.89|0.87|0.52|0.72|0.84|
|36|会話/物語が拡張|0.90|0.88|0.55|0.75|0.85|
|37|会話/物語が拡張|0.90|0.88|0.57|0.76|0.86|
|38|会話/物語が拡張|0.91|0.89|0.58|0.78|0.86|
|39|会話/物語が拡張|0.91|0.89|0.60|0.79|0.87|
|40|会話/物語が拡張|0.92|0.90|0.62|0.80|0.87|
|41|会話/物語が拡張|0.92|0.90|0.63|0.81|0.88|
|42|会話/物語が拡張|0.93|0.91|0.65|0.82|0.89|
|43|会話/物語が拡張|0.93|0.91|0.67|0.84|0.89|
|44|会話/物語が拡張|0.93|0.91|0.68|0.85|0.90|
|45|会話/物語が拡張|0.94|0.92|0.70|0.86|0.90|
|46|会話/物語が拡張|0.94|0.92|0.72|0.88|0.91|
|47|会話/物語が拡張|0.95|0.93|0.73|0.89|0.91|
|48|会話/物語が拡張|0.95|0.93|0.75|0.90|0.92|

## 参考文献・出典
- [NIDCD: Speech and Language Developmental Milestones](https://www.nidcd.nih.gov/health/speech-and-language)
- [Stanford Children's Health: Age-Appropriate Hearing, Speech and Language Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)
- [CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html)
- [CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html)
- [CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html)
- [CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html)
- [HealthyChildren.org: Language Development: 2 Year Olds](https://www.healthychildren.org/English/ages-stages/toddler/Pages/Language-Development-2-Year-Olds.aspx)