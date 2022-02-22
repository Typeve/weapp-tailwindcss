import type { Plugin } from 'vite'
import { UserDefinedOptions } from '../types'
import { getOptions } from '../shared'
import { templeteHandler } from '../wxml'
// import renamePostcssPlugin from '../postcss/plugin'
// import type { Plugin as PostcssPlugin } from 'postcss'
// import postcssrc from 'postcss-load-config'
export function ViteWeappTailwindcssPlugin (options: UserDefinedOptions = {}): Plugin {
  const {
    htmlMatcher // cssMatcher, mainCssChunkMatcher
  } = getOptions(options)

  return {
    name: 'som:vite-plugin-uni-app-weapp-tailwindcss',
    // config (config) {},
    generateBundle (opt, bundle, isWrite) {
      const entries = Object.entries(bundle)
      for (let i = 0; i < entries.length; i++) {
        const [file, originalSource] = entries[i]
        if (htmlMatcher(file)) {
          if (originalSource.type === 'asset') {
            originalSource.source = templeteHandler(originalSource.source.toString())
          }
        }
      }
    }
  }
}
