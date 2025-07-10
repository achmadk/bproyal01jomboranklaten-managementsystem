import { reactRouter } from '@react-router/dev/vite'
import tailwindcssPostcss from '@tailwindcss/postcss'
import tailwindcssVite from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import tsconfigPaths from 'vite-tsconfig-paths'

import 'dotenv/config'

export default defineConfig(({ command }) => ({
  css: {
    postcss: {
      plugins: [tailwindcssPostcss],
    },
  },
  ...(command === "build" && {
    ssr: {
      noExternal: true
    }
  }),
  plugins: [
    tailwindcssVite(),
    reactRouter(),
    tsconfigPaths(),
    ...(command === 'build'
      ? [
          compression({
            algorithms: [
              "gzip",
              "brotliCompress",
              "zstd"
            ]
          })
        ]
      : []),
  ],
}))
