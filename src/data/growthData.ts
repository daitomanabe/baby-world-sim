/**
 * Comprehensive Growth Data (0-48 months)
 *
 * Based on documentation from docs/baby-world-growth-docs/docs/growth/
 * Contains monthly parameters for all 10 developmental domains:
 * 1. Vision (01_vision.md)
 * 2. Hearing (02_hearing.md)
 * 3. Touch (03_touch.md)
 * 4. Taste (04_taste.md)
 * 5. Smell (05_smell.md)
 * 6. Concepts/Cognition (06_concepts.md)
 * 7. Language (07_language.md)
 * 8. Conversation (08_conversation.md)
 * 9. Numeracy (09_numeracy.md)
 * 10. Literacy (10_literacy.md)
 *
 * [ANCHOR] = Evidence-based milestone
 * [MODEL] = Interpolated/proxy value (not for diagnostic use)
 */

// ============================================================================
// Types
// ============================================================================

export interface VisionData {
  stage: string;
  clarity: number;
  depth: number;
  semantic: number;
  blurPx: number;
  depthCue: number;
  semanticAlpha: number;
}

export interface HearingData {
  stage: string;
  localizationErrorDeg: number;
  speechSalience: number;
  panningJitter: number;
  suggestedSNRdB: number;
}

export interface TouchData {
  stage: string;
  mouthExploration: number;
  handExploration: number;
  toolUse: number;
}

export interface TasteData {
  stage: string;
  saltSensitivity: number;
  neophobia: number;
}

export interface SmellData {
  discrimination: number;
}

export interface CognitionData {
  stage: string;
  objectPermanence: number;
  jointAttention: number;
  pretendPlay: number;
  causalReasoning: number;
  theoryOfMind: number;
  featureToMeaning: number;
}

export interface LanguageData {
  stage: string;
  receptive: number;
  expressive: number;
  vocabularyProxy: number;
  syntaxProxy: number;
  pragmaticsProxy: number;
}

export interface ConversationData {
  stage: string;
  syntaxProxy: number;
  pragmaticsProxy: number;
}

export interface NumeracyData {
  stage: string;
  numberWords: number;
  counting: number;
  quantityCorrespondence: number;
  simpleAddition: number;
}

export interface LiteracyData {
  stage: string;
  bookInterest: number;
  printConcept: number;
  letterKnowledge: number;
  phonologicalAwareness: number;
  nameWriting: number;
}

export interface MonthlyGrowthData {
  month: number;
  vision: VisionData;
  hearing: HearingData;
  touch: TouchData;
  taste: TasteData;
  smell: SmellData;
  cognition: CognitionData;
  language: LanguageData;
  conversation: ConversationData;
  numeracy: NumeracyData;
  literacy: LiteracyData;
}

// ============================================================================
// Vision Data (01_vision.md)
// ============================================================================

const VISION_DATA: VisionData[] = [
  { stage: "2D手がかり中心（近距離/コントラスト）", clarity: 0.15, depth: 0.05, semantic: 0.05, blurPx: 15.3, depthCue: 0.05, semanticAlpha: 0.00 },
  { stage: "2D手がかり中心（近距離/コントラスト）", clarity: 0.20, depth: 0.07, semantic: 0.06, blurPx: 14.4, depthCue: 0.07, semanticAlpha: 0.00 },
  { stage: "2D手がかり中心（近距離/コントラスト）", clarity: 0.25, depth: 0.10, semantic: 0.07, blurPx: 13.5, depthCue: 0.10, semanticAlpha: 0.00 },
  { stage: "2D優位 + 3Dの芽生え", clarity: 0.30, depth: 0.23, semantic: 0.07, blurPx: 12.6, depthCue: 0.23, semanticAlpha: 0.00 },
  { stage: "3D手がかりが増える", clarity: 0.35, depth: 0.35, semantic: 0.08, blurPx: 11.7, depthCue: 0.35, semanticAlpha: 0.00 },
  { stage: "3D手がかりが増える", clarity: 0.40, depth: 0.47, semantic: 0.09, blurPx: 10.8, depthCue: 0.47, semanticAlpha: 0.00 },
  { stage: "3D手がかりが増える", clarity: 0.45, depth: 0.60, semantic: 0.10, blurPx: 9.9, depthCue: 0.60, semanticAlpha: 0.00 },
  { stage: "3D手がかりが増える", clarity: 0.49, depth: 0.64, semantic: 0.12, blurPx: 9.2, depthCue: 0.64, semanticAlpha: 0.00 },
  { stage: "3D手がかりが増える", clarity: 0.53, depth: 0.68, semantic: 0.15, blurPx: 8.4, depthCue: 0.68, semanticAlpha: 0.00 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.57, depth: 0.72, semantic: 0.17, blurPx: 7.7, depthCue: 0.72, semanticAlpha: 0.03 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.62, depth: 0.77, semantic: 0.20, blurPx: 6.9, depthCue: 0.77, semanticAlpha: 0.06 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.66, depth: 0.81, semantic: 0.23, blurPx: 6.2, depthCue: 0.81, semanticAlpha: 0.09 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.70, depth: 0.85, semantic: 0.25, blurPx: 5.4, depthCue: 0.85, semanticAlpha: 0.12 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.71, depth: 0.86, semantic: 0.28, blurPx: 5.2, depthCue: 0.86, semanticAlpha: 0.15 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.72, depth: 0.87, semantic: 0.30, blurPx: 5.0, depthCue: 0.87, semanticAlpha: 0.18 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.74, depth: 0.88, semantic: 0.33, blurPx: 4.7, depthCue: 0.88, semanticAlpha: 0.21 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.75, depth: 0.88, semantic: 0.35, blurPx: 4.5, depthCue: 0.88, semanticAlpha: 0.23 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.76, depth: 0.89, semantic: 0.38, blurPx: 4.3, depthCue: 0.89, semanticAlpha: 0.27 },
  { stage: "3Dが安定（空間探索が拡張）", clarity: 0.78, depth: 0.90, semantic: 0.40, blurPx: 4.0, depthCue: 0.90, semanticAlpha: 0.29 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.79, depth: 0.91, semantic: 0.42, blurPx: 3.8, depthCue: 0.91, semanticAlpha: 0.32 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.80, depth: 0.92, semantic: 0.45, blurPx: 3.6, depthCue: 0.92, semanticAlpha: 0.35 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.81, depth: 0.93, semantic: 0.47, blurPx: 3.4, depthCue: 0.93, semanticAlpha: 0.38 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.82, depth: 0.93, semantic: 0.50, blurPx: 3.1, depthCue: 0.93, semanticAlpha: 0.41 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.84, depth: 0.94, semantic: 0.53, blurPx: 2.9, depthCue: 0.94, semanticAlpha: 0.44 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.85, depth: 0.95, semantic: 0.55, blurPx: 2.7, depthCue: 0.95, semanticAlpha: 0.47 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.85, depth: 0.95, semantic: 0.57, blurPx: 2.6, depthCue: 0.95, semanticAlpha: 0.49 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.86, depth: 0.95, semantic: 0.58, blurPx: 2.5, depthCue: 0.95, semanticAlpha: 0.51 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.86, depth: 0.96, semantic: 0.60, blurPx: 2.5, depthCue: 0.96, semanticAlpha: 0.53 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.87, depth: 0.96, semantic: 0.62, blurPx: 2.4, depthCue: 0.96, semanticAlpha: 0.55 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.87, depth: 0.96, semantic: 0.63, blurPx: 2.3, depthCue: 0.96, semanticAlpha: 0.57 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.88, depth: 0.96, semantic: 0.65, blurPx: 2.2, depthCue: 0.96, semanticAlpha: 0.59 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.88, depth: 0.96, semantic: 0.67, blurPx: 2.2, depthCue: 0.96, semanticAlpha: 0.61 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.88, depth: 0.97, semantic: 0.68, blurPx: 2.1, depthCue: 0.97, semanticAlpha: 0.63 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.89, depth: 0.97, semantic: 0.70, blurPx: 2.0, depthCue: 0.97, semanticAlpha: 0.65 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.89, depth: 0.97, semantic: 0.72, blurPx: 1.9, depthCue: 0.97, semanticAlpha: 0.67 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.90, depth: 0.97, semantic: 0.73, blurPx: 1.9, depthCue: 0.97, semanticAlpha: 0.69 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.90, depth: 0.97, semantic: 0.75, blurPx: 1.8, depthCue: 0.97, semanticAlpha: 0.71 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.90, depth: 0.98, semantic: 0.76, blurPx: 1.7, depthCue: 0.98, semanticAlpha: 0.72 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.91, depth: 0.98, semantic: 0.78, blurPx: 1.6, depthCue: 0.98, semanticAlpha: 0.73 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.91, depth: 0.98, semantic: 0.79, blurPx: 1.6, depthCue: 0.98, semanticAlpha: 0.75 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.92, depth: 0.98, semantic: 0.80, blurPx: 1.5, depthCue: 0.98, semanticAlpha: 0.77 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.92, depth: 0.98, semantic: 0.81, blurPx: 1.4, depthCue: 0.98, semanticAlpha: 0.78 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.93, depth: 0.99, semantic: 0.82, blurPx: 1.4, depthCue: 0.99, semanticAlpha: 0.79 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.93, depth: 0.99, semantic: 0.84, blurPx: 1.3, depthCue: 0.99, semanticAlpha: 0.81 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.93, depth: 0.99, semantic: 0.85, blurPx: 1.2, depthCue: 0.99, semanticAlpha: 0.82 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.94, depth: 0.99, semantic: 0.86, blurPx: 1.1, depthCue: 0.99, semanticAlpha: 0.84 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.94, depth: 1.00, semantic: 0.88, blurPx: 1.1, depthCue: 1.00, semanticAlpha: 0.85 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.95, depth: 1.00, semantic: 0.89, blurPx: 1.0, depthCue: 1.00, semanticAlpha: 0.87 },
  { stage: "3Dの使いこなし（意味づけと結合）", clarity: 0.95, depth: 1.00, semantic: 0.90, blurPx: 0.9, depthCue: 1.00, semanticAlpha: 0.88 },
];

