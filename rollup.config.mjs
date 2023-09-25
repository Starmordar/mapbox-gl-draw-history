import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

const { BUILD, MINIFY } = process.env;
const minified = MINIFY === 'true';
const production = BUILD === 'production';

function getBuildOutputFile(build, minified) {
  switch (build) {
    case 'production':
      if (minified) return 'dist/mapbox-gl-draw-history.js';
      return 'dist/mapbox-gl-draw-history-unminified.js';
    default:
      return 'dist/mapbox-gl-draw-history-dev.js';
  }
}
const outputFile = getBuildOutputFile(BUILD, MINIFY);

export default {
  input: './src/index.ts',
  output: {
    name: 'MapboxDrawHistory',
    file: outputFile,
    format: 'umd',
    sourcemap: production ? true : 'inline',
    indent: false,
  },
  treeshake: production,
  plugins: [
    typescript(),
    resolve({ moduleDirectories: ['node_modules'] }),
    minified ? terser() : false,
    babel({ extensions: ['.ts'], include: ['src/**/*.ts'] }),
  ],
};
