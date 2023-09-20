import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

const developmentMode = process.env.ROLLUP_WATCH === 'true';

export default {
  input: './src/index.ts',
  output: {
    name: 'MapboxDrawHistory',
    file: 'dist/mapbox-gl-draw-history.js',
    format: 'umd',
  },
  treeshake: !developmentMode,
  plugins: [
    typescript(),
    resolve({ moduleDirectories: ['node_modules'] }),
    !developmentMode ? terser() : false,
    babel({ extensions: ['.ts'], include: ['src/**/*.ts'], babelHelpers: 'bundled' }),
  ],
};