// ============================================================================
// Hearing Data (02_hearing.md)
// ============================================================================

const HEARING_DATA: HearingData[] = [
  { stage: "反射反応＋声で落ち着く", localizationErrorDeg: 80, speechSalience: 0.40, panningJitter: 0.89, suggestedSNRdB: 6.0 },
  { stage: "反射反応＋声で落ち着く", localizationErrorDeg: 74, speechSalience: 0.45, panningJitter: 0.82, suggestedSNRdB: 5.2 },
  { stage: "音源方向へ向く", localizationErrorDeg: 68, speechSalience: 0.50, panningJitter: 0.75, suggestedSNRdB: 4.5 },
  { stage: "音源方向へ向く", localizationErrorDeg: 61, speechSalience: 0.54, panningJitter: 0.68, suggestedSNRdB: 3.9 },
  { stage: "音源方向へ向く", localizationErrorDeg: 55, speechSalience: 0.57, panningJitter: 0.61, suggestedSNRdB: 3.4 },
  { stage: "音源方向へ向く", localizationErrorDeg: 51, speechSalience: 0.61, panningJitter: 0.57, suggestedSNRdB: 2.8 },
  { stage: "名前/簡単語に反応が増える", localizationErrorDeg: 48, speechSalience: 0.65, panningJitter: 0.53, suggestedSNRdB: 2.2 },
  { stage: "名前/簡単語に反応が増える", localizationErrorDeg: 44, speechSalience: 0.68, panningJitter: 0.49, suggestedSNRdB: 1.9 },
  { stage: "名前/簡単語に反応が増える", localizationErrorDeg: 40, speechSalience: 0.70, panningJitter: 0.44, suggestedSNRdB: 1.5 },
  { stage: "名前/簡単語に反応が増える", localizationErrorDeg: 36, speechSalience: 0.72, panningJitter: 0.40, suggestedSNRdB: 1.1 },
  { stage: "名前/簡単語に反応が増える", localizationErrorDeg: 32, speechSalience: 0.75, panningJitter: 0.36, suggestedSNRdB: 0.8 },
  { stage: "名前/簡単語に反応が増える", localizationErrorDeg: 29, speechSalience: 0.78, panningJitter: 0.32, suggestedSNRdB: 0.4 },
  { stage: "指示理解が増える", localizationErrorDeg: 25, speechSalience: 0.80, panningJitter: 0.28, suggestedSNRdB: 0.0 },
  { stage: "指示理解が増える", localizationErrorDeg: 24, speechSalience: 0.81, panningJitter: 0.27, suggestedSNRdB: -0.1 },
  { stage: "指示理解が増える", localizationErrorDeg: 23, speechSalience: 0.82, panningJitter: 0.26, suggestedSNRdB: -0.2 },
  { stage: "指示理解が増える", localizationErrorDeg: 22, speechSalience: 0.82, panningJitter: 0.25, suggestedSNRdB: -0.4 },
  { stage: "指示理解が増える", localizationErrorDeg: 22, speechSalience: 0.83, panningJitter: 0.24, suggestedSNRdB: -0.5 },
  { stage: "指示理解が増える", localizationErrorDeg: 21, speechSalience: 0.84, panningJitter: 0.23, suggestedSNRdB: -0.6 },
  { stage: "指示理解が増える", localizationErrorDeg: 20, speechSalience: 0.85, panningJitter: 0.22, suggestedSNRdB: -0.8 },
  { stage: "指示理解が増える", localizationErrorDeg: 19, speechSalience: 0.86, panningJitter: 0.21, suggestedSNRdB: -0.9 },
  { stage: "指示理解が増える", localizationErrorDeg: 18, speechSalience: 0.87, panningJitter: 0.20, suggestedSNRdB: -1.0 },
  { stage: "指示理解が増える", localizationErrorDeg: 18, speechSalience: 0.88, panningJitter: 0.19, suggestedSNRdB: -1.1 },
  { stage: "指示理解が増える", localizationErrorDeg: 17, speechSalience: 0.88, panningJitter: 0.18, suggestedSNRdB: -1.2 },
  { stage: "指示理解が増える", localizationErrorDeg: 16, speechSalience: 0.89, panningJitter: 0.18, suggestedSNRdB: -1.4 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 15, speechSalience: 0.90, panningJitter: 0.17, suggestedSNRdB: -1.5 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 15, speechSalience: 0.90, panningJitter: 0.16, suggestedSNRdB: -1.5 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 14, speechSalience: 0.90, panningJitter: 0.16, suggestedSNRdB: -1.6 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 14, speechSalience: 0.91, panningJitter: 0.16, suggestedSNRdB: -1.6 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 14, speechSalience: 0.91, panningJitter: 0.15, suggestedSNRdB: -1.6 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 14, speechSalience: 0.91, panningJitter: 0.15, suggestedSNRdB: -1.7 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 13, speechSalience: 0.91, panningJitter: 0.15, suggestedSNRdB: -1.7 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 13, speechSalience: 0.92, panningJitter: 0.14, suggestedSNRdB: -1.7 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 13, speechSalience: 0.92, panningJitter: 0.14, suggestedSNRdB: -1.8 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 12, speechSalience: 0.92, panningJitter: 0.14, suggestedSNRdB: -1.8 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 12, speechSalience: 0.92, panningJitter: 0.13, suggestedSNRdB: -1.8 },
  { stage: "会話の聞き分けが増える", localizationErrorDeg: 12, speechSalience: 0.92, panningJitter: 0.13, suggestedSNRdB: -1.8 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 12, speechSalience: 0.93, panningJitter: 0.13, suggestedSNRdB: -1.9 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 11, speechSalience: 0.93, panningJitter: 0.12, suggestedSNRdB: -1.9 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 11, speechSalience: 0.93, panningJitter: 0.12, suggestedSNRdB: -1.9 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 11, speechSalience: 0.93, panningJitter: 0.12, suggestedSNRdB: -2.0 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 10, speechSalience: 0.93, panningJitter: 0.12, suggestedSNRdB: -2.0 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 10, speechSalience: 0.94, panningJitter: 0.11, suggestedSNRdB: -2.0 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 10, speechSalience: 0.94, panningJitter: 0.11, suggestedSNRdB: -2.1 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 10, speechSalience: 0.94, panningJitter: 0.10, suggestedSNRdB: -2.1 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 9, speechSalience: 0.94, panningJitter: 0.10, suggestedSNRdB: -2.1 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 9, speechSalience: 0.94, panningJitter: 0.10, suggestedSNRdB: -2.2 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 9, speechSalience: 0.95, panningJitter: 0.10, suggestedSNRdB: -2.2 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 8, speechSalience: 0.95, panningJitter: 0.09, suggestedSNRdB: -2.2 },
  { stage: "言葉遊び・語用", localizationErrorDeg: 8, speechSalience: 0.95, panningJitter: 0.09, suggestedSNRdB: -2.2 },
];

// ============================================================================
// Touch Data (03_touch.md)
// ============================================================================

