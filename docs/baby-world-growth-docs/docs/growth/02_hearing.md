# 聴覚（0〜48ヶ月）

聴覚（定位・音声への注意）を、アプリで扱えるproxyとして整理します。

## アプリでの対応フィールド（JSON）
- 直接反映：`months[n].renderParams.audio`（panningJitter / speechInNoiseSuggestedSNRdB）
- 状態：`months[n].senses.hearing`（localizationErrorDeg / speechSalience / stage）

## アンカー（根拠の強い節目）
- [ANCHOR] 0〜5歳：聴覚・発話・言語の一般向けマイルストーン整理。([Stanford Children's Health: Age-Appropriate Hearing, Speech and Language Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169))


## 発達の概観（区間別 / [ANCHOR]+[MODEL]）

- **0〜6ヶ月**：[MODEL] 大きな音への反射反応＋声・音への注意が増える。  
- **6〜12ヶ月**：[MODEL] 喃語のリズムが増え、音声に合わせた反応が増える。  
- **12〜24ヶ月**：[ANCHOR] “指示に従う/語が増える”など、聴覚→言語の接続が強まる帯として整理される。([Stanford Children's Health: Age-Appropriate Hearing, Speech and Language Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169) / [NIDCD: Speech and Language Developmental Milestones](https://www.nidcd.nih.gov/health/speech-and-language))
- **24〜48ヶ月**：[MODEL] 聞き分けは“聴力”ではなく、注意・語彙・文脈理解の増加として見せる（雑音下音声は“体験用”に留める）。

## 実装メモ
- `locErr` は「耳が悪い」ではなく **定位の不確かさ**の体験パラメータとして扱う（誤用防止）。
- 雑音下音声は `SNR(dB)` のスライダーを出し、月齢で“初期値”が変わる構図にする（評価UIは禁止）。


## 月次パラメータ（実装向け）
|月|ステージ|locErr(°)|speechSal|panningJitter|SNR(dB)提案|推奨タスク(例)|
|-:|---|---:|---:|---:|---:|---|
|0|反射反応＋声で落ち着く|80|0.40|0.89|6.0|A_LOCALIZE|
|1|反射反応＋声で落ち着く|74|0.45|0.82|5.2|A_LOCALIZE|
|2|音源方向へ向く|68|0.50|0.75|4.5|A_LOCALIZE|
|3|音源方向へ向く|61|0.54|0.68|3.9|A_LOCALIZE|
|4|音源方向へ向く|55|0.57|0.61|3.4|A_LOCALIZE|
|5|音源方向へ向く|51|0.61|0.57|2.8|A_LOCALIZE, A_SPEECH_IN_NOISE|
|6|名前/簡単語に反応が増える|48|0.65|0.53|2.2|A_LOCALIZE, A_SPEECH_IN_NOISE|
|7|名前/簡単語に反応が増える|44|0.68|0.49|1.9|A_LOCALIZE, A_SPEECH_IN_NOISE|
|8|名前/簡単語に反応が増える|40|0.70|0.44|1.5|A_LOCALIZE, A_SPEECH_IN_NOISE|
|9|名前/簡単語に反応が増える|36|0.72|0.40|1.1|A_LOCALIZE, A_SPEECH_IN_NOISE|
|10|名前/簡単語に反応が増える|32|0.75|0.36|0.8|A_LOCALIZE, A_SPEECH_IN_NOISE|
|11|名前/簡単語に反応が増える|29|0.78|0.32|0.4|A_LOCALIZE, A_SPEECH_IN_NOISE|
|12|指示理解が増える|25|0.80|0.28|0.0|A_LOCALIZE, A_SPEECH_IN_NOISE|
|13|指示理解が増える|24|0.81|0.27|-0.1|A_LOCALIZE, A_SPEECH_IN_NOISE|
|14|指示理解が増える|23|0.82|0.26|-0.2|A_LOCALIZE, A_SPEECH_IN_NOISE|
|15|指示理解が増える|22|0.82|0.25|-0.4|A_LOCALIZE, A_SPEECH_IN_NOISE|
|16|指示理解が増える|22|0.83|0.24|-0.5|A_LOCALIZE, A_SPEECH_IN_NOISE|
|17|指示理解が増える|21|0.84|0.23|-0.6|A_LOCALIZE, A_SPEECH_IN_NOISE|
|18|指示理解が増える|20|0.85|0.22|-0.8|A_LOCALIZE, A_SPEECH_IN_NOISE|
|19|指示理解が増える|19|0.86|0.21|-0.9|A_LOCALIZE, A_SPEECH_IN_NOISE|
|20|指示理解が増える|18|0.87|0.20|-1.0|A_LOCALIZE, A_SPEECH_IN_NOISE|
|21|指示理解が増える|18|0.88|0.19|-1.1|A_LOCALIZE, A_SPEECH_IN_NOISE|
|22|指示理解が増える|17|0.88|0.18|-1.2|A_LOCALIZE, A_SPEECH_IN_NOISE|
|23|指示理解が増える|16|0.89|0.18|-1.4|A_LOCALIZE, A_SPEECH_IN_NOISE|
|24|会話の聞き分けが増える|15|0.90|0.17|-1.5|A_LOCALIZE, A_SPEECH_IN_NOISE|
|25|会話の聞き分けが増える|15|0.90|0.16|-1.5|A_LOCALIZE, A_SPEECH_IN_NOISE|
|26|会話の聞き分けが増える|14|0.90|0.16|-1.6|A_LOCALIZE, A_SPEECH_IN_NOISE|
|27|会話の聞き分けが増える|14|0.91|0.16|-1.6|A_LOCALIZE, A_SPEECH_IN_NOISE|
|28|会話の聞き分けが増える|14|0.91|0.15|-1.6|A_LOCALIZE, A_SPEECH_IN_NOISE|
|29|会話の聞き分けが増える|14|0.91|0.15|-1.7|A_LOCALIZE, A_SPEECH_IN_NOISE|
|30|会話の聞き分けが増える|13|0.91|0.15|-1.7|A_LOCALIZE, A_SPEECH_IN_NOISE|
|31|会話の聞き分けが増える|13|0.92|0.14|-1.7|A_LOCALIZE, A_SPEECH_IN_NOISE|
|32|会話の聞き分けが増える|13|0.92|0.14|-1.8|A_LOCALIZE, A_SPEECH_IN_NOISE|
|33|会話の聞き分けが増える|12|0.92|0.14|-1.8|A_LOCALIZE, A_SPEECH_IN_NOISE|
|34|会話の聞き分けが増える|12|0.92|0.13|-1.8|A_LOCALIZE, A_SPEECH_IN_NOISE|
|35|会話の聞き分けが増える|12|0.92|0.13|-1.8|A_LOCALIZE, A_SPEECH_IN_NOISE|
|36|言葉遊び・語用|12|0.93|0.13|-1.9|A_LOCALIZE, A_SPEECH_IN_NOISE|
|37|言葉遊び・語用|11|0.93|0.12|-1.9|A_LOCALIZE, A_SPEECH_IN_NOISE|
|38|言葉遊び・語用|11|0.93|0.12|-1.9|A_LOCALIZE, A_SPEECH_IN_NOISE|
|39|言葉遊び・語用|11|0.93|0.12|-2.0|A_LOCALIZE, A_SPEECH_IN_NOISE|
|40|言葉遊び・語用|10|0.93|0.12|-2.0|A_LOCALIZE, A_SPEECH_IN_NOISE|
|41|言葉遊び・語用|10|0.94|0.11|-2.0|A_LOCALIZE, A_SPEECH_IN_NOISE|
|42|言葉遊び・語用|10|0.94|0.11|-2.1|A_LOCALIZE, A_SPEECH_IN_NOISE|
|43|言葉遊び・語用|10|0.94|0.10|-2.1|A_LOCALIZE, A_SPEECH_IN_NOISE|
|44|言葉遊び・語用|9|0.94|0.10|-2.1|A_LOCALIZE, A_SPEECH_IN_NOISE|
|45|言葉遊び・語用|9|0.94|0.10|-2.2|A_LOCALIZE, A_SPEECH_IN_NOISE|
|46|言葉遊び・語用|9|0.95|0.10|-2.2|A_LOCALIZE, A_SPEECH_IN_NOISE|
|47|言葉遊び・語用|8|0.95|0.09|-2.2|A_LOCALIZE, A_SPEECH_IN_NOISE|
|48|言葉遊び・語用|8|0.95|0.09|-2.2|A_LOCALIZE, A_SPEECH_IN_NOISE|

## 参考文献・出典
- [Stanford Children's Health: Age-Appropriate Hearing, Speech and Language Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)
- [NIDCD: Speech and Language Developmental Milestones](https://www.nidcd.nih.gov/health/speech-and-language)