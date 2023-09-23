import setupApi from './setupApi';

import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { IControlOptions } from './types';

function HistoryControl(control: MapboxDraw, options: Partial<IControlOptions>) {
  return setupApi(control, options);
}

export default HistoryControl;
