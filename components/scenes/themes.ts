/**
 * Per-hobby visual themes for the CinematicStage.
 * All colors/lights/bloom live here so data/adventure.ts stays copy-only.
 */

export interface LightformerConfig {
  color: string;
  intensity: number;
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
}

export interface SceneTheme {
  /** Canvas clear color */
  background: string;
  fog: { color: string; near: number; far: number };
  key: { color: string; intensity: number; position: [number, number, number] };
  rim: { color: string; intensity: number; position: [number, number, number] };
  ambient: number;
  lightformers: LightformerConfig[];
  bloom: { intensity: number; threshold: number };
  contactShadow: { opacity: number; blur: number; animated?: boolean };
  cameraY?: number;
  /** Vertical offset applied to the model/scene group (recenters GLBs in frame) */
  modelY?: number;
  autoRotateSpeed?: number;
  /** Use drei <Sky> instead of a flat background color (paragliding) */
  sky?: boolean;
}

const softbox = (color: string, intensity = 2): LightformerConfig => ({
  color,
  intensity,
  position: [0, 5, -2],
  scale: [10, 4, 1],
  rotation: [Math.PI / 2, 0, 0],
});

const sideStrip = (
  color: string,
  x: number,
  intensity = 1.5
): LightformerConfig => ({
  color,
  intensity,
  position: [x, 1, 0],
  scale: [1, 6, 1],
  rotation: [0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0],
});

export const DEFAULT_THEME: SceneTheme = {
  background: '#0f172a',
  fog: { color: '#0f172a', near: 8, far: 24 },
  key: { color: '#ffffff', intensity: 2, position: [4, 6, 4] },
  rim: { color: '#60a5fa', intensity: 1.2, position: [-5, 3, -4] },
  ambient: 0.4,
  lightformers: [softbox('#ffffff'), sideStrip('#60a5fa', 5)],
  bloom: { intensity: 0.7, threshold: 0.9 },
  contactShadow: { opacity: 0.5, blur: 2.4 },
  autoRotateSpeed: 0.15,
};

export const SCENE_THEMES: Record<string, SceneTheme> = {
  '3dprint': {
    ...DEFAULT_THEME,
    background: '#0a1628',
    fog: { color: '#0a1628', near: 8, far: 22 },
    key: { color: '#e0f2fe', intensity: 1.5, position: [4, 6, 4] },
    rim: { color: '#38bdf8', intensity: 1.4, position: [-5, 2, -3] },
    lightformers: [softbox('#dbeafe', 1.5), sideStrip('#38bdf8', 5, 1.4)],
    bloom: { intensity: 0.9, threshold: 0.85 },
    contactShadow: { opacity: 0.55, blur: 2.6 },
    modelY: 0.55,
  },
  drones: {
    ...DEFAULT_THEME,
    background: '#020617',
    fog: { color: '#020617', near: 10, far: 30 },
    key: { color: '#94a3b8', intensity: 1.4, position: [3, 7, 3] },
    rim: { color: '#ef4444', intensity: 1.8, position: [-5, 2, -4] },
    ambient: 0.25,
    lightformers: [softbox('#64748b', 1.4), sideStrip('#ef4444', -5, 1.2)],
    bloom: { intensity: 1.0, threshold: 0.8 },
    contactShadow: { opacity: 0.45, blur: 3, animated: true },
    autoRotateSpeed: 0,
  },
  pcbuild: {
    ...DEFAULT_THEME,
    background: '#0c0507',
    fog: { color: '#0c0507', near: 7, far: 20 },
    key: { color: '#f8fafc', intensity: 1.2, position: [4, 6, 5] },
    rim: { color: '#ef4444', intensity: 1.4, position: [-5, 2, -3] },
    ambient: 0.3,
    lightformers: [softbox('#fca5a5', 1.2), sideStrip('#ef4444', 5, 1.4)],
    bloom: { intensity: 1.0, threshold: 0.8 },
    contactShadow: { opacity: 0.6, blur: 2.2 },
    modelY: 0.4,
    autoRotateSpeed: 0.2,
  },
  editing: {
    ...DEFAULT_THEME,
    background: '#170a14',
    fog: { color: '#170a14', near: 7, far: 20 },
    key: { color: '#ec4899', intensity: 1.6, position: [4, 5, 4] },
    rim: { color: '#8b5cf6', intensity: 1.4, position: [-5, 3, -3] },
    ambient: 0.35,
    lightformers: [softbox('#f9a8d4', 1.6), sideStrip('#8b5cf6', -5, 1.4)],
    bloom: { intensity: 1.1, threshold: 0.75 },
    contactShadow: { opacity: 0.4, blur: 3 },
    autoRotateSpeed: 0,
  },
  paragliding: {
    ...DEFAULT_THEME,
    background: '#7dd3fc',
    fog: { color: '#bae6fd', near: 12, far: 40 },
    key: { color: '#fff7ed', intensity: 2.6, position: [6, 8, 4] },
    rim: { color: '#7dd3fc', intensity: 1.2, position: [-5, 4, -4] },
    ambient: 0.6,
    lightformers: [softbox('#fef3c7', 2.4), sideStrip('#7dd3fc', 5, 1.6)],
    bloom: { intensity: 0.8, threshold: 0.85 },
    contactShadow: { opacity: 0.25, blur: 3.5 },
    sky: true,
    autoRotateSpeed: 0.1,
  },
  skiing: {
    ...DEFAULT_THEME,
    background: '#0e1330',
    fog: { color: '#c7d2fe', near: 14, far: 34 },
    key: { color: '#f8fafc', intensity: 2.4, position: [5, 8, 4] },
    rim: { color: '#818cf8', intensity: 1.6, position: [-6, 3, -4] },
    lightformers: [softbox('#e0e7ff', 2.4), sideStrip('#818cf8', -5, 1.6)],
    bloom: { intensity: 0.7, threshold: 0.9 },
    contactShadow: { opacity: 0.35, blur: 2.8 },
  },
  surfing: {
    ...DEFAULT_THEME,
    background: '#042f2e',
    fog: { color: '#134e4a', near: 10, far: 28 },
    key: { color: '#fef9c3', intensity: 1.4, position: [0, 5, -6] },
    rim: { color: '#5eead4', intensity: 1.4, position: [5, 3, 4] },
    ambient: 0.45,
    lightformers: [softbox('#fde68a', 1.8), sideStrip('#2dd4bf', 5, 1.6)],
    bloom: { intensity: 1.0, threshold: 0.8 },
    contactShadow: { opacity: 0, blur: 0 }, // ocean plane replaces the floor
    cameraY: 0.9,
    autoRotateSpeed: 0,
  },
};

export function getTheme(id: string): SceneTheme {
  return SCENE_THEMES[id] ?? DEFAULT_THEME;
}
