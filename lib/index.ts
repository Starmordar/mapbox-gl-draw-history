import type { IControlOptions } from './types';

function setup(options: IControlOptions) {
  console.log(options);
  // return 'index 2'
}

function MapboxDrawHistory(options: IControlOptions) {
  setup(options);
}

export default MapboxDrawHistory;
