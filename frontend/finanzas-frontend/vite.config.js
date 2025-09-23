import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupTests.js',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'], // text = consola, lcov = para SonarCloud
    },
  }
})
