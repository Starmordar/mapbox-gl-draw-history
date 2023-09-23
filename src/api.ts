import type { IControlOptions } from './types';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import HistoryControl from './HistoryControl';
import type { Map } from 'mapbox-gl';

function setupApi(control: MapboxDraw, options?: Partial<IControlOptions>) {
  const historyControl = new HistoryControl(control, options);
  let api: Record<string, any> = {};

  api.onAdd = function (map: Map) {
    return historyControl.onAdd(map);
  };

  api.onRemove = function (map: Map) {
    return historyControl.onRemove(map);
  };

  api.getCurrentState = function () {
    return historyControl.history?.current;
  };

  api.historyRedo = function () {
    historyControl.redo();
  };

  api.historyUndo = function () {
    historyControl.undo();
  };

  api.historyHasRedo = function () {
    return historyControl.history?.hasRedo;
  };

  api.historyHasUndo = function () {
    return historyControl.history?.hasUndo;
  };

  api.historyOperation = function (fn: (history: GeoJSON.Feature[]) => GeoJSON.Feature[], annotation?: unknown) {
    return historyControl.history?.operation(fn, annotation);
  };

  return api;
}

export default setupApi;
