import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/main.jsx',
  output: {
    file: 'lib/bundle.cjs',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      inject: true, // This will inject CSS to the head of the document
      minimize: true // This will minify the CSS
    }),
    image(),
    json(),
    babel({ babelHelpers: 'bundled' })]
};