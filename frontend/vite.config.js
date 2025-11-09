import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'

function getHtmlEntries(dir = 'src/pages') {
  const result = {}

  function traverse(folder) {
    const entries = fs.readdirSync(folder, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = resolve(folder, entry.name)

      if (entry.isDirectory()) {
        traverse(fullPath)
      } else if (entry.name.endsWith('.html')) {
        const name = entry.name.replace('.html', '')
        result[name] = fullPath
      }
    }
  }

  traverse(resolve(__dirname, dir))
  return result
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: getHtmlEntries(),
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
