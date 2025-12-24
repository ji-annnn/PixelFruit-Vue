<template>
  <div class="ui-panel">
    <div class="form-group">
      <label>{{ $t('ui.bgDark') }}</label>
      <div class="color-desc">{{ $t('ui.bgDarkDesc') }}</div>
      <div class="color-input-group">
        <input 
          type="color" 
          v-model="theme.bgDark"
          @change="updateTheme"
          class="color-picker"
        />
        <input 
          type="text" 
          v-model="theme.bgDark"
          @change="updateTheme"
          class="color-text-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label>{{ $t('ui.bgCard') }}</label>
      <div class="color-desc">{{ $t('ui.bgCardDesc') }}</div>
      <div class="color-input-group">
        <input 
          type="color" 
          v-model="theme.bgCard"
          @change="updateTheme"
          class="color-picker"
        />
        <input 
          type="text" 
          v-model="theme.bgCard"
          @change="updateTheme"
          class="color-text-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label>{{ $t('ui.textMain') }}</label>
      <div class="color-desc">{{ $t('ui.textMainDesc') }}</div>
      <div class="color-input-group">
        <input 
          type="color" 
          v-model="theme.textMain"
          @change="updateTheme"
          class="color-picker"
        />
        <input 
          type="text" 
          v-model="theme.textMain"
          @change="updateTheme"
          class="color-text-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label>{{ $t('ui.accentBlue') }}</label>
      <div class="color-desc">{{ $t('ui.accentBlueDesc') }}</div>
      <div class="color-input-group">
        <input 
          type="color" 
          v-model="theme.accentBlue"
          @change="updateTheme"
          class="color-picker"
        />
        <input 
          type="text" 
          v-model="theme.accentBlue"
          @change="updateTheme"
          class="color-text-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label>{{ $t('ui.accentRed') }}</label>
      <div class="color-desc">{{ $t('ui.accentRedDesc') }}</div>
      <div class="color-input-group">
        <input 
          type="color" 
          v-model="theme.accentRed"
          @change="updateTheme"
          class="color-picker"
        />
        <input 
          type="text" 
          v-model="theme.accentRed"
          @change="updateTheme"
          class="color-text-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label>{{ $t('ui.btnPrimary') }}</label>
      <div class="color-desc">{{ $t('ui.btnPrimaryDesc') }}</div>
      <div class="color-input-group">
        <input 
          type="color" 
          v-model="theme.btnPrimary"
          @change="updateTheme"
          class="color-picker"
        />
        <input 
          type="text" 
          v-model="theme.btnPrimary"
          @change="updateTheme"
          class="color-text-input"
        />
      </div>
    </div>

    <div class="footer-actions">
      <button class="btn-reset" @click="resetTheme">{{ $t('ui.reset') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUIStore } from '../../store/UI'
import type { ColorTheme } from '../../type'

const uiStore = useUIStore()
const { colorTheme } = storeToRefs(uiStore)

const theme = ref<ColorTheme>({ ...colorTheme.value })

onMounted(() => {
  theme.value = { ...colorTheme.value }
})

const updateTheme = () => {
  uiStore.updateColorTheme(theme.value)
}

const resetTheme = () => {
  uiStore.resetColorTheme()
  theme.value = { ...colorTheme.value }
}
</script>

<style scoped>
.ui-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-main);
  margin-bottom: 6px;
}

.color-desc {
  font-size: 11px;
  color: var(--text-sub);
  margin-bottom: 8px;
  line-height: 1.4;
  opacity: 0.8;
}

.color-input-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.color-picker {
  width: 50px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  background: none;
  padding: 0;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.color-text-input {
  flex: 1;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-family: monospace;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.color-text-input:focus {
  border-color: var(--accent-blue);
}

.footer-actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}

.btn-reset {
  background-color: var(--accent-blue);
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-reset:hover {
  opacity: 0.9;
}
</style>