const TOUCH_DATA: TouchData[] = [
  { stage: "口探索が主", mouthExploration: 1.00, handExploration: 0.10, toolUse: 0.00 },
  { stage: "口探索が主", mouthExploration: 0.89, handExploration: 0.22, toolUse: 0.01 },
  { stage: "口探索が主", mouthExploration: 0.78, handExploration: 0.33, toolUse: 0.02 },
  { stage: "口探索が主", mouthExploration: 0.68, handExploration: 0.45, toolUse: 0.03 },
  { stage: "口探索が主", mouthExploration: 0.57, handExploration: 0.57, toolUse: 0.03 },
  { stage: "手探索が主", mouthExploration: 0.46, handExploration: 0.68, toolUse: 0.04 },
  { stage: "手探索が主", mouthExploration: 0.35, handExploration: 0.80, toolUse: 0.05 },
  { stage: "手探索が主", mouthExploration: 0.33, handExploration: 0.79, toolUse: 0.07 },
  { stage: "手探索が主", mouthExploration: 0.31, handExploration: 0.78, toolUse: 0.09 },
  { stage: "手探索が主", mouthExploration: 0.29, handExploration: 0.76, toolUse: 0.11 },
  { stage: "手探索が主", mouthExploration: 0.27, handExploration: 0.75, toolUse: 0.13 },
  { stage: "手探索が主", mouthExploration: 0.25, handExploration: 0.74, toolUse: 0.15 },
  { stage: "手探索が主", mouthExploration: 0.23, handExploration: 0.72, toolUse: 0.17 },
  { stage: "手探索が主", mouthExploration: 0.20, handExploration: 0.71, toolUse: 0.20 },
  { stage: "手探索が主", mouthExploration: 0.18, handExploration: 0.70, toolUse: 0.22 },
  { stage: "手探索が主", mouthExploration: 0.16, handExploration: 0.69, toolUse: 0.24 },
  { stage: "手探索が主", mouthExploration: 0.14, handExploration: 0.68, toolUse: 0.26 },
  { stage: "手探索が主", mouthExploration: 0.12, handExploration: 0.66, toolUse: 0.28 },
  { stage: "手探索が主", mouthExploration: 0.10, handExploration: 0.65, toolUse: 0.30 },
  { stage: "手探索が主", mouthExploration: 0.10, handExploration: 0.64, toolUse: 0.35 },
  { stage: "手探索が主", mouthExploration: 0.10, handExploration: 0.64, toolUse: 0.40 },
  { stage: "手探索が主", mouthExploration: 0.10, handExploration: 0.63, toolUse: 0.45 },
  { stage: "手探索が主", mouthExploration: 0.09, handExploration: 0.62, toolUse: 0.50 },
  { stage: "手探索が主", mouthExploration: 0.09, handExploration: 0.62, toolUse: 0.55 },
  { stage: "手探索が主", mouthExploration: 0.09, handExploration: 0.61, toolUse: 0.60 },
  { stage: "道具/操作が主", mouthExploration: 0.09, handExploration: 0.60, toolUse: 0.62 },
  { stage: "道具/操作が主", mouthExploration: 0.09, handExploration: 0.60, toolUse: 0.63 },
  { stage: "道具/操作が主", mouthExploration: 0.09, handExploration: 0.59, toolUse: 0.65 },
  { stage: "道具/操作が主", mouthExploration: 0.08, handExploration: 0.58, toolUse: 0.67 },
  { stage: "道具/操作が主", mouthExploration: 0.08, handExploration: 0.58, toolUse: 0.68 },
  { stage: "道具/操作が主", mouthExploration: 0.08, handExploration: 0.57, toolUse: 0.70 },
  { stage: "道具/操作が主", mouthExploration: 0.08, handExploration: 0.56, toolUse: 0.72 },
  { stage: "道具/操作が主", mouthExploration: 0.08, handExploration: 0.56, toolUse: 0.73 },
  { stage: "道具/操作が主", mouthExploration: 0.07, handExploration: 0.55, toolUse: 0.75 },
  { stage: "道具/操作が主", mouthExploration: 0.07, handExploration: 0.54, toolUse: 0.77 },
  { stage: "道具/操作が主", mouthExploration: 0.07, handExploration: 0.54, toolUse: 0.78 },
  { stage: "道具/操作が主", mouthExploration: 0.07, handExploration: 0.53, toolUse: 0.80 },
  { stage: "道具/操作が主", mouthExploration: 0.07, handExploration: 0.52, toolUse: 0.81 },
  { stage: "道具/操作が主", mouthExploration: 0.07, handExploration: 0.52, toolUse: 0.82 },
  { stage: "道具/操作が主", mouthExploration: 0.07, handExploration: 0.51, toolUse: 0.82 },
  { stage: "道具/操作が主", mouthExploration: 0.06, handExploration: 0.50, toolUse: 0.83 },
  { stage: "道具/操作が主", mouthExploration: 0.06, handExploration: 0.50, toolUse: 0.84 },
  { stage: "道具/操作が主", mouthExploration: 0.06, handExploration: 0.49, toolUse: 0.85 },
  { stage: "道具/操作が主", mouthExploration: 0.06, handExploration: 0.48, toolUse: 0.86 },
  { stage: "道具/操作が主", mouthExploration: 0.06, handExploration: 0.48, toolUse: 0.87 },
  { stage: "道具/操作が主", mouthExploration: 0.06, handExploration: 0.47, toolUse: 0.88 },
  { stage: "道具/操作が主", mouthExploration: 0.05, handExploration: 0.46, toolUse: 0.88 },
  { stage: "道具/操作が主", mouthExploration: 0.05, handExploration: 0.46, toolUse: 0.89 },
  { stage: "道具/操作が主", mouthExploration: 0.05, handExploration: 0.45, toolUse: 0.90 },
];

// ============================================================================
// Taste Data (04_taste.md)
// ============================================================================

const TASTE_DATA: TasteData[] = [
  { stage: "甘味優位（塩味は未成熟）", saltSensitivity: 0.00, neophobia: 0.00 },
  { stage: "甘味優位（塩味は未成熟）", saltSensitivity: 0.05, neophobia: 0.01 },
  { stage: "甘味優位（塩味は未成熟）", saltSensitivity: 0.10, neophobia: 0.03 },
  { stage: "甘味優位（塩味は未成熟）", saltSensitivity: 0.15, neophobia: 0.04 },
  { stage: "塩味が芽生える", saltSensitivity: 0.20, neophobia: 0.05 },
  { stage: "塩味が芽生える", saltSensitivity: 0.40, neophobia: 0.06 },
  { stage: "離乳期：味/匂い/食感の経験が拡張", saltSensitivity: 0.60, neophobia: 0.07 },
  { stage: "離乳期：味/匂い/食感の経験が拡張", saltSensitivity: 0.64, neophobia: 0.09 },
  { stage: "離乳期：味/匂い/食感の経験が拡張", saltSensitivity: 0.68, neophobia: 0.10 },
  { stage: "離乳期：味/匂い/食感の経験が拡張", saltSensitivity: 0.72, neophobia: 0.11 },
  { stage: "離乳期：味/匂い/食感の経験が拡張", saltSensitivity: 0.77, neophobia: 0.12 },
  { stage: "離乳期：味/匂い/食感の経験が拡張", saltSensitivity: 0.81, neophobia: 0.14 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.85, neophobia: 0.15 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.86, neophobia: 0.22 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.88, neophobia: 0.28 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.89, neophobia: 0.35 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.90, neophobia: 0.42 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.91, neophobia: 0.48 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.93, neophobia: 0.55 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.94, neophobia: 0.59 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.95, neophobia: 0.63 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.96, neophobia: 0.68 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 0.97, neophobia: 0.72 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 0.99, neophobia: 0.76 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.80 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.82 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.83 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.85 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.87 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.88 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.90 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.89 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.88 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.88 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.87 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.86 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.85 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.83 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.81 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.79 },
  { stage: "新奇忌避が強まりやすい（個人差）", saltSensitivity: 1.00, neophobia: 0.77 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 1.00, neophobia: 0.75 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 1.00, neophobia: 0.72 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 1.00, neophobia: 0.70 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 1.00, neophobia: 0.68 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 1.00, neophobia: 0.66 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 1.00, neophobia: 0.64 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 1.00, neophobia: 0.62 },
  { stage: "経験で許容が広がる（個人差）", saltSensitivity: 1.00, neophobia: 0.60 },
];

// ============================================================================
// Smell Data (05_smell.md)
// ============================================================================

const SMELL_DATA: SmellData[] = [
  { discrimination: 0.20 }, { discrimination: 0.23 }, { discrimination: 0.27 }, { discrimination: 0.30 },
  { discrimination: 0.33 }, { discrimination: 0.37 }, { discrimination: 0.40 }, { discrimination: 0.42 },
  { discrimination: 0.45 }, { discrimination: 0.47 }, { discrimination: 0.50 }, { discrimination: 0.53 },
  { discrimination: 0.55 }, { discrimination: 0.57 }, { discrimination: 0.58 }, { discrimination: 0.60 },
  { discrimination: 0.62 }, { discrimination: 0.63 }, { discrimination: 0.65 }, { discrimination: 0.67 },
  { discrimination: 0.68 }, { discrimination: 0.70 }, { discrimination: 0.72 }, { discrimination: 0.73 },
  { discrimination: 0.75 }, { discrimination: 0.76 }, { discrimination: 0.77 }, { discrimination: 0.78 },
  { discrimination: 0.78 }, { discrimination: 0.79 }, { discrimination: 0.80 }, { discrimination: 0.81 },
  { discrimination: 0.82 }, { discrimination: 0.82 }, { discrimination: 0.83 }, { discrimination: 0.84 },
  { discrimination: 0.85 }, { discrimination: 0.85 }, { discrimination: 0.86 }, { discrimination: 0.86 },
  { discrimination: 0.87 }, { discrimination: 0.87 }, { discrimination: 0.88 }, { discrimination: 0.88 },
  { discrimination: 0.88 }, { discrimination: 0.89 }, { discrimination: 0.89 }, { discrimination: 0.90 },
  { discrimination: 0.90 },
];

// ============================================================================
// Cognition Data (06_concepts.md)
// ============================================================================

