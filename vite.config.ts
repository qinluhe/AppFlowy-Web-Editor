import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

import { copyFileSync, mkdirSync, existsSync, readdir } from 'fs';

function copyLocalesPlugin() {
  return {
    name: 'copy-locales',
    closeBundle() {
      const srcDir = resolve(__dirname, 'src/locales');
      const destDir = resolve(__dirname, 'dist/locales');

      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }

      readdir(srcDir, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
        files.forEach(file => {
          if (file.endsWith('.json')) {
            copyFileSync(
              resolve(srcDir, file),
              resolve(destDir, file),
            );
          }

        });
      });
    },
  };
}

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  return ({
    root: isServe ? 'src/dev' : undefined,
    plugins: [
      react(),
      !isServe &&
      dts({
        insertTypesEntry: true,
        include: ['src'],
      }),
      copyLocalesPlugin(),
    ],
    build: isServe ? undefined : {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Editor',
        formats: ['es', 'cjs'],
        fileName: (format: string) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'i18next',
          'react-i18next',
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            i18next: 'i18next',
            'react-i18next': 'reactI18next',
          },
        },
      },
      sourcemap: false,
      minify: false,
    },
    server: {
      port: 5173,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
});