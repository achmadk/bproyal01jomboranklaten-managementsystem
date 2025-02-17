import { reactRouter } from '@react-router/dev/vite'
import tailwindcssPostcss from '@tailwindcss/postcss'
import tailwindcssVite from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import tsconfigPaths from 'vite-tsconfig-paths'

import { compress } from '@mongodb-js/zstd'

import 'dotenv/config'

export default defineConfig(({ command }) => ({
  css: {
    postcss: {
      plugins: [tailwindcssPostcss],
    },
  },
  plugins: [
    tailwindcssVite(),
    reactRouter(),
    tsconfigPaths(),
    ...(command === 'build'
      ? [
          compression(),
          compression({
            algorithm: 'brotliCompress',
            filename: '[path][base].br',
          }),
          compression({
            async algorithm (buf, options) {
              // @ts-expect-error
              return await compress(buf, options.level)
            },
            compressionOptions: {
              level: 20
            },
            filename: '[path][base].zst',
          })
        ]
      : []),
  ],
}))
