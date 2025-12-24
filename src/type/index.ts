import type { Component } from 'vue'

export interface DialogItem {
  id: number
  name: string
  component: Component
  key: string
}

export interface AIFormData {
  provider: 'alibaba' | 'openai' | 'anthropic'
  modelName: string
  apiKey: string
}

export interface ColorTheme {
  // 背景色
  bgDark: string
  bgCard: string
  bgSecondary: string
  // 文字色
  textMain: string
  textSub: string
  // 强调色
  accentBlue: string
  accentRed: string
  // 边框色
  borderColor: string
  // 按钮色
  btnPrimary: string
  btnDanger: string
  btnDark: string
}



