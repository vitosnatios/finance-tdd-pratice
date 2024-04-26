/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/__tests__/**/*.+(ts|js|tsx|jsx)'],
    exclude: ['node_modules'],
    setupFiles: ['./src/setupTests.ts'],
  },
});
