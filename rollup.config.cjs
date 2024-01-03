import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';

export default [{
  input: 'src/main.jsx',
  output: {
    file: 'lib/bundle.cjs',
    format: 'cjs'
  },
  plugins: [
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'] // add .jsx here
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled'
    }),
    commonjs(),
    postcss({
      inject: true, // This will inject CSS to the head of the document
      minimize: true // This will minify the CSS
    }),
    image(),
    json()
  ]
}, 
{
  input: './src/entry-server.jsx', // Your server entry point
  output: {
    format: 'cjs', // CommonJS format for Node.js
    file: 'dist/server/bundle.cjs', // Output file
  },
  plugins: [
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'] // add .jsx here
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled'
    }),
    commonjs(),
    postcss({
      inject: true, // This will inject CSS to the head of the document
      minimize: true // This will minify the CSS
    }),
    image(),
    json()
  ],
  external: Object.keys(require('./package.json').dependencies), // Don't bundle dependencies
}];