<template>
  <div class="form-panel">
    <div class="form-group">
      <label>AI 模型厂商</label>
      <div class="select-wrapper">
        <select v-model="formData.provider">
          <option value="alibaba">阿里巴巴</option>
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>模型名称</label>
      <div class="select-wrapper">
        <select v-model="formData.modelName">
          <option value="qwen-vl-flash">通义千问3-VL-Flash</option>
          <option value="qwen-vl-max">通义千问-VL-Max</option>
          <option value="gpt-4o">GPT-4o</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>API Key</label>
      <input 
        type="password" 
        v-model="formData.apiKey" 
        placeholder="请输入API Key"
        class="dark-input"
      />
    </div>

    <!-- 底部按钮 -->
    <div class="footer-actions">
      <button class="btn-confirm" @click="handleConfirm">确定</button>
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
  color: #aaa;
  margin-bottom: 8px;
}

/* 自定义 Input 和 Select 样式 */
.dark-input, select {
  width: 100%;
  background-color: #383838;
  border: 1px solid #4a4a4a;
  color: #fff;
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.dark-input:focus, select:focus {
  border-color: #5b89f7;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '▼';
  font-size: 10px;
  color: #888;
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
  background-color: #5b89f7;
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