const COGNITION_DATA: CognitionData[] = [
  { stage: "感覚運動探索（反応→予測）", objectPermanence: 0.00, jointAttention: 0.00, pretendPlay: 0.00, causalReasoning: 0.05, theoryOfMind: 0.00, featureToMeaning: 0.05 },
  { stage: "感覚運動探索（反応→予測）", objectPermanence: 0.02, jointAttention: 0.01, pretendPlay: 0.00, causalReasoning: 0.07, theoryOfMind: 0.00, featureToMeaning: 0.06 },
  { stage: "感覚運動探索（反応→予測）", objectPermanence: 0.03, jointAttention: 0.02, pretendPlay: 0.01, causalReasoning: 0.08, theoryOfMind: 0.00, featureToMeaning: 0.07 },
  { stage: "感覚運動探索（反応→予測）", objectPermanence: 0.05, jointAttention: 0.03, pretendPlay: 0.01, causalReasoning: 0.10, theoryOfMind: 0.01, featureToMeaning: 0.07 },
  { stage: "感覚運動探索（反応→予測）", objectPermanence: 0.07, jointAttention: 0.03, pretendPlay: 0.02, causalReasoning: 0.12, theoryOfMind: 0.01, featureToMeaning: 0.08 },
  { stage: "感覚運動探索（反応→予測）", objectPermanence: 0.08, jointAttention: 0.04, pretendPlay: 0.02, causalReasoning: 0.13, theoryOfMind: 0.01, featureToMeaning: 0.09 },
  { stage: "対象永続性が育つ", objectPermanence: 0.10, jointAttention: 0.05, pretendPlay: 0.03, causalReasoning: 0.15, theoryOfMind: 0.01, featureToMeaning: 0.10 },
  { stage: "対象永続性が育つ", objectPermanence: 0.18, jointAttention: 0.12, pretendPlay: 0.03, causalReasoning: 0.18, theoryOfMind: 0.01, featureToMeaning: 0.12 },
  { stage: "対象永続性が育つ", objectPermanence: 0.27, jointAttention: 0.18, pretendPlay: 0.03, causalReasoning: 0.22, theoryOfMind: 0.01, featureToMeaning: 0.15 },
  { stage: "対象永続性が育つ", objectPermanence: 0.35, jointAttention: 0.25, pretendPlay: 0.04, causalReasoning: 0.25, theoryOfMind: 0.01, featureToMeaning: 0.17 },
  { stage: "対象永続性が育つ", objectPermanence: 0.45, jointAttention: 0.35, pretendPlay: 0.04, causalReasoning: 0.28, theoryOfMind: 0.02, featureToMeaning: 0.20 },
  { stage: "対象永続性が育つ", objectPermanence: 0.55, jointAttention: 0.45, pretendPlay: 0.05, causalReasoning: 0.32, theoryOfMind: 0.02, featureToMeaning: 0.23 },
  { stage: "共同注意・指差しが強まる", objectPermanence: 0.65, jointAttention: 0.55, pretendPlay: 0.05, causalReasoning: 0.35, theoryOfMind: 0.02, featureToMeaning: 0.25 },
  { stage: "共同注意・指差しが強まる", objectPermanence: 0.68, jointAttention: 0.59, pretendPlay: 0.08, causalReasoning: 0.38, theoryOfMind: 0.02, featureToMeaning: 0.28 },
  { stage: "共同注意・指差しが強まる", objectPermanence: 0.72, jointAttention: 0.63, pretendPlay: 0.12, causalReasoning: 0.40, theoryOfMind: 0.02, featureToMeaning: 0.30 },
  { stage: "共同注意・指差しが強まる", objectPermanence: 0.75, jointAttention: 0.68, pretendPlay: 0.15, causalReasoning: 0.42, theoryOfMind: 0.03, featureToMeaning: 0.33 },
  { stage: "共同注意・指差しが強まる", objectPermanence: 0.78, jointAttention: 0.72, pretendPlay: 0.18, causalReasoning: 0.45, theoryOfMind: 0.03, featureToMeaning: 0.35 },
  { stage: "共同注意・指差しが強まる", objectPermanence: 0.82, jointAttention: 0.76, pretendPlay: 0.22, causalReasoning: 0.47, theoryOfMind: 0.03, featureToMeaning: 0.38 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.85, jointAttention: 0.80, pretendPlay: 0.25, causalReasoning: 0.50, theoryOfMind: 0.03, featureToMeaning: 0.40 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.86, jointAttention: 0.81, pretendPlay: 0.30, causalReasoning: 0.53, theoryOfMind: 0.03, featureToMeaning: 0.42 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.87, jointAttention: 0.83, pretendPlay: 0.35, causalReasoning: 0.55, theoryOfMind: 0.03, featureToMeaning: 0.45 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.89, jointAttention: 0.84, pretendPlay: 0.40, causalReasoning: 0.57, theoryOfMind: 0.04, featureToMeaning: 0.47 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.90, jointAttention: 0.85, pretendPlay: 0.45, causalReasoning: 0.60, theoryOfMind: 0.04, featureToMeaning: 0.50 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.91, jointAttention: 0.87, pretendPlay: 0.50, causalReasoning: 0.62, theoryOfMind: 0.04, featureToMeaning: 0.53 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.92, jointAttention: 0.88, pretendPlay: 0.55, causalReasoning: 0.65, theoryOfMind: 0.04, featureToMeaning: 0.55 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.92, jointAttention: 0.88, pretendPlay: 0.57, causalReasoning: 0.66, theoryOfMind: 0.04, featureToMeaning: 0.57 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.92, jointAttention: 0.89, pretendPlay: 0.60, causalReasoning: 0.68, theoryOfMind: 0.04, featureToMeaning: 0.58 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.93, jointAttention: 0.89, pretendPlay: 0.62, causalReasoning: 0.69, theoryOfMind: 0.04, featureToMeaning: 0.60 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.93, jointAttention: 0.89, pretendPlay: 0.65, causalReasoning: 0.70, theoryOfMind: 0.05, featureToMeaning: 0.62 },
  { stage: "象徴/ふり遊びが増える", objectPermanence: 0.93, jointAttention: 0.89, pretendPlay: 0.68, causalReasoning: 0.71, theoryOfMind: 0.05, featureToMeaning: 0.63 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.93, jointAttention: 0.90, pretendPlay: 0.70, causalReasoning: 0.72, theoryOfMind: 0.05, featureToMeaning: 0.65 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.94, jointAttention: 0.90, pretendPlay: 0.72, causalReasoning: 0.74, theoryOfMind: 0.07, featureToMeaning: 0.67 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.94, jointAttention: 0.90, pretendPlay: 0.74, causalReasoning: 0.75, theoryOfMind: 0.10, featureToMeaning: 0.68 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.94, jointAttention: 0.90, pretendPlay: 0.76, causalReasoning: 0.76, theoryOfMind: 0.12, featureToMeaning: 0.70 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.94, jointAttention: 0.91, pretendPlay: 0.78, causalReasoning: 0.78, theoryOfMind: 0.15, featureToMeaning: 0.72 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.94, jointAttention: 0.91, pretendPlay: 0.80, causalReasoning: 0.79, theoryOfMind: 0.17, featureToMeaning: 0.73 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.94, jointAttention: 0.91, pretendPlay: 0.82, causalReasoning: 0.80, theoryOfMind: 0.20, featureToMeaning: 0.75 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.95, jointAttention: 0.91, pretendPlay: 0.83, causalReasoning: 0.81, theoryOfMind: 0.24, featureToMeaning: 0.76 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.95, jointAttention: 0.92, pretendPlay: 0.83, causalReasoning: 0.82, theoryOfMind: 0.28, featureToMeaning: 0.78 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.95, jointAttention: 0.92, pretendPlay: 0.84, causalReasoning: 0.82, theoryOfMind: 0.33, featureToMeaning: 0.79 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.95, jointAttention: 0.92, pretendPlay: 0.85, causalReasoning: 0.83, theoryOfMind: 0.37, featureToMeaning: 0.80 },
  { stage: "理由説明・ルール理解が増える", objectPermanence: 0.95, jointAttention: 0.92, pretendPlay: 0.85, causalReasoning: 0.84, theoryOfMind: 0.41, featureToMeaning: 0.81 },
  { stage: "他者視点（心の理論）が育つ", objectPermanence: 0.96, jointAttention: 0.93, pretendPlay: 0.86, causalReasoning: 0.85, theoryOfMind: 0.45, featureToMeaning: 0.82 },
  { stage: "他者視点（心の理論）が育つ", objectPermanence: 0.96, jointAttention: 0.93, pretendPlay: 0.87, causalReasoning: 0.86, theoryOfMind: 0.49, featureToMeaning: 0.84 },
  { stage: "他者視点（心の理論）が育つ", objectPermanence: 0.96, jointAttention: 0.93, pretendPlay: 0.87, causalReasoning: 0.87, theoryOfMind: 0.53, featureToMeaning: 0.85 },
  { stage: "他者視点（心の理論）が育つ", objectPermanence: 0.96, jointAttention: 0.93, pretendPlay: 0.88, causalReasoning: 0.88, theoryOfMind: 0.57, featureToMeaning: 0.86 },
  { stage: "他者視点（心の理論）が育つ", objectPermanence: 0.97, jointAttention: 0.94, pretendPlay: 0.89, causalReasoning: 0.88, theoryOfMind: 0.62, featureToMeaning: 0.88 },
  { stage: "他者視点（心の理論）が育つ", objectPermanence: 0.97, jointAttention: 0.94, pretendPlay: 0.89, causalReasoning: 0.89, theoryOfMind: 0.66, featureToMeaning: 0.89 },
  { stage: "他者視点（心の理論）が育つ", objectPermanence: 0.97, jointAttention: 0.94, pretendPlay: 0.90, causalReasoning: 0.90, theoryOfMind: 0.70, featureToMeaning: 0.90 },
];

// ============================================================================
// Language Data (07_language.md)
// ============================================================================

