// Motion profile: one multiplier for every built-in animation length, one for rebuilt-UI size.
// 'reference' = the measured speed of the four 16:9 promos. 'reels' = 1.4x faster internals (focus
// pulls visibly done in ~8 f, faster typing and pops) and 1.35x larger rebuilt UI for a phone screen.
// Scene lengths and every explicit `at`/`dur` you write stay in frames - pace those with references/reels.md.
import React from 'react';

/** reference = the measured films; reels = x1.2 pace (x1.4 was tested and read too fast to follow), UI x1.35 for phones */
export const PROFILES = {reference: {speed: 1, ui: 1}, reels: {speed: 1.2, ui: 1.35}} as const;
export type ProfileName = keyof typeof PROFILES;
type P = {speed: number; ui: number};

const ProfileContext = React.createContext<P>(PROFILES.reference);

export const MotionProfile: React.FC<{preset?: ProfileName; speed?: number; ui?: number; children: React.ReactNode}> = ({preset = 'reference', speed, ui, children}) => (
  <ProfileContext.Provider value={{speed: speed ?? PROFILES[preset].speed, ui: ui ?? PROFILES[preset].ui}}>{children}</ProfileContext.Provider>
);

/** Current speed multiplier (1 = measured reference). */
export const useSpeed = () => React.useContext(ProfileContext).speed;
/** Current size multiplier for rebuilt UI (Graphics.tsx). */
export const useUi = () => React.useContext(ProfileContext).ui;

/** A built-in duration in frames, shortened by the profile (never below `min`). */
export const scaled = (frames: number, speed: number, min = 1) => Math.max(min, Math.round(frames / speed));
