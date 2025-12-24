<template>
  <div class="form-panel">
    <div class="form-group">
      <label>{{ $t('ai.provider') }}</label>
      <div class="select-wrapper">
        <select v-model="formData.provider">
          <option value="alibaba">{{ $t('ai.alibaba') }}</option>
          <option value="openai">{{ $t('ai.openai') }}</option>
          <option value="anthropic">{{ $t('ai.anthropic') }}</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>{{ $t('ai.modelName') }}</label>
      <div class="select-wrapper">
        <select v-model="formData.modelName">
          <option value="qwen-vl-flash">{{ $t('ai.qwenVlFlash') }}</option>
          <option value="qwen-vl-max">{{ $t('ai.qwenVlMax') }}</option>
          <option value="gpt-4o">{{ $t('ai.gpt4o') }}</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>{{ $t('ai.apiKey') }}</label>
      <input 
        type="password" 
        v-model="formData.apiKey" 
        :placeholder="$t('ai.apiKeyPlaceholder')"
        class="dark-input"
      />
    </div>

    <!-- 底部按钮 -->
    <div class="footer-actions">
      <button class="btn-confirm" @click="handleConfirm">{{ $t('common.confirm') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AIFormData } from '../../type'

const emit = defineEmits(['confirm'])

const formData = ref<AIFormData>({
  provider: 'alibaba',
  modelName: 'qwen-vl-flash',
  apiKey: ''
})

const handleConfirm = () => {
  emit('confirm', formData.value)
}

defineExpose({
  formData
})
</script>

<style scoped>
.form-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 12px;
  color: var(--text-sub);
  margin-bottom: 8px;
}

/* 自定义 Input 和 Select 样式 */
.dark-input, select {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  color: var(--input-text);
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.dark-input:focus, select:focus {
  border-color: var(--input-focus-border);
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '▼';
  font-size: 10px;
  color: var(--text-sub);
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

/* 底部按钮 */
.footer-actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.btn-confirm {
  background-color: var(--btn-normal);
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-confirm:hover {
  opacity: 0.9;
}
</style>

