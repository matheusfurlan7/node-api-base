import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    silent: true,
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'commitlint.config.js',
        'eslint.config.mjs',
        'vitest.config.ts',
        'src/infra/http/index.ts',
        'src/infra/http/plugins/index.ts',
      ],
    },
  },
  plugins: [tsconfigPaths()],
});
