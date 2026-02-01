# Implementation Plan - Baby World Sim MVP

## Status Overview
- **Build**: ✅ Passing (npm run build successful)
- **Current Week**: 6 (Planner task breakdown phase)
- **Date**: 2026-02-01

## Architecture Summary

### Existing Implementation
✅ **Core Infrastructure**
- Vite + React + TypeScript setup
- Basic type definitions (Milestone, Curve, EvidenceLevel, Domain)
- Timeline slider (0-208 weeks) with week-to-age conversion
- Data loading from JSON (milestones.sample.json, curves.sample.json)
- Interpolation library for curve evaluation
- Four simulation panel skeletons (Visual, Audio, NonReproducible, Language)

✅ **Visual Simulation Panel**
- Canvas-based rendering with placeholder scene (gradient, shapes)
- Clarity curve integration (vision.clarity)
- Basic blur filter based on week
- Vignette effect
- Disclaimer text included

### Gaps & MVP Requirements

The PROMPT.md defines MVP completion criteria. Based on ROADMAP.md Phase 1 and current implementation, here are the remaining tasks:

---

## Task Breakdown

### Priority 1: Data Foundation (Blocking)

#### T1.1 - Populate Sample Milestones
**Files**: `src/data/milestones.sample.json`
**Description**: Add representative milestone data across all domains for key developmental stages
**Requirements**:
- At least 10-15 milestones covering:
  - Vision: eye tracking (8-12w), color discrimination (12-16w), depth perception (16-24w)
  - Hearing: directional response (12-16w), speech sound discrimination (24-48w)
  - Language: first words (48-52w), two-word phrases (96-104w), vocabulary explosion (104-156w)
  - Motor: head control (8-12w), sitting (24-28w), walking (48-56w)
- Include proper sourceTitle, sourceUrl, evidenceLevel for each
- Follow existing JSON schema from types.ts

**Acceptance**: JSON validates, at least 3 milestones per domain (vision, hearing, language, motor)

---

#### T1.2 - Populate Sample Curves
**Files**: `src/data/curves.sample.json`
**Description**: Add development curves for simulation parameters
**Requirements**:
- Vision curves: clarity (already exists, verify), contrast_sensitivity, color_saturation
- Hearing curves: localization_accuracy, frequency_range_low, frequency_range_high
- Touch/exploration curves: oral_exploration_ratio, manual_exploration_ratio
- Language curves: estimated_vocabulary (with isInterpolated=true flag)
- Each curve needs 5-10 data points across 0-208 weeks
- Include proper evidence metadata

**Acceptance**: At least 8 curves defined, evalCurve() works for all keys

---

### Priority 2: Visual Simulation Enhancement

#### T2.1 - Add Real Scene Image
**Files**: `src/features/simulation/VisualSimCanvas.tsx`, `public/`
**Description**: Replace placeholder gradient with actual photo scene
**Requirements**:
- Add sample image to public/ (e.g., room with toys, face, high contrast objects)
- Load image in canvas
- Apply filters over real image content
- Maintain blur and vignette effects

**Acceptance**: Canvas shows real image with age-appropriate filtering

---

#### T2.2 - Expand Visual Filters
**Files**: `src/features/simulation/VisualSimCanvas.tsx`
**Description**: Add saturation and contrast adjustments
**Requirements**:
- Read vision.color_saturation curve
- Read vision.contrast curve (or similar)
- Apply CSS filter or canvas manipulation: `contrast()`, `saturate()`
- Display current parameter values in UI (already partially done for clarity)

**Acceptance**: Newborn (week 0) shows low sat/contrast, 4-year-old (week 208) shows mature values

---

### Priority 3: Audio Simulation Implementation

#### T3.1 - Audio Source Generation
**Files**: `src/features/simulation/AudioSimPanel.tsx`, potentially `src/lib/audio.ts`
**Description**: Implement Web Audio API sound synthesis
**Requirements**:
- Create AudioContext on user interaction (button "Play Sound")
- Generate 2-3 sound types: voice-like (formants), rattle-like (noise burst), pure tone
- Play through speakers with stop/start control
- Add UI note: "Click to play sound" (avoid autoplay restrictions)

**Acceptance**: User can trigger sound playback, hears synthesized audio

---

