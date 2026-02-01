# Baby World Simulator v0.3 Implementation Plan

## Overview
Integrate the v0.3 detailed model (baby_world_monthly_model.v0.3.detailed.json) with focus on MVP features:
1. Data integration (JSON → TypeScript)
2. Visual filter pipeline
3. Audio simulation (WebAudio)
4. Evidence UI (source citations)

## Phase 1: Data Integration & Foundation

### [x] Task 1.1: Type definitions for v0.3 model
**File**: `src/data/model.ts`
**Description**: Create TypeScript interfaces for the complete v0.3 JSON structure
- MonthlyData interface (months[0..48])
- RenderParams (visual, audio)
- VisionRepresentation (6 levels)
- Cognition (conceptRepresentation)
- Sources, Curves, Milestones
- TaskLibrary
**Priority**: 1 (Critical - foundation for all other work)

### [x] Task 1.2: Import and expose v0.3 JSON data
**File**: `src/data/index.ts`
**Description**: Import baby_world_monthly_model.v0.3.detailed.json and export typed data
- Import JSON with type assertion
- Export months array with proper typing
- Export metadata (modelVersion, sources, curves, milestones)
- Verify JSON loads without errors
**Priority**: 1 (Critical - required for all features)
**Depends on**: Task 1.1

### [x] Task 1.3: Monthly data interpolation utilities
**File**: `src/lib/interp.ts`
**Description**: Update interpolation functions to handle v0.3 monthly data (months 0..48)
- Add support for visual renderParams (blur, contrast, saturation, vignette, etc.)
- Add support for audio renderParams (noiseLevel, sourceLocalization, etc.)
- Handle isInterpolated flag for proxy data
- Linear/cubic interpolation helpers
**Priority**: 1 (Critical - data access layer)
**Depends on**: Task 1.1

## Phase 2: Visual Simulation (MVP)

### [x] Task 2.1: Visual filter pipeline - basic implementation
**File**: `src/features/simulation/VisualSimCanvas.tsx`
**Module**: `visual.filterPipeline`
**Description**: Apply visual filters from renderParams.visual
- Read months[n].renderParams.visual (blur, contrast, saturation, vignette)
- Apply CSS filters or Canvas filters to scene
- Show before/after toggle
- Display parameter values in UI
**Priority**: 2 (High - core visual feature)
**Depends on**: Task 1.2, Task 1.3

### [ ] Task 2.2: Depth cue renderer
**File**: `src/features/simulation/VisualSimCanvas.tsx`
**Module**: `visual.depthRenderer`
**Description**: Implement 2D→3D depth cues (parallax, occlusion, size perspective)
- Read months[n].renderParams.visual.depthCueStrength
- Add toggleable depth effects
- Simple parallax or layered scene approach
**Priority**: 3 (Medium - nice-to-have for MVP)
**Depends on**: Task 2.1

### [ ] Task 2.3: Edge detection overlay
**File**: `src/features/simulation/VisualSimCanvas.tsx`
**Module**: `visual.edgeOverlay`
**Description**: Show edge maps/features as overlay (6 levels from visionRepresentation)
- Read months[n].visionRepresentation.levels
- Display as semi-transparent overlay
- Toggle visibility
- Color-code by level
**Priority**: 3 (Medium - good for understanding visual processing)
**Depends on**: Task 2.1

### [ ] Task 2.4: Semantic label overlay
**File**: `src/features/simulation/VisualSimCanvas.tsx`
**Module**: `visual.semanticOverlay`
**Description**: Display semantic labels/categories over objects
- Read months[n].renderParams.visual.semanticLabelAlpha
- Show labels when alpha > 0
- Toggle via appFlags.enableSemanticLabels
**Priority**: 3 (Medium)
**Depends on**: Task 2.1

## Phase 3: Audio Simulation (MVP)

### [ ] Task 3.1: WebAudio synthesis with noise
**File**: `src/features/simulation/AudioSimPanel.tsx`
**Module**: `audio.webAudio`
**Description**: Implement audio playback using renderParams.audio
- Read months[n].renderParams.audio (noiseLevel, sourceLocalization, etc.)
- Generate synthetic audio + noise mix using WebAudio API
- Play/pause controls
- Volume/noise ratio sliders for demonstration
**Priority**: 2 (High - core audio feature)
**Depends on**: Task 1.2, Task 1.3