const LANGUAGE_DATA: LanguageData[] = [
  { stage: "泣き・反射的発声", receptive: 0.05, expressive: 0.00, vocabularyProxy: 0.05, syntaxProxy: 0.00, pragmaticsProxy: 0.10 },
  { stage: "泣き・反射的発声", receptive: 0.07, expressive: 0.03, vocabularyProxy: 0.05, syntaxProxy: 0.01, pragmaticsProxy: 0.12 },
  { stage: "クーイング/喃語の準備", receptive: 0.10, expressive: 0.05, vocabularyProxy: 0.05, syntaxProxy: 0.02, pragmaticsProxy: 0.15 },
  { stage: "クーイング/喃語の準備", receptive: 0.14, expressive: 0.07, vocabularyProxy: 0.05, syntaxProxy: 0.03, pragmaticsProxy: 0.17 },
  { stage: "クーイング/喃語の準備", receptive: 0.17, expressive: 0.10, vocabularyProxy: 0.05, syntaxProxy: 0.03, pragmaticsProxy: 0.20 },
  { stage: "クーイング/喃語の準備", receptive: 0.21, expressive: 0.12, vocabularyProxy: 0.05, syntaxProxy: 0.04, pragmaticsProxy: 0.23 },
  { stage: "喃語（反復）が増える", receptive: 0.25, expressive: 0.15, vocabularyProxy: 0.05, syntaxProxy: 0.05, pragmaticsProxy: 0.25 },
  { stage: "喃語（反復）が増える", receptive: 0.29, expressive: 0.18, vocabularyProxy: 0.05, syntaxProxy: 0.06, pragmaticsProxy: 0.28 },
  { stage: "喃語（反復）が増える", receptive: 0.33, expressive: 0.22, vocabularyProxy: 0.05, syntaxProxy: 0.07, pragmaticsProxy: 0.32 },
  { stage: "喃語（反復）が増える", receptive: 0.38, expressive: 0.25, vocabularyProxy: 0.05, syntaxProxy: 0.07, pragmaticsProxy: 0.35 },
  { stage: "初語が出始める（個人差）", receptive: 0.42, expressive: 0.28, vocabularyProxy: 0.05, syntaxProxy: 0.08, pragmaticsProxy: 0.38 },
  { stage: "初語が出始める（個人差）", receptive: 0.46, expressive: 0.32, vocabularyProxy: 0.05, syntaxProxy: 0.09, pragmaticsProxy: 0.42 },
  { stage: "初語が出始める（個人差）", receptive: 0.50, expressive: 0.35, vocabularyProxy: 0.05, syntaxProxy: 0.10, pragmaticsProxy: 0.45 },
  { stage: "初語が出始める（個人差）", receptive: 0.53, expressive: 0.39, vocabularyProxy: 0.06, syntaxProxy: 0.12, pragmaticsProxy: 0.48 },
  { stage: "初語が出始める（個人差）", receptive: 0.57, expressive: 0.43, vocabularyProxy: 0.07, syntaxProxy: 0.15, pragmaticsProxy: 0.52 },
  { stage: "語彙増加・二語へ", receptive: 0.60, expressive: 0.47, vocabularyProxy: 0.09, syntaxProxy: 0.17, pragmaticsProxy: 0.55 },
  { stage: "語彙増加・二語へ", receptive: 0.63, expressive: 0.52, vocabularyProxy: 0.10, syntaxProxy: 0.20, pragmaticsProxy: 0.58 },
  { stage: "語彙増加・二語へ", receptive: 0.67, expressive: 0.56, vocabularyProxy: 0.11, syntaxProxy: 0.23, pragmaticsProxy: 0.62 },
  { stage: "語彙増加・二語へ", receptive: 0.70, expressive: 0.60, vocabularyProxy: 0.12, syntaxProxy: 0.25, pragmaticsProxy: 0.65 },
  { stage: "語彙増加・二語へ", receptive: 0.72, expressive: 0.62, vocabularyProxy: 0.14, syntaxProxy: 0.28, pragmaticsProxy: 0.67 },
  { stage: "語彙増加・二語へ", receptive: 0.73, expressive: 0.63, vocabularyProxy: 0.16, syntaxProxy: 0.30, pragmaticsProxy: 0.68 },
  { stage: "語彙増加・二語へ", receptive: 0.75, expressive: 0.65, vocabularyProxy: 0.18, syntaxProxy: 0.33, pragmaticsProxy: 0.70 },
  { stage: "語彙増加・二語へ", receptive: 0.77, expressive: 0.67, vocabularyProxy: 0.21, syntaxProxy: 0.35, pragmaticsProxy: 0.72 },
  { stage: "語彙増加・二語へ", receptive: 0.78, expressive: 0.68, vocabularyProxy: 0.23, syntaxProxy: 0.38, pragmaticsProxy: 0.73 },
  { stage: "文が長くなる・質問が増える", receptive: 0.80, expressive: 0.70, vocabularyProxy: 0.25, syntaxProxy: 0.40, pragmaticsProxy: 0.75 },
  { stage: "文が長くなる・質問が増える", receptive: 0.81, expressive: 0.72, vocabularyProxy: 0.27, syntaxProxy: 0.42, pragmaticsProxy: 0.76 },
  { stage: "文が長くなる・質問が増える", receptive: 0.82, expressive: 0.73, vocabularyProxy: 0.29, syntaxProxy: 0.45, pragmaticsProxy: 0.77 },
  { stage: "文が長くなる・質問が増える", receptive: 0.82, expressive: 0.75, vocabularyProxy: 0.32, syntaxProxy: 0.47, pragmaticsProxy: 0.78 },
  { stage: "文が長くなる・質問が増える", receptive: 0.83, expressive: 0.77, vocabularyProxy: 0.34, syntaxProxy: 0.50, pragmaticsProxy: 0.78 },
  { stage: "文が長くなる・質問が増える", receptive: 0.84, expressive: 0.78, vocabularyProxy: 0.36, syntaxProxy: 0.53, pragmaticsProxy: 0.79 },
  { stage: "文が長くなる・質問が増える", receptive: 0.85, expressive: 0.80, vocabularyProxy: 0.38, syntaxProxy: 0.55, pragmaticsProxy: 0.80 },
  { stage: "文が長くなる・質問が増える", receptive: 0.86, expressive: 0.81, vocabularyProxy: 0.41, syntaxProxy: 0.58, pragmaticsProxy: 0.81 },
  { stage: "文が長くなる・質問が増える", receptive: 0.87, expressive: 0.83, vocabularyProxy: 0.44, syntaxProxy: 0.62, pragmaticsProxy: 0.82 },
  { stage: "文が長くなる・質問が増える", receptive: 0.88, expressive: 0.84, vocabularyProxy: 0.47, syntaxProxy: 0.65, pragmaticsProxy: 0.82 },
  { stage: "文が長くなる・質問が増える", receptive: 0.88, expressive: 0.85, vocabularyProxy: 0.49, syntaxProxy: 0.68, pragmaticsProxy: 0.83 },
  { stage: "文が長くなる・質問が増える", receptive: 0.89, expressive: 0.87, vocabularyProxy: 0.52, syntaxProxy: 0.72, pragmaticsProxy: 0.84 },
  { stage: "会話/物語が拡張", receptive: 0.90, expressive: 0.88, vocabularyProxy: 0.55, syntaxProxy: 0.75, pragmaticsProxy: 0.85 },
  { stage: "会話/物語が拡張", receptive: 0.90, expressive: 0.88, vocabularyProxy: 0.57, syntaxProxy: 0.76, pragmaticsProxy: 0.86 },
  { stage: "会話/物語が拡張", receptive: 0.91, expressive: 0.89, vocabularyProxy: 0.58, syntaxProxy: 0.78, pragmaticsProxy: 0.86 },
  { stage: "会話/物語が拡張", receptive: 0.91, expressive: 0.89, vocabularyProxy: 0.60, syntaxProxy: 0.79, pragmaticsProxy: 0.87 },
  { stage: "会話/物語が拡張", receptive: 0.92, expressive: 0.90, vocabularyProxy: 0.62, syntaxProxy: 0.80, pragmaticsProxy: 0.87 },
  { stage: "会話/物語が拡張", receptive: 0.92, expressive: 0.90, vocabularyProxy: 0.63, syntaxProxy: 0.81, pragmaticsProxy: 0.88 },
  { stage: "会話/物語が拡張", receptive: 0.93, expressive: 0.91, vocabularyProxy: 0.65, syntaxProxy: 0.82, pragmaticsProxy: 0.89 },
  { stage: "会話/物語が拡張", receptive: 0.93, expressive: 0.91, vocabularyProxy: 0.67, syntaxProxy: 0.84, pragmaticsProxy: 0.89 },
  { stage: "会話/物語が拡張", receptive: 0.93, expressive: 0.91, vocabularyProxy: 0.68, syntaxProxy: 0.85, pragmaticsProxy: 0.90 },
  { stage: "会話/物語が拡張", receptive: 0.94, expressive: 0.92, vocabularyProxy: 0.70, syntaxProxy: 0.86, pragmaticsProxy: 0.90 },
  { stage: "会話/物語が拡張", receptive: 0.94, expressive: 0.92, vocabularyProxy: 0.72, syntaxProxy: 0.88, pragmaticsProxy: 0.91 },
  { stage: "会話/物語が拡張", receptive: 0.95, expressive: 0.93, vocabularyProxy: 0.73, syntaxProxy: 0.89, pragmaticsProxy: 0.91 },
  { stage: "会話/物語が拡張", receptive: 0.95, expressive: 0.93, vocabularyProxy: 0.75, syntaxProxy: 0.90, pragmaticsProxy: 0.92 },
];

// ============================================================================
// Conversation Data (08_conversation.md)
// ============================================================================

