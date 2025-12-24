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
  btnDark: '#444',
  btnNormal: '#3a6df0',
  btnGhost: '#3e4c63',
  inputBg: '#383838',
  inputText: '#fff',
  inputBorder: '#4a4a4a',
  inputFocusBorder: '#5b89f7'
}

export const useUIStore = defineStore('ui', {
  state: () => ({
    // 颜色主题配置
    colorTheme: { ...defaultTheme } as ColorTheme,
    // 主题预设列表
    themePresets: [] as Array<{ name: string; theme: ColorTheme }>,
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
        root.style.setProperty('--btn-normal', this.colorTheme.btnNormal)
        root.style.setProperty('--btn-ghost', this.colorTheme.btnGhost)
        root.style.setProperty('--input-bg', this.colorTheme.inputBg)
        root.style.setProperty('--input-text', this.colorTheme.inputText)
        root.style.setProperty('--input-border', this.colorTheme.inputBorder)
        root.style.setProperty('--input-focus-border', this.colorTheme.inputFocusBorder)
      }
    },
    // 保存主题预设
    saveThemePreset(name: string) {
      if (!name.trim()) return false
      const existingIndex = this.themePresets.findIndex(p => p.name === name)
      const preset = { name: name.trim(), theme: { ...this.colorTheme } }
      
      if (existingIndex >= 0) {
        this.themePresets[existingIndex] = preset
      } else {
        this.themePresets.push(preset)
      }
      
      // 保存到 localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-presets', JSON.stringify(this.themePresets))
      }
      return true
    },
    // 加载主题预设
    loadThemePreset(name: string) {
      const preset = this.themePresets.find(p => p.name === name)
      if (preset) {
        this.colorTheme = { ...preset.theme }
        this.applyThemeToDocument()
        return true
      }
      return false
    },
    // 删除主题预设
    deleteThemePreset(name: string) {
      this.themePresets = this.themePresets.filter(p => p.name !== name)
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-presets', JSON.stringify(this.themePresets))
      }
    },
    // 初始化主题预设列表
    initThemePresets() {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme-presets')
        if (saved) {
          try {
            this.themePresets = JSON.parse(saved)
          } catch (e) {
            this.themePresets = []
          }
        }
      }
    },
    // 导入主题（从 JSON）
    importTheme(themeData: any): { success: boolean; name?: string } {
      try {
        // 验证主题数据是否包含所有必需的字段
        const requiredFields: (keyof ColorTheme)[] = [
          'bgDark', 'bgCard', 'bgSecondary', 'textMain', 'textSub',
          'accentBlue', 'accentRed', 'borderColor',
          'btnPrimary', 'btnDanger', 'btnDark', 'btnNormal', 'btnGhost',
          'inputBg', 'inputText', 'inputBorder', 'inputFocusBorder'
        ]
        
        const isValid = requiredFields.every(field => 
          themeData[field] && typeof themeData[field] === 'string'
        )
        
        if (!isValid) {
          return { success: false }
        }
        
        // 提取 name 字段（如果存在）
        const themeName = themeData.name
        
        // 导入主题（排除 name 字段）
        const { name, ...themeWithoutName } = themeData
        this.colorTheme = { ...themeWithoutName } as ColorTheme
        this.applyThemeToDocument()
        
        return { success: true, name: themeName }
      } catch (e) {
        return { success: false }
      }
    }
  },
  persist: {
    key: 'ui-store',
    storage: localStorage
  }
})

