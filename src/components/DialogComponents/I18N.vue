<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="handleLanguageChange" class="language-select">
      <option value="zh-CN">中文</option>
      <option value="en-US">English</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLocaleStore } from '../../store/locale'
import { useI18n } from 'vue-i18n'

const localeStore = useLocaleStore()
const { locale } = useI18n()
const currentLocale = ref(locale.value)

onMounted(() => {
  currentLocale.value = localeStore.locale
})

const handleLanguageChange = () => {
  localeStore.setLocale(currentLocale.value as any)
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

.language-select {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.language-select:focus {
  border-color: var(--accent-blue);
}

.language-select:hover {
  border-color: var(--accent-blue);
}
</style>