const CONVERSATION_DATA: ConversationData[] = [
  { stage: "喃語・身振り中心", syntaxProxy: 0.00, pragmaticsProxy: 0.10 },
  { stage: "喃語・身振り中心", syntaxProxy: 0.01, pragmaticsProxy: 0.12 },
  { stage: "喃語・身振り中心", syntaxProxy: 0.02, pragmaticsProxy: 0.15 },
  { stage: "喃語・身振り中心", syntaxProxy: 0.03, pragmaticsProxy: 0.17 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.03, pragmaticsProxy: 0.20 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.04, pragmaticsProxy: 0.23 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.05, pragmaticsProxy: 0.25 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.06, pragmaticsProxy: 0.28 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.07, pragmaticsProxy: 0.32 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.07, pragmaticsProxy: 0.35 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.08, pragmaticsProxy: 0.38 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.09, pragmaticsProxy: 0.42 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.10, pragmaticsProxy: 0.45 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.12, pragmaticsProxy: 0.48 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.15, pragmaticsProxy: 0.52 },
  { stage: "単語中心（意図伝達）", syntaxProxy: 0.17, pragmaticsProxy: 0.55 },
  { stage: "2語〜短文", syntaxProxy: 0.20, pragmaticsProxy: 0.58 },
  { stage: "2語〜短文", syntaxProxy: 0.23, pragmaticsProxy: 0.62 },
  { stage: "2語〜短文", syntaxProxy: 0.25, pragmaticsProxy: 0.65 },
  { stage: "2語〜短文", syntaxProxy: 0.28, pragmaticsProxy: 0.67 },
  { stage: "2語〜短文", syntaxProxy: 0.30, pragmaticsProxy: 0.68 },
  { stage: "2語〜短文", syntaxProxy: 0.33, pragmaticsProxy: 0.70 },
  { stage: "2語〜短文", syntaxProxy: 0.35, pragmaticsProxy: 0.72 },
  { stage: "2語〜短文", syntaxProxy: 0.38, pragmaticsProxy: 0.73 },
  { stage: "2語〜短文", syntaxProxy: 0.40, pragmaticsProxy: 0.75 },
  { stage: "2語〜短文", syntaxProxy: 0.42, pragmaticsProxy: 0.76 },
  { stage: "3〜4語＋質問", syntaxProxy: 0.45, pragmaticsProxy: 0.77 },
  { stage: "3〜4語＋質問", syntaxProxy: 0.47, pragmaticsProxy: 0.78 },
  { stage: "3〜4語＋質問", syntaxProxy: 0.50, pragmaticsProxy: 0.78 },
  { stage: "3〜4語＋質問", syntaxProxy: 0.53, pragmaticsProxy: 0.79 },
  { stage: "3〜4語＋質問", syntaxProxy: 0.55, pragmaticsProxy: 0.80 },
  { stage: "3〜4語＋質問", syntaxProxy: 0.58, pragmaticsProxy: 0.81 },
  { stage: "3〜4語＋質問", syntaxProxy: 0.62, pragmaticsProxy: 0.82 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.65, pragmaticsProxy: 0.82 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.68, pragmaticsProxy: 0.83 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.72, pragmaticsProxy: 0.84 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.75, pragmaticsProxy: 0.85 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.76, pragmaticsProxy: 0.86 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.78, pragmaticsProxy: 0.86 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.79, pragmaticsProxy: 0.87 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.80, pragmaticsProxy: 0.87 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.81, pragmaticsProxy: 0.88 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.82, pragmaticsProxy: 0.89 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.84, pragmaticsProxy: 0.89 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.85, pragmaticsProxy: 0.90 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.86, pragmaticsProxy: 0.90 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.88, pragmaticsProxy: 0.91 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.89, pragmaticsProxy: 0.91 },
  { stage: "物語/やりとりが伸びる", syntaxProxy: 0.90, pragmaticsProxy: 0.92 },
];

// ============================================================================
// Numeracy Data (09_numeracy.md)
// ============================================================================

const NUMERACY_DATA: NumeracyData[] = [
  { stage: "数のリズム/まね", numberWords: 0.00, counting: 0.00, quantityCorrespondence: 0.00, simpleAddition: 0.00 },
  { stage: "数のリズム/まね", numberWords: 0.00, counting: 0.01, quantityCorrespondence: 0.00, simpleAddition: 0.00 },
  { stage: "数のリズム/まね", numberWords: 0.01, counting: 0.01, quantityCorrespondence: 0.01, simpleAddition: 0.00 },
  { stage: "数のリズム/まね", numberWords: 0.01, counting: 0.02, quantityCorrespondence: 0.01, simpleAddition: 0.00 },
  { stage: "数のリズム/まね", numberWords: 0.02, counting: 0.02, quantityCorrespondence: 0.02, simpleAddition: 0.01 },
  { stage: "数のリズム/まね", numberWords: 0.02, counting: 0.03, quantityCorrespondence: 0.02, simpleAddition: 0.01 },
  { stage: "数のリズム/まね", numberWords: 0.03, counting: 0.03, quantityCorrespondence: 0.03, simpleAddition: 0.01 },
  { stage: "数のリズム/まね", numberWords: 0.03, counting: 0.04, quantityCorrespondence: 0.03, simpleAddition: 0.01 },
  { stage: "数のリズム/まね", numberWords: 0.03, counting: 0.04, quantityCorrespondence: 0.03, simpleAddition: 0.01 },
  { stage: "数のリズム/まね", numberWords: 0.04, counting: 0.05, quantityCorrespondence: 0.04, simpleAddition: 0.01 },
  { stage: "数のリズム/まね", numberWords: 0.04, counting: 0.06, quantityCorrespondence: 0.04, simpleAddition: 0.01 },
  { stage: "数のリズム/まね", numberWords: 0.05, counting: 0.06, quantityCorrespondence: 0.05, simpleAddition: 0.01 },
  { stage: "数のリズム/まね", numberWords: 0.05, counting: 0.07, quantityCorrespondence: 0.05, simpleAddition: 0.02 },
  { stage: "数のリズム/まね", numberWords: 0.07, counting: 0.07, quantityCorrespondence: 0.05, simpleAddition: 0.02 },
  { stage: "数のリズム/まね", numberWords: 0.08, counting: 0.08, quantityCorrespondence: 0.06, simpleAddition: 0.02 },
  { stage: "数のリズム/まね", numberWords: 0.10, counting: 0.08, quantityCorrespondence: 0.06, simpleAddition: 0.02 },
  { stage: "数のリズム/まね", numberWords: 0.12, counting: 0.09, quantityCorrespondence: 0.07, simpleAddition: 0.02 },
  { stage: "数のリズム/まね", numberWords: 0.13, counting: 0.09, quantityCorrespondence: 0.07, simpleAddition: 0.02 },
  { stage: "数のリズム/まね", numberWords: 0.15, counting: 0.10, quantityCorrespondence: 0.07, simpleAddition: 0.03 },
  { stage: "数のリズム/まね", numberWords: 0.17, counting: 0.12, quantityCorrespondence: 0.08, simpleAddition: 0.03 },
  { stage: "数唱が出始める", numberWords: 0.18, counting: 0.15, quantityCorrespondence: 0.08, simpleAddition: 0.03 },
  { stage: "数唱が出始める", numberWords: 0.20, counting: 0.17, quantityCorrespondence: 0.09, simpleAddition: 0.03 },
  { stage: "数唱が出始める", numberWords: 0.22, counting: 0.20, quantityCorrespondence: 0.09, simpleAddition: 0.03 },
  { stage: "数唱が出始める", numberWords: 0.23, counting: 0.23, quantityCorrespondence: 0.10, simpleAddition: 0.03 },
  { stage: "数唱が出始める", numberWords: 0.25, counting: 0.25, quantityCorrespondence: 0.10, simpleAddition: 0.03 },
  { stage: "数唱が出始める", numberWords: 0.28, counting: 0.28, quantityCorrespondence: 0.12, simpleAddition: 0.04 },
  { stage: "数唱が出始める", numberWords: 0.30, counting: 0.30, quantityCorrespondence: 0.14, simpleAddition: 0.04 },
  { stage: "数唱が出始める", numberWords: 0.33, counting: 0.33, quantityCorrespondence: 0.16, simpleAddition: 0.04 },
  { stage: "数唱→量の対応が育つ", numberWords: 0.35, counting: 0.35, quantityCorrespondence: 0.18, simpleAddition: 0.04 },
  { stage: "数唱→量の対応が育つ", numberWords: 0.38, counting: 0.38, quantityCorrespondence: 0.20, simpleAddition: 0.04 },
  { stage: "数唱→量の対応が育つ", numberWords: 0.40, counting: 0.40, quantityCorrespondence: 0.23, simpleAddition: 0.04 },
  { stage: "数唱→量の対応が育つ", numberWords: 0.42, counting: 0.42, quantityCorrespondence: 0.25, simpleAddition: 0.04 },
  { stage: "数の比較/簡単な計数", numberWords: 0.45, counting: 0.45, quantityCorrespondence: 0.27, simpleAddition: 0.04 },
  { stage: "数の比較/簡単な計数", numberWords: 0.47, counting: 0.47, quantityCorrespondence: 0.29, simpleAddition: 0.05 },
  { stage: "数の比較/簡単な計数", numberWords: 0.50, counting: 0.50, quantityCorrespondence: 0.31, simpleAddition: 0.05 },
  { stage: "数の比較/簡単な計数", numberWords: 0.53, counting: 0.53, quantityCorrespondence: 0.33, simpleAddition: 0.05 },
  { stage: "数の比較/簡単な計数", numberWords: 0.55, counting: 0.55, quantityCorrespondence: 0.35, simpleAddition: 0.05 },
  { stage: "数の比較/簡単な計数", numberWords: 0.57, counting: 0.57, quantityCorrespondence: 0.37, simpleAddition: 0.07 },
  { stage: "数の比較/簡単な計数", numberWords: 0.58, counting: 0.59, quantityCorrespondence: 0.39, simpleAddition: 0.09 },
  { stage: "数の比較/簡単な計数", numberWords: 0.60, counting: 0.61, quantityCorrespondence: 0.41, simpleAddition: 0.12 },
  { stage: "数の比較/簡単な計数", numberWords: 0.62, counting: 0.63, quantityCorrespondence: 0.43, simpleAddition: 0.14 },
  { stage: "数の比較/簡単な計数", numberWords: 0.63, counting: 0.65, quantityCorrespondence: 0.45, simpleAddition: 0.16 },
  { stage: "数の比較/簡単な計数", numberWords: 0.65, counting: 0.68, quantityCorrespondence: 0.47, simpleAddition: 0.18 },
  { stage: "簡単な加減の直感", numberWords: 0.67, counting: 0.70, quantityCorrespondence: 0.50, simpleAddition: 0.21 },
  { stage: "簡単な加減の直感", numberWords: 0.68, counting: 0.72, quantityCorrespondence: 0.52, simpleAddition: 0.24 },
  { stage: "簡単な加減の直感", numberWords: 0.70, counting: 0.74, quantityCorrespondence: 0.54, simpleAddition: 0.27 },
  { stage: "簡単な加減の直感", numberWords: 0.72, counting: 0.76, quantityCorrespondence: 0.56, simpleAddition: 0.29 },
  { stage: "簡単な加減の直感", numberWords: 0.73, counting: 0.78, quantityCorrespondence: 0.58, simpleAddition: 0.32 },
  { stage: "簡単な加減の直感", numberWords: 0.75, counting: 0.80, quantityCorrespondence: 0.60, simpleAddition: 0.35 },
];

