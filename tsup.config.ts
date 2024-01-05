/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.tsx'],
  format: ['cjs', 'esm'],
  sourcemap: false,
  target: 'chrome100',
  clean: true,
  // dts: false,
  dts: true,
  platform: 'neutral',
});
