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