// ============================================================================
// Literacy Data (10_literacy.md)
// ============================================================================

const LITERACY_DATA: LiteracyData[] = [
  { stage: "本=モノ（探索）", bookInterest: 0.15, printConcept: 0.00, letterKnowledge: 0.00, phonologicalAwareness: 0.00, nameWriting: 0.00 },
  { stage: "本=モノ（探索）", bookInterest: 0.18, printConcept: 0.01, letterKnowledge: 0.00, phonologicalAwareness: 0.01, nameWriting: 0.00 },
  { stage: "本=モノ（探索）", bookInterest: 0.22, printConcept: 0.02, letterKnowledge: 0.01, phonologicalAwareness: 0.01, nameWriting: 0.00 },
  { stage: "本=モノ（探索）", bookInterest: 0.25, printConcept: 0.03, letterKnowledge: 0.01, phonologicalAwareness: 0.02, nameWriting: 0.01 },
  { stage: "本=モノ（探索）", bookInterest: 0.27, printConcept: 0.03, letterKnowledge: 0.02, phonologicalAwareness: 0.02, nameWriting: 0.01 },
  { stage: "本=モノ（探索）", bookInterest: 0.29, printConcept: 0.04, letterKnowledge: 0.02, phonologicalAwareness: 0.03, nameWriting: 0.01 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.32, printConcept: 0.05, letterKnowledge: 0.03, phonologicalAwareness: 0.03, nameWriting: 0.01 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.34, printConcept: 0.06, letterKnowledge: 0.03, phonologicalAwareness: 0.04, nameWriting: 0.01 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.36, printConcept: 0.07, letterKnowledge: 0.03, phonologicalAwareness: 0.04, nameWriting: 0.01 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.38, printConcept: 0.07, letterKnowledge: 0.04, phonologicalAwareness: 0.05, nameWriting: 0.01 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.41, printConcept: 0.08, letterKnowledge: 0.04, phonologicalAwareness: 0.06, nameWriting: 0.02 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.43, printConcept: 0.09, letterKnowledge: 0.05, phonologicalAwareness: 0.06, nameWriting: 0.02 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.45, printConcept: 0.10, letterKnowledge: 0.05, phonologicalAwareness: 0.07, nameWriting: 0.02 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.47, printConcept: 0.12, letterKnowledge: 0.05, phonologicalAwareness: 0.07, nameWriting: 0.02 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.48, printConcept: 0.13, letterKnowledge: 0.06, phonologicalAwareness: 0.08, nameWriting: 0.02 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.50, printConcept: 0.15, letterKnowledge: 0.06, phonologicalAwareness: 0.08, nameWriting: 0.03 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.52, printConcept: 0.17, letterKnowledge: 0.07, phonologicalAwareness: 0.09, nameWriting: 0.03 },
  { stage: "絵本のやりとり（指差し）", bookInterest: 0.53, printConcept: 0.18, letterKnowledge: 0.07, phonologicalAwareness: 0.09, nameWriting: 0.03 },
  { stage: "環境の文字に気づく", bookInterest: 0.55, printConcept: 0.20, letterKnowledge: 0.07, phonologicalAwareness: 0.10, nameWriting: 0.03 },
  { stage: "環境の文字に気づく", bookInterest: 0.57, printConcept: 0.22, letterKnowledge: 0.08, phonologicalAwareness: 0.11, nameWriting: 0.03 },
  { stage: "環境の文字に気づく", bookInterest: 0.58, printConcept: 0.23, letterKnowledge: 0.08, phonologicalAwareness: 0.13, nameWriting: 0.03 },
  { stage: "環境の文字に気づく", bookInterest: 0.60, printConcept: 0.25, letterKnowledge: 0.09, phonologicalAwareness: 0.14, nameWriting: 0.04 },
  { stage: "環境の文字に気づく", bookInterest: 0.62, printConcept: 0.27, letterKnowledge: 0.09, phonologicalAwareness: 0.16, nameWriting: 0.04 },
  { stage: "環境の文字に気づく", bookInterest: 0.63, printConcept: 0.28, letterKnowledge: 0.10, phonologicalAwareness: 0.17, nameWriting: 0.04 },
  { stage: "環境の文字に気づく", bookInterest: 0.65, printConcept: 0.30, letterKnowledge: 0.10, phonologicalAwareness: 0.18, nameWriting: 0.04 },
  { stage: "環境の文字に気づく", bookInterest: 0.66, printConcept: 0.32, letterKnowledge: 0.12, phonologicalAwareness: 0.20, nameWriting: 0.04 },
  { stage: "環境の文字に気づく", bookInterest: 0.68, printConcept: 0.34, letterKnowledge: 0.14, phonologicalAwareness: 0.21, nameWriting: 0.04 },
  { stage: "環境の文字に気づく", bookInterest: 0.69, printConcept: 0.36, letterKnowledge: 0.16, phonologicalAwareness: 0.23, nameWriting: 0.04 },
  { stage: "環境の文字に気づく", bookInterest: 0.70, printConcept: 0.38, letterKnowledge: 0.18, phonologicalAwareness: 0.24, nameWriting: 0.05 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.71, printConcept: 0.40, letterKnowledge: 0.20, phonologicalAwareness: 0.25, nameWriting: 0.05 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.72, printConcept: 0.42, letterKnowledge: 0.23, phonologicalAwareness: 0.27, nameWriting: 0.05 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.74, printConcept: 0.45, letterKnowledge: 0.25, phonologicalAwareness: 0.28, nameWriting: 0.08 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.75, printConcept: 0.47, letterKnowledge: 0.27, phonologicalAwareness: 0.29, nameWriting: 0.12 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.76, printConcept: 0.49, letterKnowledge: 0.29, phonologicalAwareness: 0.31, nameWriting: 0.15 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.78, printConcept: 0.51, letterKnowledge: 0.31, phonologicalAwareness: 0.32, nameWriting: 0.18 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.79, printConcept: 0.53, letterKnowledge: 0.33, phonologicalAwareness: 0.34, nameWriting: 0.22 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.80, printConcept: 0.55, letterKnowledge: 0.35, phonologicalAwareness: 0.35, nameWriting: 0.25 },
  { stage: "文字っぽい記号/なぞり", bookInterest: 0.81, printConcept: 0.56, letterKnowledge: 0.37, phonologicalAwareness: 0.37, nameWriting: 0.28 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.81, printConcept: 0.57, letterKnowledge: 0.39, phonologicalAwareness: 0.38, nameWriting: 0.30 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.82, printConcept: 0.59, letterKnowledge: 0.41, phonologicalAwareness: 0.40, nameWriting: 0.33 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.83, printConcept: 0.60, letterKnowledge: 0.43, phonologicalAwareness: 0.42, nameWriting: 0.35 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.83, printConcept: 0.61, letterKnowledge: 0.45, phonologicalAwareness: 0.43, nameWriting: 0.38 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.84, printConcept: 0.62, letterKnowledge: 0.47, phonologicalAwareness: 0.45, nameWriting: 0.40 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.85, printConcept: 0.64, letterKnowledge: 0.50, phonologicalAwareness: 0.47, nameWriting: 0.42 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.85, printConcept: 0.65, letterKnowledge: 0.52, phonologicalAwareness: 0.48, nameWriting: 0.45 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.86, printConcept: 0.66, letterKnowledge: 0.54, phonologicalAwareness: 0.50, nameWriting: 0.47 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.87, printConcept: 0.68, letterKnowledge: 0.56, phonologicalAwareness: 0.52, nameWriting: 0.50 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.87, printConcept: 0.69, letterKnowledge: 0.58, phonologicalAwareness: 0.53, nameWriting: 0.53 },
  { stage: "文字を\"書く/読む\"の芽", bookInterest: 0.88, printConcept: 0.70, letterKnowledge: 0.60, phonologicalAwareness: 0.55, nameWriting: 0.55 },
];

// ============================================================================
// Combined Data Access Functions
// ============================================================================

/**
 * Get all growth data for a specific month (0-48)
 */
