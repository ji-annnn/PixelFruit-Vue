import { defineStore } from 'pinia'
import type { ColorTheme } from '../type'

// 默认颜色主题
const defaultTheme: ColorTheme = {
  bgDark: '#1e1e1e',
  bgCard: '#2b2b2b',
  bgSecondary: '#333333',
  textMain: '#e0e0e0',
  textSub: '#a0a0a0',
  accentBlue: '#3a6df0',
  accentRed: '#a83232',
  borderColor: '#444',
  btnPrimary: '#2b4c9b',
  btnDanger: '#7a2e2e',
  btnDark: '#444'
}

export const useUIStore = defineStore('ui', {
  state: () => ({
    // 颜色主题配置
    colorTheme: { ...defaultTheme } as ColorTheme,
    // 左侧面板配置
    leftConfig: {
      fileName: '',
      autoWhiteBalance: true,
      cameraWhiteBalance: false,
      brightness: 1.0,
      exposure: 0.0,
      saturation: 100,
      contrast: 0,
      filter: 'none',
      lut: null
    },
    // 右侧面板配置
    rightConfig: {
      activeTab: 'color',
      params: {
        redHue: 0,
        greenHue: 0,
        blueHue: 0,
        highlights: 0,
        shadows: 0,
        whites: 100
      },
      imageInfo: {
        previewUrl: '',
        position: '',
        rgb: '',
        brightness: '',
        hue: ''
      }
    },
    // Dialog 配置
    dialog: {
      visible: false,
      currentTab: 'ai',
      formData: {
        provider: 'alibaba',
        modelName: 'qwen-vl-flash',
        apiKey: ''
      }
    }
  }),
  actions: {
    // 更新颜色主题
    updateColorTheme(theme: Partial<ColorTheme>) {
      this.colorTheme = { ...this.colorTheme, ...theme }
      this.applyThemeToDocument()
    },
    // 重置为默认主题
    resetColorTheme() {
      this.colorTheme = { ...defaultTheme }
      this.applyThemeToDocument()
    },
    // 应用主题到文档根元素（CSS 变量）
    applyThemeToDocument() {
      if (typeof document !== 'undefined') {
        const root = document.documentElement
        root.style.setProperty('--bg-dark', this.colorTheme.bgDark)
        root.style.setProperty('--bg-card', this.colorTheme.bgCard)
        root.style.setProperty('--bg-secondary', this.colorTheme.bgSecondary)
        root.style.setProperty('--text-main', this.colorTheme.textMain)
        root.style.setProperty('--text-sub', this.colorTheme.textSub)
        root.style.setProperty('--accent-blue', this.colorTheme.accentBlue)
        root.style.setProperty('--accent-red', this.colorTheme.accentRed)
        root.style.setProperty('--border-color', this.colorTheme.borderColor)
        root.style.setProperty('--btn-primary', this.colorTheme.btnPrimary)
        root.style.setProperty('--btn-danger', this.colorTheme.btnDanger)
        root.style.setProperty('--btn-dark', this.colorTheme.btnDark)
      }
    }
  },
  persist: {
    key: 'ui-store',
    storage: localStorage
  }
})

