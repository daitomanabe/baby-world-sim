export type EvidenceLevel =
  | "public_guideline"
  | "hospital_handout"
  | "peer_reviewed"
  | "book"
  | "expert_article"
  | "placeholder";

export type Domain =
  | "vision"
  | "hearing"
  | "touch"
  | "smell"
  | "taste"
  | "language"
  | "motor"
  | "cognition";

export type Milestone = {
  id: string;
  weekStart: number; // inclusive
  weekEnd?: number; // inclusive (optional)
  domain: Domain;
  title: string;
  summary: string;
  details?: string;
  sourceTitle: string;
  sourceUrl: string;
  evidenceLevel: EvidenceLevel;
  notes?: string;
};

export type CurvePoint = { week: number; value: number };

export type Curve = {
  key: string;
  description: string;
  weekMin: number;
  weekMax: number;
  unit?: string;
  points: CurvePoint[];
  isInterpolated: boolean;
  evidence: {
    sourceTitle: string;
    sourceUrl: string;
    evidenceLevel: EvidenceLevel;
    notes?: string;
  };
};