export function getGrowthData(month: number): MonthlyGrowthData {
  const m = Math.max(0, Math.min(48, Math.floor(month)));

  return {
    month: m,
    vision: VISION_DATA[m],
    hearing: HEARING_DATA[m],
    touch: TOUCH_DATA[m],
    taste: TASTE_DATA[m],
    smell: SMELL_DATA[m],
    cognition: COGNITION_DATA[m],
    language: LANGUAGE_DATA[m],
    conversation: CONVERSATION_DATA[m],
    numeracy: NUMERACY_DATA[m],
    literacy: LITERACY_DATA[m],
  };
}

/**
 * Get interpolated growth data for fractional months
 */
export function getGrowthDataInterpolated(month: number): MonthlyGrowthData {
  const m = Math.max(0, Math.min(48, month));
  const floor = Math.floor(m);
  const ceil = Math.min(48, floor + 1);
  const t = m - floor;

  if (t === 0 || floor === ceil) {
    return getGrowthData(floor);
  }

  const d1 = getGrowthData(floor);
  const d2 = getGrowthData(ceil);

  // Helper for linear interpolation
  const lerp = (a: number, b: number) => a + (b - a) * t;

  return {
    month: m,
    vision: {
      stage: d1.vision.stage,
      clarity: lerp(d1.vision.clarity, d2.vision.clarity),
      depth: lerp(d1.vision.depth, d2.vision.depth),
      semantic: lerp(d1.vision.semantic, d2.vision.semantic),
      blurPx: lerp(d1.vision.blurPx, d2.vision.blurPx),
      depthCue: lerp(d1.vision.depthCue, d2.vision.depthCue),
      semanticAlpha: lerp(d1.vision.semanticAlpha, d2.vision.semanticAlpha),
    },
    hearing: {
      stage: d1.hearing.stage,
      localizationErrorDeg: lerp(d1.hearing.localizationErrorDeg, d2.hearing.localizationErrorDeg),
      speechSalience: lerp(d1.hearing.speechSalience, d2.hearing.speechSalience),
      panningJitter: lerp(d1.hearing.panningJitter, d2.hearing.panningJitter),
      suggestedSNRdB: lerp(d1.hearing.suggestedSNRdB, d2.hearing.suggestedSNRdB),
    },
    touch: {
      stage: d1.touch.stage,
      mouthExploration: lerp(d1.touch.mouthExploration, d2.touch.mouthExploration),
      handExploration: lerp(d1.touch.handExploration, d2.touch.handExploration),
      toolUse: lerp(d1.touch.toolUse, d2.touch.toolUse),
    },
    taste: {
      stage: d1.taste.stage,
      saltSensitivity: lerp(d1.taste.saltSensitivity, d2.taste.saltSensitivity),
      neophobia: lerp(d1.taste.neophobia, d2.taste.neophobia),
    },
    smell: {
      discrimination: lerp(d1.smell.discrimination, d2.smell.discrimination),
    },
    cognition: {
      stage: d1.cognition.stage,
      objectPermanence: lerp(d1.cognition.objectPermanence, d2.cognition.objectPermanence),
      jointAttention: lerp(d1.cognition.jointAttention, d2.cognition.jointAttention),
      pretendPlay: lerp(d1.cognition.pretendPlay, d2.cognition.pretendPlay),
      causalReasoning: lerp(d1.cognition.causalReasoning, d2.cognition.causalReasoning),
      theoryOfMind: lerp(d1.cognition.theoryOfMind, d2.cognition.theoryOfMind),
      featureToMeaning: lerp(d1.cognition.featureToMeaning, d2.cognition.featureToMeaning),
    },
    language: {
      stage: d1.language.stage,
      receptive: lerp(d1.language.receptive, d2.language.receptive),
      expressive: lerp(d1.language.expressive, d2.language.expressive),
      vocabularyProxy: lerp(d1.language.vocabularyProxy, d2.language.vocabularyProxy),
      syntaxProxy: lerp(d1.language.syntaxProxy, d2.language.syntaxProxy),
      pragmaticsProxy: lerp(d1.language.pragmaticsProxy, d2.language.pragmaticsProxy),
    },
    conversation: {
      stage: d1.conversation.stage,
      syntaxProxy: lerp(d1.conversation.syntaxProxy, d2.conversation.syntaxProxy),
      pragmaticsProxy: lerp(d1.conversation.pragmaticsProxy, d2.conversation.pragmaticsProxy),
    },
    numeracy: {
      stage: d1.numeracy.stage,
      numberWords: lerp(d1.numeracy.numberWords, d2.numeracy.numberWords),
      counting: lerp(d1.numeracy.counting, d2.numeracy.counting),
      quantityCorrespondence: lerp(d1.numeracy.quantityCorrespondence, d2.numeracy.quantityCorrespondence),
      simpleAddition: lerp(d1.numeracy.simpleAddition, d2.numeracy.simpleAddition),
    },
    literacy: {
      stage: d1.literacy.stage,
      bookInterest: lerp(d1.literacy.bookInterest, d2.literacy.bookInterest),
      printConcept: lerp(d1.literacy.printConcept, d2.literacy.printConcept),
      letterKnowledge: lerp(d1.literacy.letterKnowledge, d2.literacy.letterKnowledge),
      phonologicalAwareness: lerp(d1.literacy.phonologicalAwareness, d2.literacy.phonologicalAwareness),
      nameWriting: lerp(d1.literacy.nameWriting, d2.literacy.nameWriting),
    },
  };
}

// ============================================================================
// Sources from Documentation
// ============================================================================

export const GROWTH_SOURCES = {
  // Vision
  fox1980: {
    title: 'Stereopsis in human infants (Fox et al. 1980)',
    url: 'https://www.science.org/doi/10.1126/science.7350666',
    domain: 'vision',
  },
  nationwideChildrens: {
    title: 'Infant Vision (Birth to One Year) - Nationwide Children\'s',
    url: 'https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year',
    domain: 'vision',
  },
  aaoVision: {
    title: 'Baby\'s vision development - AAO',
    url: 'https://www.aao.org/eye-health/tips-prevention/baby-vision-development-first-year',
    domain: 'vision',
  },
  // Hearing
  stanfordHearing: {
    title: 'Hearing, Speech and Language Milestones - Stanford',
    url: 'https://www.stanfordchildrens.org/en/topic/default?id=age-appropriate-hearing-speech-and-language-milestones-90-P02169',
    domain: 'hearing',
  },
  nidcd: {
    title: 'Speech and Language Developmental Milestones - NIDCD',
    url: 'https://www.nidcd.nih.gov/health/speech-and-language',
    domain: 'hearing',
  },
  // Touch
  rchTouch: {
    title: 'Encouraging young babies to use their hands - RCH',
    url: 'https://www.rch.org.au/uploadedfiles/main/content/ot/infosheet_t.pdf',
    domain: 'touch',
  },
  cdc4months: {
    title: 'Milestones by 4 Months - CDC',
    url: 'https://www.cdc.gov/act-early/milestones/4-months.html',
    domain: 'touch',
  },
  // Taste
  beauchamp1994: {
    title: 'Infant salt taste development (Beauchamp 1994)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8001725/',
    domain: 'taste',
  },
  neophobia2022: {
    title: 'Neophobia review (Białek-Dratwa 2022)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9002550/',
    domain: 'taste',
  },
  // Smell
  vaglio2009: {
    title: 'Chemical communication & mother-infant recognition (Vaglio 2009)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2717541/',
    domain: 'smell',
  },
  srcd2024: {
    title: 'Infants use mother\'s scent to see faces - SRCD',
    url: 'https://www.srcd.org/news/research-shows-young-infants-use-their-mothers-scent-see-faces',
    domain: 'smell',
  },
  // Cognition
  upfJointAttention: {
    title: 'Joint attention (Before First Words) - UPF',
    url: 'https://beforefirstwords.upf.edu/precursors-of-language/joint-attention/',
    domain: 'cognition',
  },
  cdc2years: {
    title: 'Milestones by 2 Years - CDC',
    url: 'https://www.cdc.gov/act-early/milestones/2-years.html',
    domain: 'cognition',
  },
  cdc3years: {
    title: 'Milestones by 3 Years - CDC',
    url: 'https://www.cdc.gov/act-early/milestones/3-years.html',
    domain: 'cognition',
  },
  cdc4years: {
    title: 'Milestones by 4 Years - CDC',
    url: 'https://www.cdc.gov/act-early/milestones/4-years.html',
    domain: 'cognition',
  },
  // Numeracy
  healthyChildren45: {
    title: 'Developmental Milestones: 4 to 5 Year Olds - HealthyChildren',
    url: 'https://www.healthychildren.org/English/ages-stages/preschool/Pages/Developmental-Milestones-4-to-5-Year-Olds.aspx',
    domain: 'numeracy',
  },
  ukDfeNumbers: {
    title: 'Early years mathematics - Numbers - UK DfE',
    url: 'https://help-for-early-years-providers.education.gov.uk/areas-of-learning/mathematics/numbers',
    domain: 'numeracy',
  },
  // Literacy
  healthyChildrenLiteracy: {
    title: 'Developmental Milestones of Early Literacy - HealthyChildren',
    url: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/Developmental-Milestones-of-Early-Literacy.aspx',
    domain: 'literacy',
  },
  ncdhhs: {
    title: 'Early Literacy Development: Birth to Age Five - NC DHHS',
    url: 'https://ncchildcare.ncdhhs.gov/Portals/0/documents/pdf/E/Early_Literacy_Development_Birth-5.pdf',
    domain: 'literacy',
  },
  puranik2011: {
    title: 'Emergent literacy & name writing (Puranik 2011)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3172137/',
    domain: 'literacy',
  },
};
