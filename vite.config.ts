import { reactRouter } from '@react-router/dev/vite'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import tsconfigPaths from 'vite-tsconfig-paths'

import 'dotenv/config'

export default defineConfig(({ command }) => ({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    ...(command === 'build'
      ? [
          compression(),
          compression({
            algorithm: 'brotliCompress',
            filename: '[path][base].br',
          }),
        ]
      : []),
  ],
}))
