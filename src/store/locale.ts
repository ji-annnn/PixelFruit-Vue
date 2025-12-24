import { defineStore } from 'pinia'
import i18n from '../i18n'

type Locale = 'zh-CN' | 'en-US'

const getSavedLocale = (): Locale => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('locale')
    return (saved === 'zh-CN' || saved === 'en-US') ? saved : 'zh-CN'
  }
  return 'zh-CN'
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: getSavedLocale() as Locale
  }),
  actions: {
    setLocale(locale: Locale) {
      this.locale = locale
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', locale)
      }
      i18n.global.locale.value = locale
    }
  },
  persist: {
    key: 'locale-store',
    storage: localStorage
  }
})

