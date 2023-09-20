import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false
});

export default merge(baseConfig, {
  input: './example/index.html'
  // input: './out-tsc/lib/index.js',
  // output: {
  //     dir: 'dist',
  // }
});