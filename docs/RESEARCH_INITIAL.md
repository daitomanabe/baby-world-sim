# 0〜48ヶ月：赤ちゃんが「世界を獲得」していくプロセス（初期リサーチまとめ）

更新日: 2026-02-01

このドキュメントは、**誕生〜4歳（0〜48ヶ月 / 約0〜208週）** のあいだに、子どもが  
- 五感（視覚・聴覚・触覚・嗅覚・味覚）  
- 運動能力（粗大運動・微細運動）  
- 言語（理解→産出→会話）  
- 概念・社会性（注意共有／模倣／ごっこ／物語理解 など）  
をどう獲得していくかを、**アプリ実装に落とし込める形**で整理した「初期版」です。

---

## 0. 先に釘を刺す（重要）

- **週単位の“正確な”発達データは基本的に存在しません。**  
  あるのは「月齢・年齢レンジの目安（マイルストーン）」と、査読論文にある特定課題の結果です。  
  → アプリでは **週単位は“補間”**（曲線・確率・状態遷移）で扱うのが現実的です。
- **マイルストーンは診断ではありません。** 個人差は大きく、文化・言語環境・早産などで変わります。  
  **CDCは「チェックリストはスクリーニングや診断のツールではない」**と明記しています。  
  参考: [CDC: Key Points about CDC's Developmental Milestone Checklists](https://www.cdc.gov/act-early/milestones/key-points.html)

---

## 1. 証拠レベル（後で参照できるように）

このレポート内の各項目は、出典を次のタグで示します。

- **[GOV] 公的機関・ガイドライン**（例：CDC、厚労省）
- **[HOSP] 病院・医療機関の解説/ハンドアウト**（例：Nationwide Children's、Stanford Children's）
- **[PAPER] 査読論文（一次研究）**
- **[REVIEW] 査読レビュー（総説）**
- **[BOOK] 一般書/学術書**

---

## 2. 週・月の換算（UI設計用）

- 1ヶ月 ≈ **4.35週**（平均）  
- 48ヶ月 ≈ **208.7週**（平均）

> 注意：実装では「週→月齢」の変換は UI 用の近似でOK。厳密な暦（出生日起点）を使うのは“個別児”に踏み込むので避けた方が安全。

---

## 3. 年齢帯別タイムライン（統合）

以下は「アプリで週スライダーを動かしたときに、何が変化していくか」を掴むための統合ビューです。  
（より詳細な根拠は次章以降に集約）

### 0〜1ヶ月（0〜約4週）
- **視覚**：近距離（約8〜10インチ=20〜25cm）に焦点。白黒・明暗中心。目の協調運動は未熟。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses), [Infant Vision Birth to One Year](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year)
- **聴覚**：出生時に聴覚は機能し、突然の大きな音に驚く。親の声（高めの声）に注意を向けやすい。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses)
- **嗅覚**：新生児は嗅覚が強く、母親（特に母乳）の匂いを好む報告。 [HOSP][PAPER]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses), [Porter & Winberg 1999 (PubMed)](https://pubmed.ncbi.nlm.nih.gov/9989430/)
- **味覚**：甘味を好み、酸味・苦味を避けやすい。母乳への嗜好。 [HOSP][REVIEW]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses), [Mennella 2015 (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4654709/)
- **触覚**：触れることで落ち着く（抱く・手を当てる・くるむ等）。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses)
- **運動**：反射優位。首はまだ不安定。  
- **言語/コミュニケーション**：泣き声が主なコミュニケーション。 [GOV]  
  出典: [厚労省（Denver II 2003）言語発達のめやす](https://www.mhlw.go.jp/content/000348513.pdf)
- **概念/社会性**：顔を見つめる・自分から笑いかける（出生〜3ヶ月目安）。 [GOV]  
  出典: [厚労省（Denver II 2003）社会性のめやす](https://www.mhlw.go.jp/content/000348513.pdf)

---

### 2〜3ヶ月（約5〜13週）
- **視覚**：追視が進み、顔の認識・リーチ開始（視覚→運動が繋がり始める）。 [HOSP][GOV]  
  出典: [Infant Vision Birth to One Year](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year), [厚労省（Denver II 2003）微細運動のめやす](https://www.mhlw.go.jp/content/000348513.pdf)
- **聴覚**：声以外の発声（クーイング）や、あやすと笑う。 [GOV][HOSP]  
  出典: [厚労省（Denver II 2003）言語/社会性](https://www.mhlw.go.jp/content/000348513.pdf), [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)
- **運動（粗大）**：**3〜4ヶ月：首すわり**（目安）。 [GOV]  
  出典: [厚労省（Denver II 2003）運動発達のめやす](https://www.mhlw.go.jp/content/000348513.pdf)

---

### 4〜6ヶ月（約14〜26週）
- **視覚**：両眼を使った視（両眼視）と奥行き手がかりが強化。6ヶ月頃には色の見えが成人に近づく（目安）。 [HOSP]  
  出典: [Infant Vision Birth to One Year](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year)
- **聴覚/音声**：笑う・声のやりとり（ターンテイキング）が増える。声の方へ振り向く（5〜6ヶ月目安）。 [GOV][HOSP]  
  出典: [厚労省（Denver II 2003）言語発達](https://www.mhlw.go.jp/content/000348513.pdf), [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)
- **運動（粗大）**：**5〜6ヶ月：寝返り**（目安）。 [GOV]  
  出典: [厚労省（Denver II 2003）運動発達のめやす](https://www.mhlw.go.jp/content/000348513.pdf)

---

### 7〜9ヶ月（約27〜39週）
- **視覚×運動**：移動・手の操作が増え、距離判断と把持の連携が進む（「見る→動く」の学習）。 [HOSP]  
  出典: [Infant Vision Birth to One Year](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year)
- **聴覚/音声**：パ・ダ・マなどの喃語（7〜8ヶ月目安）。 [GOV][HOSP]  
  出典: [厚労省（Denver II 2003）言語発達](https://www.mhlw.go.jp/content/000348513.pdf), [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)
- **概念**：落とした物を探す（物が見えなくても存在する＝物の永続性の萌芽として扱える）。 [GOV]  
  出典: [CDC: Milestones by 9 Months](https://www.cdc.gov/act-early/milestones/9-months.html)
- **運動（粗大）**：**7〜8ヶ月：おすわり**、**9〜10ヶ月：つかまり立ち**（目安）。 [GOV]  
  出典: [厚労省（Denver II 2003）運動発達](https://www.mhlw.go.jp/content/000348513.pdf)

---

### 10〜12ヶ月（約40〜52週）
- **視覚**：追視・距離判断・つかむ動作がより安定。 [HOSP]  
  出典: [Infant Vision Birth to One Year](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year)
- **言語/コミュニケーション**：「意味ある1語」（14〜18ヶ月が目安だが、ジェスチャーや模倣が増える）。 [GOV][GOV]  
  出典: [CDC: Milestones by 1 Year](https://www.cdc.gov/act-early/milestones/1-year.html), [厚労省（Denver II 2003）言語発達](https://www.mhlw.go.jp/content/000348513.pdf)
- **概念**：隠した物を探す（より明確な物の永続性）。 [GOV]  
  出典: [CDC: Milestones by 1 Year](https://www.cdc.gov/act-early/milestones/1-year.html)
- **運動**：伝い歩き→歩行準備。 [GOV]  
  出典: [CDC: Milestones by 1 Year](https://www.cdc.gov/act-early/milestones/1-year.html)

---

### 13〜18ヶ月（約53〜78週）
- **運動（粗大）**：**12〜14ヶ月：ひとりで2秒立つ**、**15〜17ヶ月：上手に歩く**、**18〜20ヶ月：走る**（目安）。 [GOV]  
  出典: [厚労省（Denver II 2003）運動発達](https://www.mhlw.go.jp/content/000348513.pdf)
- **運動（微細）**：**14〜16ヶ月：なぐり書き**、**18〜19ヶ月：積み木2個**（目安）。 [GOV]  
  出典: [厚労省（Denver II 2003）微細運動](https://www.mhlw.go.jp/content/000348513.pdf)
- **言語**：**意味ある1語**（14〜18ヶ月目安）、18ヶ月では「ママ/パパ以外に3語以上」を試す（CDC）。 [GOV]  
  出典: [厚労省（Denver II 2003）言語発達](https://www.mhlw.go.jp/content/000348513.pdf), [CDC: Milestones by 18 Months](https://www.cdc.gov/act-early/milestones/18-months.html)
- **社会性/概念**：「指差しで興味を共有する」（注意共有の基礎として重要）。 [GOV]  
  出典: [CDC: Milestones by 18 Months](https://www.cdc.gov/act-early/milestones/18-months.html)

---

### 19〜24ヶ月（約79〜104週）
- **運動（粗大）**：**20〜22ヶ月：階段を登る**（目安）。 [GOV]  
  出典: [厚労省（Denver II 2003）運動発達](https://www.mhlw.go.jp/content/000348513.pdf)
- **言語**：**2歳頃：2語文**（「もっと ちょうだい」等）。 [GOV][HOSP]  
  出典: [厚労省（Denver II 2003）言語発達](https://www.mhlw.go.jp/content/000348513.pdf), [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)
- **CDC 2歳の運動**：走る、ボールを蹴る、階段を数段“歩いて”上がる、スプーンで食べる。 [GOV]  
  出典: [CDC: Milestones by 2 Years](https://www.cdc.gov/act-early/milestones/2-years.html)

---

### 25〜30ヶ月（約105〜130週）
- **言語**：語彙が増え、**約50語**・動詞入り2語以上など（目安）。 [HOSP][GOV]  
  出典: [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169), [CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html)
- **微細運動**：ドアノブを回す等の“ひねり”操作、ページを1枚ずつめくる、両足ジャンプ（30ヶ月の例）。 [GOV]  
  出典: [CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html)
- **社会性**：ごっこ遊びの強化（30ヶ月の育て方の例にも出てくる）。 [GOV]  
  出典: [CDC: Milestones by 30 Months](https://www.cdc.gov/act-early/milestones/30-months.html)

---

### 31〜36ヶ月（約131〜156週）
- **言語**：会話で2往復以上のやりとり、WH質問（誰/何/どこ/なぜ）、他者に伝わる発話。 [HOSP][GOV]  
  出典: [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169), [CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html)
- **概念/安全理解**：「熱いものに触らない」など、言語的警告と行動制御の連携。 [GOV]  
  出典: [CDC: Milestones by 3 Years](https://www.cdc.gov/act-early/milestones/3-years.html)
- **微細運動/表象**：3歳：縦線模倣、3歳半：○模倣（描く＝表象の外化）。 [GOV]  
  出典: [厚労省（Denver II 2003）微細運動](https://www.mhlw.go.jp/content/000348513.pdf)

---

### 37〜48ヶ月（約157〜209週）
- **言語**：4歳では「4語以上の文」「歌や物語の一部を言う」「今日あった出来事を話す」「用途を答える」等。 [GOV][HOSP]  
  出典: [CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html), [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)
- **概念/物語**：色をいくつか言える・有名な話の次を言える・人を描く（身体表象/構成）。 [GOV]  
  出典: [CDC: Milestones by 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html)
- **運動**：3.5〜4歳：けんけん、4〜5歳：片足立ち（目安）。 [GOV]  
  出典: [厚労省（Denver II 2003）運動発達](https://www.mhlw.go.jp/content/000348513.pdf)

---

## 4. 五感の発達（アプリで“見せる”ための要点）

### 4.1 視覚（表示できる領域）
**アプリ実装の観点：** 週スライダーに応じて、同一シーンに対して  
- 解像度/ぼけ（視力の近似）  
- 色（彩度・色域）  
- コントラスト  
- 視野の“安定性”（追視の滑らかさ）  
- 奥行き（深度手がかりの信頼度）  
を変化させると、「世界の獲得感」が出る。

根拠の核：
- 新生児：近距離に焦点（8〜10インチ）、明暗は見えるが色は未熟。追視は初週から。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses)
- 1週〜：色覚が徐々に。6ヶ月頃には成人と同様の色の見え（目安）。 [HOSP]  
  出典: [Infant Vision Birth to One Year](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year)
- 4ヶ月：両眼視と奥行き。 [HOSP]  
  出典: [Infant Vision Birth to One Year](https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year)
- 視力（焦点）の完成は2〜3年スケールで進む（20/20へ）。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses)

---

### 4.2 聴覚（音として表示できる領域）
**アプリ実装の観点：**  
- 音の方向定位の誤差（左右/前後の曖昧さ）  
- 音声の聞き取り（語境界の推定、雑音耐性）  
- 音への注意（突然音→驚愕、親の声→注意）  
を変化させる。

根拠の核：
- 出生時：聴覚は機能し、大きな音に驚く。親の声に注意を向けやすい。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses)
- 0〜5歳の「聞こえ/話す」マイルストーン（年齢帯ごとに整理されている）。 [HOSP]  
  出典: [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)

---

### 4.3 嗅覚（再現不可 → テキスト/グラフで見せる）
**アプリ実装の観点：**  
- 「母親の匂い」「母乳の匂い」など**“意味のある匂い”が行動を誘導する**、というストーリーにする。  
- 画面上は **“匂いのサリエンス”**（0〜1）を状態量として表示し、探索行動（頭の向き・吸啜・落ち着き）に結びつける。

根拠の核：
- 新生児は嗅覚が強く、母親（母乳）の匂いを好む。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses)
- 出生直後から乳房部の匂いが頭部定位などを誘発し、吸啜に寄与しうる（総説の要約）。 [PAPER]  
  出典: [Porter & Winberg 1999 (PubMed)](https://pubmed.ncbi.nlm.nih.gov/9989430/)
- 生後2日でも、皮膚接触などの条件下で母の体臭を弁別できた報告。 [PAPER]  
  出典: [Marin et al. 2015 (PubMed)](https://pubmed.ncbi.nlm.nih.gov/25524143/)
- 嗅覚が発達を“足場がけ”するという総説（背景読みとして有用）。 [REVIEW]  
  出典: [Royal Society: Olfaction scaffolds the developing human (2020)](https://royalsocietypublishing.org/rstb/article/375/1800/20190261/30648/Olfaction-scaffolds-the-developing-human-from)

---

### 4.4 味覚（再現不可 → テキスト/グラフで見せる）
**アプリ実装の観点：**  
- 乳幼児は甘味嗜好が強い（しかも大人より強い）という“生物学的バイアス”を前提にする。  
- 離乳食・偏食は「環境」と「生得的嗜好」の相互作用として扱う。

根拠の核：
- 新生児は甘味を好み、酸味・苦味を避けやすい。母乳嗜好。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses)
- 子どもの甘味嗜好／苦味忌避は基本生物学に根ざし、甘味嗜好は成長と関連しうる（総説）。 [REVIEW]  
  出典: [Mennella 2015 (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4654709/)
- 甘味嗜好は生得的要因＋学習要因の双方で説明される（総説）。 [REVIEW]  
  出典: [Ventura & Mennella 2011 (PubMed)](https://pubmed.ncbi.nlm.nih.gov/21508837/)

---

### 4.5 触覚（再現不可 → テキスト/グラフで見せる）
**アプリ実装の観点：**  
- 触覚は“安心・自己調整・愛着”の核として描くと筋が通る。  
- UIでは「触刺激（抱く/皮膚接触/くるむ）の強度→落ち着き（泣き止む/心拍/覚醒）への影響」を可視化。

根拠の核：
- 新生児は触れられることで安心する。 [HOSP]  
  出典: [Newborn Senses](https://www.nationwidechildrens.org/conditions/health-library/newborn-senses)

---

## 5. 運動能力（粗大/微細）を“曲線化”するための骨格

**厚労省資料（Denver II, 2003 より）**は、月齢帯での“めやす”がまとまっていて実装に便利です。 [GOV]  
出典: [厚生労働省「記入のめやすと一覧表」（PDF）](https://www.mhlw.go.jp/content/000348513.pdf)

### 5.1 粗大運動（抜粋）
- 3〜4ヶ月：首すわり  
- 5〜6ヶ月：寝返り  
- 7〜8ヶ月：おすわり  
- 9〜10ヶ月：つかまり立ち  
- 15〜17ヶ月：上手に歩く  
- 18〜20ヶ月：走る  
- 2〜2歳半：両足ジャンプ  
- 3歳半〜4歳：けんけん  
- 4〜5歳：片足立ち

### 5.2 微細運動（抜粋）
- 5ヶ月頃：物に手を伸ばす  
- 9〜10ヶ月頃：親指を使ってつかむ（つまみ動作）  
- 14〜16ヶ月頃：自発的ななぐり書き  
- 18〜19ヶ月頃：積み木2個  
- 2歳頃：積み木6個  
- 3歳半頃：○を模倣  
- 4歳半頃：□を模倣

> 実装方針：これらを「到達/未到達」の二値ではなく、  
> **成功確率が0→1へ滑らかに上がるS字曲線**（個人差ノイズ付き）として扱うと、週単位UIでも破綻しにくい。

---

## 6. 言語獲得（理解→産出→会話）を“状態遷移”として扱う

### 6.1 根拠として強い骨格（ガイドライン側）
- **NIDCD**：最初の3年は音声と言語獲得が最も集中的で、豊かな音・視覚・言語曝露が重要。6ヶ月頃には多くの赤ちゃんが母語の基本音を認識。 [GOV]  
  出典: [NIDCD: Speech and Language Developmental Milestones](https://www.nidcd.nih.gov/health/speech-and-language)
- **Stanford**：0〜5歳の“聞こえ/話す”マイルストーンが年齢帯で整理。 [HOSP]  
  出典: [Stanford: Hearing/Speech Milestones](https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169)
- **厚労省（Denver II 2003）**：出生時〜5歳程度までの言語のめやす。 [GOV]  
  出典: [厚労省PDF](https://www.mhlw.go.jp/content/000348513.pdf)

### 6.2 アプリで見せるべき“言語の段階”案
週スライダーに対して、次の状態が積み上がるように見せると理解しやすい。

1. **音への反応（0〜）**：音源定位／親の声の優位  
2. **音の生成（2〜6ヶ月）**：クーイング→喃語  
3. **ジェスチャー（9〜18ヶ月）**：指差し・バイバイ・要求  
4. **語彙（12〜30ヶ月）**：意味のある1語→50語規模  
5. **結合（18〜36ヶ月）**：2語文→会話の往復  
6. **物語化（36〜48ヶ月）**：出来事を語る／用途質問に答える

---

## 7. 概念・社会性（“世界モデル”としての獲得）

**ここは誤解しやすい。** 「概念が増える＝知識量が増える」ではなく、  
- 注意の制御  
- 他者との注意共有（共同注意）  
- 模倣  
- 予測（次に何が起こるか）  
が統合されて、**“行動が賢く見える”**ようになっていく、と捉えた方がアプリに落としやすい。

実装上は、概念を「語彙の数」として直接シミュレーションするより、  
**“できるタスク”の増加（カード表示）**として見せるのが安全で強い。

例：
- 9ヶ月：見えなくなった物を探す（落下したスプーン等） [GOV]  
  出典: [CDC: 9 Months](https://www.cdc.gov/act-early/milestones/9-months.html)
- 1歳：隠した物を探す（玩具を布の下に隠す等） [GOV]  
  出典: [CDC: 1 Year](https://www.cdc.gov/act-early/milestones/1-year.html)
- 18ヶ月：指差しで興味共有、家事模倣 [GOV]  
  出典: [CDC: 18 Months](https://www.cdc.gov/act-early/milestones/18-months.html)
- 4歳：物語の次を言う、色をいくつか言う、出来事を語る [GOV]  
  出典: [CDC: 4 Years](https://www.cdc.gov/act-early/milestones/4-years.html)

---

## 8. 推奨リーディング（研究→一般書の橋渡し）

**目的：** アプリの“解釈モデル”を作るために、論文だけでは足りない背景を補う。

- [BOOK] **アリソン・ゴプニック『哲学する赤ちゃん』**（亜紀書房）  
  出典（書誌情報）: [books.or.jp](https://www.books.or.jp/book-details/9784750510118)
- [BOOK] **アリソン・ゴプニック『思いどおりになんて育たない 反ペアレンティングの科学』**（森北出版）  
  出典（出版社）: [森北出版](https://www.morikita.co.jp/books/mid/085431)
- [BOOK] **Gopnik / Meltzoff / Kuhl, _The Scientist in the Crib_ (1999)**  
  出典（書誌情報）: [Internet Archive](https://archive.org/details/scientistincribm0000gopn)

---

## 9. 参考リンク（ガイドラインの“母艦”）

- [GOV] CDC Developmental Milestones（年齢一覧）  
  https://www.cdc.gov/act-early/milestones/index.html
- [GOV] CDC Key Points（チェックリストの意図・75%基準・注意事項）  
  https://www.cdc.gov/act-early/milestones/key-points.html
- [GOV] 厚労省「記入のめやすと一覧表」（Denver II 2003ベースの運動・言語・社会性の目安表が含まれる）  
  https://www.mhlw.go.jp/content/000348513.pdf

---

## 10. 次のリサーチ（この初期版の穴）

このままだとアプリの説得力が落ちるので、次に埋めるべきギャップを明示しておきます。

1. **視覚の“空間周波数/コントラスト感度”を年齢でどう近似するか**（より定量的な論文が必要）  
2. **聴覚の“音源定位”と“雑音下音声知覚”の発達曲線**（定量化の余地が大きい）  
3. **触覚・固有感覚・前庭感覚（バランス）の発達**（運動シミュレーションの説得力が上がる）  
4. **共同注意〜心の理論（Theory of Mind）まで**の発達の“見せ方”（誤解されにくい表現設計）

---

