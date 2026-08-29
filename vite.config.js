import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        ['index', 'about', 'services', 'technology', 'education', 'cases', 'faq', 'contact']
          .map(name => [name, resolve(import.meta.dirname, `${name}.html`)])
      )
    }
  }
});
