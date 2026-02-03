# 会話（2語・3語・ターンテイク）（0〜48ヶ月）

会話は“単語数”より **やりとり（ターンテイク）** と **意図（質問・説明）** が本体です。

## アンカー（根拠の強い節目）
- [ANCHOR] 2歳：2語以上の組み合わせ。([CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html))
- [ANCHOR] 30ヶ月：動詞を含む2語以上。([CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html))
- [ANCHOR] 3歳：2往復以上の会話・質問。([CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html))
- [ANCHOR] 4歳：4語以上の文。([CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html))


## 発達の概観（区間別 / [ANCHOR]+[MODEL]）

- **〜18ヶ月**：[MODEL] 意図は“視線/指差し/声”の混合。会話はターンの芽を作る段階。  
- **18〜24ヶ月**：[ANCHOR] 2語の組み合わせ（要求/説明）が増える節目。([CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html))
- **30ヶ月**：[ANCHOR] 動詞入り2語（行為の説明）。([CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html))
- **3歳**：[ANCHOR] 2往復以上の会話＋質問。([CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html))
- **4歳**：[ANCHOR] 4語以上＋出来事の語り。([CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html))

## 実装メモ
- “2語/3語/4語”は、あくまで **会話UIの難易度設定**に使う（評価・判定には使わない）。


## 月次（会話ステージ：モデル）
|月|推定会話ステージ|構文proxy|語用proxy|
|-:|---|---:|---:|
|0|喃語・身振り中心|0.00|0.10|
|1|喃語・身振り中心|0.01|0.12|
|2|喃語・身振り中心|0.02|0.15|
|3|喃語・身振り中心|0.03|0.17|
|4|単語中心（意図伝達）|0.03|0.20|
|5|単語中心（意図伝達）|0.04|0.23|
|6|単語中心（意図伝達）|0.05|0.25|
|7|単語中心（意図伝達）|0.06|0.28|
|8|単語中心（意図伝達）|0.07|0.32|
|9|単語中心（意図伝達）|0.07|0.35|
|10|単語中心（意図伝達）|0.08|0.38|
|11|単語中心（意図伝達）|0.09|0.42|
|12|単語中心（意図伝達）|0.10|0.45|
|13|単語中心（意図伝達）|0.12|0.48|
|14|単語中心（意図伝達）|0.15|0.52|
|15|単語中心（意図伝達）|0.17|0.55|
|16|2語〜短文|0.20|0.58|
|17|2語〜短文|0.23|0.62|
|18|2語〜短文|0.25|0.65|
|19|2語〜短文|0.28|0.67|
|20|2語〜短文|0.30|0.68|
|21|2語〜短文|0.33|0.70|
|22|2語〜短文|0.35|0.72|
|23|2語〜短文|0.38|0.73|
|24|2語〜短文|0.40|0.75|
|25|2語〜短文|0.42|0.76|
|26|3〜4語＋質問|0.45|0.77|
|27|3〜4語＋質問|0.47|0.78|
|28|3〜4語＋質問|0.50|0.78|
|29|3〜4語＋質問|0.53|0.79|
|30|3〜4語＋質問|0.55|0.80|
|31|3〜4語＋質問|0.58|0.81|
|32|3〜4語＋質問|0.62|0.82|
|33|物語/やりとりが伸びる|0.65|0.82|
|34|物語/やりとりが伸びる|0.68|0.83|
|35|物語/やりとりが伸びる|0.72|0.84|
|36|物語/やりとりが伸びる|0.75|0.85|
|37|物語/やりとりが伸びる|0.76|0.86|
|38|物語/やりとりが伸びる|0.78|0.86|
|39|物語/やりとりが伸びる|0.79|0.87|
|40|物語/やりとりが伸びる|0.80|0.87|
|41|物語/やりとりが伸びる|0.81|0.88|
|42|物語/やりとりが伸びる|0.82|0.89|
|43|物語/やりとりが伸びる|0.84|0.89|
|44|物語/やりとりが伸びる|0.85|0.90|
|45|物語/やりとりが伸びる|0.86|0.90|
|46|物語/やりとりが伸びる|0.88|0.91|
|47|物語/やりとりが伸びる|0.89|0.91|
|48|物語/やりとりが伸びる|0.90|0.92|

## 参考文献・出典
- [CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html)
- [CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html)
- [CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html)
- [CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html)
- [HealthyChildren.org: Language Development: 2 Year Olds](https://www.healthychildren.org/English/ages-stages/toddler/Pages/Language-Development-2-Year-Olds.aspx)