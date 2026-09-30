import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Multi-page site: the home page and the team page are separate HTML entries.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        team: resolve(import.meta.dirname, 'team.html'),
      },
    },
  },
});
