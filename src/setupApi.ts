import HistoryControl from './HistoryControl';

import type { Map } from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { IApi, IControlOptions } from './types';

function setupApi(control: MapboxDraw, options?: Partial<IControlOptions>): IApi {
  const historyControl = new HistoryControl(control, options);

  return {
    onAdd: function (map: Map) {
      return historyControl.onAdd(map);
    },
    onRemove: function (map: Map) {
      return historyControl.onRemove(map);
    },
    getCurrentState: function () {
      return historyControl.history?.current;
    },
    redo: function () {
      historyControl.redo();
    },
    undo: function () {
      historyControl.undo();
    },
    hasRedo: function () {
      return historyControl.history?.hasRedo;
    },
    hasUndo: function () {
      return historyControl.history?.hasUndo;
    },
    operation: function (fn: (history: GeoJSON.Feature[]) => GeoJSON.Feature[], annotation?: unknown) {
      historyControl.history?.operation(fn, annotation);
    },
  };
}

export default setupApi;
