import type { UserDefinedOptions } from './types'
import { noop } from '@/utils'
import { SimpleMappingChars2String } from '@/dic'

// import { mangleClassRegex } from '@/mangle/expose'

export const defaultOptions: UserDefinedOptions = {
  cssMatcher: (file) => /.+\.(?:wx|ac|jx|tt|q|c)ss$/.test(file),
  htmlMatcher: (file) => /.+\.(?:(?:(?:wx|ax|jx|ks|tt|q)ml)|swan)$/.test(file),
  jsMatcher: (file) => {
    if (file.includes('node_modules')) {
      return false
    }
    // remove jsx tsx ts case
    return /.+\.[cm]?js?$/.test(file)
  },
  mainCssChunkMatcher: (file, appType) => {
    switch (appType) {
      case 'uni-app': {
        return /^common\/main/.test(file)
      }
      case 'uni-app-vite': {
        // vite 旧版本和新版本对应的样式文件
        return file.startsWith('app') || /^common\/main/.test(file)
      }
      case 'mpx': {
        return file.startsWith('app')
      }
      case 'taro': {
        return file.startsWith('app')
      }
      case 'remax': {
        return file.startsWith('app')
      }
      case 'rax': {
        return file.startsWith('bundle')
      }
      case 'native': {
        return file.startsWith('app')
      }
      case 'kbone': {
        return /^(?:common\/)?miniprogram-app/.test(file)
      }
      default: {
        return true
      }
    }
  },
  wxsMatcher: (file) => {
    return false
    // if (file.includes('node_modules')) {
    //   return false
    // }
    // // remove jsx tsx ts case
    // return /.+\.(wx|sj)s?$/.test(file)
  },
  cssPreflight: {
    'box-sizing': 'border-box',
    'border-width': '0',
    'border-style': 'solid',
    'border-color': 'currentColor'
  },
  cssPreflightRange: 'view',
  replaceUniversalSelectorWith: 'view',
  disabled: false,
  customRuleCallback: noop,
  onLoad: noop,
  onStart: noop,
  onEnd: noop,
  onUpdate: noop,

  customAttributes: {},
  customReplaceDictionary: SimpleMappingChars2String,

  supportCustomLengthUnitsPatch: {
    units: ['rpx'],
    dangerousOptions: {
      gteVersion: '3.0.0',
      lengthUnitsFilePath: 'lib/util/dataTypes.js',
      packageName: 'tailwindcss',
      variableName: 'lengthUnits',
      overwrite: true
    }
  },
  appType: undefined,
  arbitraryValues: {
    allowDoubleQuotes: false
  },
  cssChildCombinatorReplaceValue: 'view + view',
  inlineWxs: false
}