## Phase 4: Evidence & Attribution (MVP - Critical for Ethical Use)

### [x] Task 4.1: Evidence badges UI component
**File**: `src/components/Evidence/EvidenceBadge.tsx` (new)
**Module**: `evidence.ui`
**Description**: Create reusable component for showing evidence level
- Display evidenceLevel (experimental, some, moderate, strong, meta)
- Show sourceLink as clickable link
- Show isInterpolated proxy warning when applicable
- Visual design: small badge/chip
**Priority**: 1 (Critical - ethical requirement)

### [ ] Task 4.2: Integrate evidence badges into visual panel
**File**: `src/features/simulation/VisualSimCanvas.tsx`
**Module**: `evidence.ui`
**Description**: Add evidence badges to visual simulation display
- Show source links for each visual parameter
- Display proxy/interpolation warnings
- Link to relevant research from sources array
**Priority**: 1 (Critical)
**Depends on**: Task 4.1

### [ ] Task 4.3: Integrate evidence badges into audio panel
**File**: `src/features/simulation/AudioSimPanel.tsx`
**Module**: `evidence.ui`
**Description**: Add evidence badges to audio simulation display
- Show source links for audio parameters
- Display proxy/interpolation warnings
**Priority**: 1 (Critical)
**Depends on**: Task 4.1

### [x] Task 4.4: Evidence disclaimer component
**File**: `src/components/Evidence/Disclaimer.tsx` (new)
**Module**: `evidence.ui`
**Description**: Create prominent disclaimer about simulation limitations
- Explain proxy vs. direct evidence
- Link to all sources
- Warn against using for assessment/diagnosis
- Display at app top or in modal on first load
**Priority**: 1 (Critical - ethical requirement)

## Phase 5: Concept & Language Visualization (Post-MVP)

### [ ] Task 5.1: Concept graph view
**File**: `src/features/simulation/LanguageConceptPanel.tsx`
**Module**: `concept.graphView`
**Description**: Display feature→category→word relationships as graph
- Read months[n].cognition.conceptRepresentation.layers
- Render as node/edge graph (use simple SVG or canvas)
- Show connections between concept levels
**Priority**: 4 (Low - post-MVP)

## Phase 6: Task Engine (Post-MVP)

### [ ] Task 6.1: Task execution UI
**File**: `src/features/tasks/TaskRunner.tsx` (new)
**Module**: `task.engine`
**Description**: Execute and display recommended tasks (hide&seek, pointing, etc.)
- Read months[n].tasksRecommended
- Load taskLibrary
- Run task simulation
- Display results as explanation (NOT score/pass-fail)
**Priority**: 4 (Low - post-MVP)

## Phase 7: Authoring & QA Tools (Future)

### [ ] Task 7.1: Data editor GUI
**Module**: `authoring.dataEditor`
**Description**: GUI for editing curves/milestones/taskLibrary
**Priority**: 5 (Future)

### [ ] Task 7.2: CI link checker
**Module**: `qa.linkChecker`
**Description**: Automated checking of sources URLs, JSON schema, value ranges
**Priority**: 5 (Future)

## Testing & Validation Checkpoints

After each phase:
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` passes
- [ ] Manual testing in browser
- [ ] Evidence badges visible and functional
- [ ] No console errors

## Notes

- **Evidence is mandatory**: Every feature showing data MUST display evidence level and sources
- **Avoid assessment framing**: Tasks are explanatory, not diagnostic
- **Proxy transparency**: Always show when data is interpolated or estimated
- **Start simple**: MVP focuses on visual filters + audio + evidence UI
- **Iterative refinement**: Can enhance visual/audio quality in later iterations

## Completion Criteria

MVP is complete when:
1. ✅ v0.3 JSON data is typed and accessible
2. ✅ Visual filters (blur, contrast, etc.) apply based on month
3. ✅ Audio simulation plays with noise mixing
4. ✅ Evidence badges show on all data displays
5. ✅ Disclaimer about simulation limits is prominent
6. ✅ Build and typecheck pass
7. ✅ App runs without errors

---

**Generated by**: Planner hat
**Model version**: v0.3 (baby_world_monthly_model.v0.3.detailed.json)
**Date**: 2026-02-01