#### T3.2 - Spatial Audio Simulation
**Files**: `src/features/simulation/AudioSimPanel.tsx`, `src/lib/audio.ts`
**Description**: Simulate age-dependent sound localization accuracy
**Requirements**:
- Read hearing.localization_error curve (0-208 weeks)
- Apply panning (PannerNode or StereoPannerNode)
- Add random angular error proportional to curve value
- Display "Target direction: X°, Perceived: Y° (±Z° error)"

**Acceptance**: Newborn has larger localization error, decreases with age

---

#### T3.3 - Audio Milestone Cards
**Files**: `src/features/simulation/AudioSimPanel.tsx`
**Description**: Display hearing milestones relevant to current week
**Requirements**:
- Filter MILESTONES array for domain="hearing" and current week in [weekStart, weekEnd]
- Render milestone cards below audio controls
- Show title, summary, source link, evidence level badge

**Acceptance**: At week 12, shows "Turns toward sound source" milestone (example)

---

### Priority 4: Non-Reproducible Senses Panel

#### T4.1 - Exploration Mode Graph
**Files**: `src/features/simulation/NonReproducibleSensesPanel.tsx`
**Description**: Visualize shift from oral to manual exploration
**Requirements**:
- Read touch.oral_exploration_ratio and touch.manual_exploration_ratio curves
- Render as stacked area chart or simple bar chart (use inline SVG or basic div bars)
- X-axis: age milestones (0, 6m, 12m, 24m, 48m)
- Y-axis: relative proportion (0-1)
- Label "Mouth" vs "Hands" clearly

**Acceptance**: Chart shows mouth dominance at 0-6m, hands increasing 6m+

---

#### T4.2 - Touch/Taste/Smell Milestone Cards
**Files**: `src/features/simulation/NonReproducibleSensesPanel.tsx`
**Description**: Display relevant milestones for these domains
**Requirements**:
- Filter for domain="touch" | "taste" | "smell"
- Show cards for current week
- Include disclaimer: "These senses cannot be reproduced, only described"

**Acceptance**: Displays "Introduction to solid foods" around week 24-26 (example)

---

### Priority 5: Language & Concept Panel

#### T5.1 - Milestone Card Display
**Files**: `src/features/simulation/LanguageConceptPanel.tsx`
**Description**: Show language/cognition milestones for current week
**Requirements**:
- Filter domain="language" | "cognition"
- Group by category if possible (e.g., "Receptive Language", "Expressive Language", "Social Cognition")
- Render cards with title, summary, source, evidence badge
- Add note: "Language estimates are approximate and show high individual variation"

**Acceptance**: Week 52 shows "First words (1-3)", week 104 shows "Two-word phrases"

---

#### T5.2 - Vocabulary Curve Visualization
**Files**: `src/features/simulation/LanguageConceptPanel.tsx`
**Description**: Display estimated vocabulary growth over time
**Requirements**:
- Read language.estimated_vocabulary curve
- Render as line chart (SVG path or canvas)
- Mark current week with vertical line
- Label axes: "Weeks" (X), "Estimated Words" (Y)
- Prominent label: "⚠️ This curve is INTERPOLATED - individual variation is very high"

**Acceptance**: Shows sigmoid-like growth curve, current week highlighted

---

### Priority 6: Timeline Enhancements

#### T6.1 - Age Jump Buttons
**Files**: `src/components/Timeline/TimelineSlider.tsx`
**Description**: Add quick-jump buttons for key ages
**Requirements**:
- Add buttons: [Birth] [6m] [12m] [24m] [36m] [48m]
- Convert months to weeks: 6m≈26w, 12m≈52w, 24m≈104w, 36m≈156w, 48m≈208w
- onClick: setWeek to corresponding value
- Style as small chips/buttons below slider

**Acceptance**: Clicking "12m" jumps slider to week 52

---

#### T6.2 - Play/Pause Animation (Optional)
**Files**: `src/components/Timeline/TimelineSlider.tsx`
**Description**: Auto-advance timeline with play button
**Requirements**:
- Add [▶ Play] / [⏸ Pause] button
- On play: increment week every 200ms with setInterval
- On pause: clearInterval
- Stop at week 208

**Acceptance**: Play button smoothly animates timeline from current week to 208

---

### Priority 7: UI Polish & Documentation

