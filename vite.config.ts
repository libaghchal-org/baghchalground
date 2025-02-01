import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/baghchalground.ts'),
      name: 'Baghchalground',
      fileName: 'baghchalground',
    },
    rollupOptions: {
      output: {
        assetFileNames: ({ type, name }) => {
          if (type === 'asset' && name && name.endsWith('.css')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    sourcemap: true,
  },
  server: {
    open: false,
  },
});
