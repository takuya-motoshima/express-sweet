import typescript from 'rollup-plugin-typescript2';
import {terser} from "rollup-plugin-terser";
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'builtin-modules'
import pkg from './package.json';
import alias from '@rollup/plugin-alias';

export default {
  external: [
    ...builtins,
    'express',
    'sequelize',
    'passport',
    'passport-local',
    '@aws-sdk/client-rekognition',
    '@aws-sdk/node-http-handler',
    '@aws-sdk/client-ses',
    'libmime',
  ],
  // external: builtins,
  // external: Object.keys(pkg['dependencies'] || []),
  input: './src/index.ts',
  plugins: [
    alias({
      entries: {
        'handlebars-extd': 'handlebars-extd/dist/build.common.js'
      }
    }),
    typescript({
      tsconfigDefaults: {compilerOptions: {}},
      tsconfig: "tsconfig.json",
      tsconfigOverride: {compilerOptions: {}},
      useTsconfigDeclarationDir: true
    }),
    terser(),
    json(),
    commonjs(),
    resolve({
      mainFields: ['module', 'main'],
      // preferBuiltins: false
    })
  ],
  output: [
    {
      format: 'esm',
      file: pkg.module
    }, {
      format: 'cjs',
      file: pkg.main
    }
  ],
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}