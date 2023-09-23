import type { Map } from 'mapbox-gl';

export interface IControlOptions {
  listeners?: boolean;
  constrols?: boolean;
  keybindings?: boolean;
}

export interface IControlButtonOptions {
  title: string;
  className: string;
  onActivate: () => void;
}

export interface IApi {
  onAdd: (map: Map) => HTMLElement;
  onRemove: (map: Map) => void;

  getCurrentState: () => GeoJSON.Feature[] | undefined;
  redo: () => void;
  undo: () => void;

  hasRedo: () => boolean | undefined;
  hasUndo: () => boolean | undefined;

  operation: (fn: (history: GeoJSON.Feature[]) => GeoJSON.Feature[], annotation?: unknown) => void;
}
