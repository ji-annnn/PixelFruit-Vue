import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './i18n'
import { useUIStore } from './store/UI'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(i18n)

// 初始化时应用颜色主题
const uiStore = useUIStore()
uiStore.initThemePresets()
uiStore.applyThemeToDocument()

app.mount('#app')
