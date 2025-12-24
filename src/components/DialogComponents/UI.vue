<template>
  <div class="ui-panel">
    <!-- 主题管理 -->
    <div class="section">
      <div class="section-title">{{ $t('ui.sectionThemeManage') }}</div>
      <div class="form-group">
        <label>{{ $t('ui.themeName') }}</label>
        <div class="color-desc">{{ $t('ui.themeNameDesc') }}</div>
        <div class="theme-manage-group">
          <select v-model="selectedThemeName" class="theme-select">
            <option value="">{{ $t('ui.selectOrInput') }}</option>
            <option v-for="preset in themePresets" :key="preset.name" :value="preset.name">
              {{ preset.name }}
            </option>
          </select>
          <input 
            v-if="!selectedThemeName || !themePresets.find(p => p.name === selectedThemeName)"
            type="text" 
            v-model="newThemeName"
            :placeholder="$t('ui.inputThemeName')"
            class="theme-name-input"
            @keyup.enter="saveCurrentTheme"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="theme-actions">
          <button class="btn-save" @click="saveCurrentTheme">{{ $t('ui.saveTheme') }}</button>
          <button 
            v-if="selectedThemeName && themePresets.find(p => p.name === selectedThemeName)"
            class="btn-load" 
            @click="loadSelectedTheme"
          >
            {{ $t('ui.loadTheme') }}
          </button>
          <button 
            v-if="selectedThemeName && themePresets.find(p => p.name === selectedThemeName)"
            class="btn-delete" 
            @click="deleteSelectedTheme"
          >
            {{ $t('ui.deleteTheme') }}
          </button>
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.importTheme') }}</label>
        <div class="color-desc">{{ $t('ui.importThemeDesc') }}</div>
        <textarea 
          v-model="importThemeJson"
          :placeholder="$t('ui.pasteThemeJson')"
          class="theme-json-textarea"
          rows="6"
        ></textarea>
        <div class="theme-import-actions">
          <button class="btn-import" @click="importThemeFromJson">{{ $t('ui.importThemeBtn') }}</button>
          <button class="btn-export" @click="exportCurrentTheme">{{ $t('ui.exportTheme') }}</button>
        </div>
        <div class="theme-reset-action">
          <button class="btn-reset" @click="resetTheme">{{ $t('ui.reset') }}</button>
        </div>
      </div>
    </div>

    <!-- 查看详细参数开关 -->
    <div class="section">
      <div class="form-group">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="showDetailedParams"
            class="detail-checkbox"
          />
          <span>{{ $t('ui.viewDetailedParams') }}</span>
        </label>
      </div>
    </div>

    <!-- 详细参数配置（通过 checkbox 控制显示） -->
    <template v-if="showDetailedParams">
      <!-- 全局基础颜色 -->
      <div class="section">
      <div class="section-title">{{ $t('ui.sectionGlobal') }}</div>
      <div class="form-group">
        <label>{{ $t('ui.textMain') }}</label>
        <div class="color-desc">{{ $t('ui.textMainDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.textMain" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.textMain" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.textSub') }}</label>
        <div class="color-desc">{{ $t('ui.textSubDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.textSub" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.textSub" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.borderColor') }}</label>
        <div class="color-desc">{{ $t('ui.borderColorDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.borderColor" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.borderColor" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
    </div>

    <!-- 左侧菜单 -->
    <div class="section">
      <div class="section-title">{{ $t('ui.sectionLeftPanel') }}</div>
      <div class="form-group">
        <label>{{ $t('ui.bgDark') }}</label>
        <div class="color-desc">{{ $t('ui.bgDarkDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.bgDark" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.bgDark" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.btnPrimary') }}</label>
        <div class="color-desc">{{ $t('ui.btnPrimaryDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.btnPrimary" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.btnPrimary" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.btnDanger') }}</label>
        <div class="color-desc">{{ $t('ui.btnDangerDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.btnDanger" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.btnDanger" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.btnDark') }}</label>
        <div class="color-desc">{{ $t('ui.btnDarkDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.btnDark" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.btnDark" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.btnGhost') }}</label>
        <div class="color-desc">{{ $t('ui.btnGhostDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.btnGhost" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.btnGhost" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.rangeThumb') }}</label>
        <div class="color-desc">{{ $t('ui.rangeThumbDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.accentBlue" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.accentBlue" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.selectBg') }}</label>
        <div class="color-desc">{{ $t('ui.selectBgDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.inputBg" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.inputBg" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.selectText') }}</label>
        <div class="color-desc">{{ $t('ui.selectTextDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.inputText" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.inputText" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
    </div>

    <!-- 右侧菜单 -->
    <div class="section">
      <div class="section-title">{{ $t('ui.sectionRightPanel') }}</div>
      <div class="form-group">
        <label>{{ $t('ui.bgDark') }}</label>
        <div class="color-desc">{{ $t('ui.bgDarkDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.bgDark" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.bgDark" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.tabActive') }}</label>
        <div class="color-desc">{{ $t('ui.tabActiveDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.accentBlue" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.accentBlue" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.rangeThumb') }}</label>
        <div class="color-desc">{{ $t('ui.rangeThumbDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.accentBlue" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.accentBlue" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
    </div>

    <!-- 对话框 -->
    <div class="section">
      <div class="section-title">{{ $t('ui.sectionDialog') }}</div>
      <div class="form-group">
        <label>{{ $t('ui.bgCard') }}</label>
        <div class="color-desc">{{ $t('ui.bgCardDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.bgCard" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.bgCard" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.navActive') }}</label>
        <div class="color-desc">{{ $t('ui.navActiveDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.accentBlue" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.accentBlue" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.inputBg') }}</label>
        <div class="color-desc">{{ $t('ui.inputBgDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.inputBg" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.inputBg" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.inputText') }}</label>
        <div class="color-desc">{{ $t('ui.inputTextDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.inputText" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.inputText" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.inputBorder') }}</label>
        <div class="color-desc">{{ $t('ui.inputBorderDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.inputBorder" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.inputBorder" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.inputFocusBorder') }}</label>
        <div class="color-desc">{{ $t('ui.inputFocusBorderDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.inputFocusBorder" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.inputFocusBorder" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('ui.btnNormal') }}</label>
        <div class="color-desc">{{ $t('ui.btnNormalDesc') }}</div>
        <div class="color-input-group">
          <input type="color" v-model="theme.btnNormal" @change="updateTheme" class="color-picker" />
          <input type="text" v-model="theme.btnNormal" @change="updateTheme" class="color-text-input" />
        </div>
      </div>
    </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUIStore } from '../../store/UI'
import type { ColorTheme } from '../../type'

const uiStore = useUIStore()
const { colorTheme, themePresets } = storeToRefs(uiStore)

const theme = ref<ColorTheme>({ ...colorTheme.value })
const selectedThemeName = ref('')
const newThemeName = ref('')
const importThemeJson = ref('')
const showDetailedParams = ref(false)

onMounted(() => {
  theme.value = { ...colorTheme.value }
  uiStore.initThemePresets()
})

watch(selectedThemeName, (newVal) => {
  if (newVal && themePresets.value.find(p => p.name === newVal)) {
    newThemeName.value = ''
  } else {
    newThemeName.value = newVal
  }
})

const updateTheme = () => {
  uiStore.updateColorTheme(theme.value)
}

const resetTheme = () => {
  uiStore.resetColorTheme()
  theme.value = { ...colorTheme.value }
}

const saveCurrentTheme = () => {
  const nameToSave = newThemeName.value.trim() || selectedThemeName.value.trim()
  if (!nameToSave) {
    alert('请输入主题名称')
    return
  }
  
  if (uiStore.saveThemePreset(nameToSave)) {
    selectedThemeName.value = nameToSave
    newThemeName.value = ''
    alert('主题保存成功！')
  }
}

const loadSelectedTheme = () => {
  if (selectedThemeName.value) {
    if (uiStore.loadThemePreset(selectedThemeName.value)) {
      theme.value = { ...colorTheme.value }
      alert('主题加载成功！')
    }
  }
}

const deleteSelectedTheme = () => {
  if (selectedThemeName.value) {
    if (confirm(`确定要删除主题 "${selectedThemeName.value}" 吗？`)) {
      // 检查删除的主题是否是当前应用的主题
      const deletedPreset = themePresets.value.find(p => p.name === selectedThemeName.value)
      const isCurrentTheme = deletedPreset && JSON.stringify(deletedPreset.theme) === JSON.stringify(colorTheme.value)
      
      uiStore.deleteThemePreset(selectedThemeName.value)
      selectedThemeName.value = ''
      newThemeName.value = ''
      
      // 如果删除的是当前应用的主题，恢复到默认主题
      if (isCurrentTheme) {
        uiStore.resetColorTheme()
        theme.value = { ...colorTheme.value }
      }
      
      alert('主题已删除')
    }
  }
}

const importThemeFromJson = () => {
  if (!importThemeJson.value.trim()) {
    alert('请粘贴主题 JSON 内容')
    return
  }
  
  try {
    const importedData = JSON.parse(importThemeJson.value.trim())
    const result = uiStore.importTheme(importedData)
    
    if (result.success) {
      theme.value = { ...colorTheme.value }
      
      // 如果导入的主题有 name 字段，自动选中该主题
      if (result.name && result.name.trim()) {
        const themeName = result.name.trim()
        // 检查主题是否已存在
        const existingPreset = themePresets.value.find(p => p.name === themeName)
        if (existingPreset) {
          // 如果已存在，选中它
          selectedThemeName.value = themeName
          newThemeName.value = ''
        } else {
          // 如果不存在，使用该名称并显示在输入框中
          selectedThemeName.value = ''
          newThemeName.value = themeName
        }
      } else {
        // 如果没有 name 字段，使用当前选中的主题名称
        if (selectedThemeName.value) {
          newThemeName.value = selectedThemeName.value
        }
      }
      
      importThemeJson.value = ''
      alert('主题导入成功！')
    } else {
      alert('主题格式不正确，请检查 JSON 内容')
    }
  } catch (e) {
    alert('JSON 格式错误：' + (e instanceof Error ? e.message : String(e)))
  }
}

const exportCurrentTheme = () => {
  // 获取当前主题名称
  const currentName = selectedThemeName.value || newThemeName.value || '未命名主题'
  
  // 导出主题，包含 name 字段
  const themeWithName = {
    name: currentName,
    ...theme.value
  }
  
  const themeJson = JSON.stringify(themeWithName, null, 2)
  importThemeJson.value = themeJson
  // 复制到剪贴板
  if (navigator.clipboard) {
    navigator.clipboard.writeText(themeJson).then(() => {
      alert('主题已复制到剪贴板！')
    }).catch(() => {
      alert('复制失败，请手动复制')
    })
  }
}
</script>

<style scoped>
.ui-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.section:last-of-type {
  border-bottom: none;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--accent-blue);
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

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-main);
  margin-bottom: 0;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--accent-blue);
}

.detail-checkbox {
  margin-right: 8px;
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
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  color: var(--input-text);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-family: monospace;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.color-text-input:focus {
  border-color: var(--input-focus-border);
}

.theme-reset-action {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.btn-reset {
  flex: 1;
  min-width: 80px;
  background-color: var(--btn-normal);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-reset:hover {
  opacity: 0.9;
}

/* 主题管理样式 */
.theme-manage-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.theme-select {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  color: var(--input-text);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  cursor: pointer;
}

.theme-select:focus {
  border-color: var(--input-focus-border);
}

.theme-name-input {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  color: var(--input-text);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.theme-name-input:focus {
  border-color: var(--input-focus-border);
}

.theme-name-input::placeholder {
  color: var(--text-sub);
}

.theme-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-save,
.btn-load,
.btn-delete {
  flex: 1;
  min-width: 80px;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}

.btn-save {
  background-color: var(--btn-primary);
  color: white;
}

.btn-load {
  background-color: var(--btn-normal);
  color: white;
}

.btn-delete {
  background-color: var(--btn-danger);
  color: white;
}

.btn-save:hover,
.btn-load:hover,
.btn-delete:hover {
  opacity: 0.9;
}

.theme-json-textarea {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  color: var(--input-text);
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'Courier New', monospace;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.theme-json-textarea:focus {
  border-color: var(--input-focus-border);
}

.theme-json-textarea::placeholder {
  color: var(--text-sub);
}

.theme-import-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.btn-import,
.btn-export {
  flex: 1;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}

.btn-import {
  background-color: var(--btn-primary);
  color: white;
}

.btn-export {
  background-color: var(--btn-normal);
  color: white;
}

.btn-import:hover,
.btn-export:hover {
  opacity: 0.9;
}
</style>