#### T7.1 - Evidence Level Badges
**Files**: `src/components/EvidenceBadge.tsx` (new), integrate into panels
**Description**: Create reusable component for evidence level display
**Requirements**:
- Props: evidenceLevel: EvidenceLevel
- Render color-coded badge:
  - public_guideline → Green "Official Guideline"
  - peer_reviewed → Blue "Peer-Reviewed"
  - book → Yellow "Book/Expert"
  - placeholder → Gray "Placeholder"
- Use in all milestone cards

**Acceptance**: All milestone cards show color-coded badge

---

#### T7.2 - Source Link Component
**Files**: `src/components/SourceLink.tsx` (new), integrate into panels
**Description**: Standardized external link display
**Requirements**:
- Props: sourceTitle, sourceUrl
- Render as `<a href={url} target="_blank" rel="noopener">{title} ↗</a>`
- Style: underline on hover, muted color

**Acceptance**: All sources are clickable external links

---

#### T7.3 - Update README Quickstart
**Files**: `README.md`
**Description**: Ensure users can run the app immediately
**Requirements**:
- Verify instructions: `npm install && npm run dev`
- Add "Build: `npm run build`" step
- Add screenshot or GIF (optional for MVP)

**Acceptance**: README matches current package.json scripts

---

### Priority 8: Testing & Validation

#### T8.1 - Build Verification
**Files**: CI setup (future), run manually
**Description**: Ensure TypeScript compilation passes
**Requirements**:
- `npm run build` exits with code 0
- No TypeScript errors
- dist/ artifacts generated

**Acceptance**: Build passes ✅ (already passing as of this plan)

---

#### T8.2 - Manual Smoke Test
**Description**: Verify all panels work end-to-end
**Requirements**:
- Start dev server: `npm run dev`
- Drag timeline slider from 0 to 208
- Verify:
  - Visual panel updates (blur decreases)
  - Audio panel shows different milestones at different weeks
  - Language panel vocabulary curve renders
  - No console errors
  - Disclaimer text is visible

**Acceptance**: Planner or Builder documents test pass in .agent/scratchpad.md

---

## Implementation Order

### Phase A: Foundation (Do First)
1. T1.1 - Populate Sample Milestones
2. T1.2 - Populate Sample Curves
3. T8.1 - Build Verification (should pass after data changes)

### Phase B: Core Simulation Features
4. T2.1 - Add Real Scene Image
5. T2.2 - Expand Visual Filters
6. T3.1 - Audio Source Generation
7. T3.2 - Spatial Audio Simulation
8. T5.1 - Language Milestone Display
9. T4.1 - Exploration Mode Graph

### Phase C: Milestone Integration
10. T3.3 - Audio Milestone Cards
11. T4.2 - Touch/Taste/Smell Milestone Cards
12. T5.2 - Vocabulary Curve Visualization

### Phase D: UX Polish
13. T6.1 - Age Jump Buttons
14. T7.1 - Evidence Level Badges
15. T7.2 - Source Link Component

### Phase E: Validation
16. T8.2 - Manual Smoke Test
17. T7.3 - Update README Quickstart

### Phase F: Optional (If Time Permits)
18. T6.2 - Play/Pause Animation

---

## Definition of Done (MVP Complete)

Per PROMPT.md Success Criteria:

- ✅ npm run build succeeds
- ✅ Week slider operates 0-208 weeks
- ✅ At least one simulation panel works interactively (Visual panel already works)
- 🔲 Milestones display and change with week
- 🔲 All changes pushed to remote
- 🔲 .agent/iteration.log is current
- 🔲 COMPLETION_REPORT.md generated

**Target**: Complete Phase A-E for full MVP. Phase F is stretch goal.

---

## Risk & Dependencies

### Risks
- **Audio autoplay restrictions**: Mitigated by requiring user click to start audio
- **Data quality**: Milestones require research; use placeholders with proper evidence flags if needed
- **Performance**: Canvas re-rendering on every week change - optimize if laggy (use debounce/memo)

### Dependencies
- No external API dependencies (all client-side)
- No backend required for MVP
- Sample data can be placeholder with proper evidence flags

---

## Notes for Builder

- Follow existing code style: functional React components, TypeScript strict mode
- Keep components small and focused
- Always include evidence/source metadata
- Use existing type definitions from types.ts
- Test with `npm run build` after each significant change
- Update .agent/scratchpad.md with progress after each task
- Git commit after each completed task following PROMPT.md instructions

---

**Last Updated**: 2026-02-01 (Planner, iteration #6)
