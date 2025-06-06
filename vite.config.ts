import { reactRouter } from '@react-router/dev/vite'
import tailwindcssPostcss from '@tailwindcss/postcss'
import tailwindcssVite from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { compression, defineAlgorithm } from 'vite-plugin-compression2'
import tsconfigPaths from 'vite-tsconfig-paths'

import { compress } from '@mongodb-js/zstd'

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
            ]
          }),
          compression({
            algorithms: [
              // @ts-expect-error
              defineAlgorithm(
                // @ts-expect-error
                async (buffer: Buffer, options: { level: number }) =>
                  await compress(buffer, options.level),
                { level: 20 }
              )
            ],
            filename: '[path][base].zst'
          })
        ]
      : []),
  ],
}))
