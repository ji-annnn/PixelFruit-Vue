import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
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
  persist: {
    key: 'ui-store',
    storage: localStorage
  }
})

