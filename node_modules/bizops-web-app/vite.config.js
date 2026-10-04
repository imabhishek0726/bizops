import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  resolve: {
    alias: {
      '@bizops/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
      '@bizops/tools': path.resolve(__dirname, '../../packages/tools/src/index.ts'),
      '@bizops/agent': path.resolve(__dirname, '../../packages/agent/src/index.ts')
    }
  }
});
