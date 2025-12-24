<template>
    <div class="panel-container">
      
      <!-- 模块 1: 文件上传 -->
      <div class="card">
        <div class="card-header">
          <span>{{ $t('leftTab.fileUpload') }}</span>
          <button class="icon-btn" @click="openDialog">⚙️</button>
        </div>
        <div class="upload-area">
          <input 
            type="file" 
            ref="fileInputRef" 
            class="hidden-input" 
            @change="handleFileChange" 
            accept=".raw,.dng,.cr2,.nef,.arw" 
          />
          <button class="btn-primary-ghost" @click="triggerFileUpload">
            {{ $t('leftTab.selectRawFile') }}
          </button>
          <div class="file-status">
            {{ config.fileName || $t('common.noFileSelected') }}
          </div>
        </div>
      </div>
  
      <!-- 模块 2: 基本设置 -->
      <div class="card mt-2">
        <div class="card-header">
          <span>{{ $t('leftTab.basicSettings') }}</span>
        </div>
  
        <!-- 白平衡复选框 -->
        <div class="checkbox-group">
          <label class="checkbox-item">
            <input 
              type="checkbox" 
              v-model="config.autoWhiteBalance"
              @change="handleWbChange('auto')"
            >
            <span>{{ $t('leftTab.autoWhiteBalance') }}</span>
          </label>
          <label class="checkbox-item">
            <input 
              type="checkbox" 
              v-model="config.cameraWhiteBalance"
              @change="handleWbChange('camera')"
            >
            <span>{{ $t('leftTab.cameraWhiteBalance') }}</span>
          </label>
        </div>
  
        <button class="btn-primary full-width mt-2">{{ $t('leftTab.viewLargeImage') }}</button>
  
        <!-- 滑块控制区域 -->
        <div class="sliders-area">
          <!-- 亮度 -->
          <div class="slider-item">
            <div class="slider-label">{{ $t('leftTab.brightness') }}</div>
            <div class="slider-control">
              <input 
                type="range" 
                min="0" max="2" step="0.1" 
                v-model.number="config.brightness"
              >
              <span class="slider-value">{{ config.brightness.toFixed(1) }}</span>
            </div>
          </div>
  
          <!-- 曝光补偿 -->
          <div class="slider-item">
            <div class="slider-label">{{ $t('leftTab.exposure') }}</div>
            <div class="slider-control">
              <input 
                type="range" 
                min="-5" max="5" step="0.1" 
                v-model.number="config.exposure"
              >
              <span class="slider-value">{{ config.exposure.toFixed(1) }}</span>
            </div>
          </div>
  
          <!-- 饱和度 -->
          <div class="slider-item">
            <div class="slider-label">{{ $t('leftTab.saturation') }}</div>
            <div class="slider-control">
              <input 
                type="range" 
                min="0" max="200" step="1" 
                v-model.number="config.saturation"
              >
              <span class="slider-value">{{ config.saturation }}</span>
            </div>
          </div>
  
          <!-- 对比度 -->
          <div class="slider-item">
            <div class="slider-label">{{ $t('leftTab.contrast') }}</div>
            <div class="slider-control">
              <input 
                type="range" 
                min="-100" max="100" step="1" 
                v-model.number="config.contrast"
              >
              <span class="slider-value">{{ config.contrast }}</span>
            </div>
          </div>
        </div>
  
        <!-- 预设滤镜 -->
        <div class="control-group">
          <div class="label">{{ $t('leftTab.presetFilter') }}</div>
          <div class="flex-row">
            <select v-model="config.filter" class="dark-select">
              <option value="none">{{ $t('leftTab.noFilter') }}</option>
              <option value="vivid">{{ $t('leftTab.vivid') }}</option>
              <option value="soft">{{ $t('leftTab.soft') }}</option>
              <option value="bw">{{ $t('leftTab.bw') }}</option>
            </select>
            <button class="btn-primary small">{{ $t('leftTab.saveCurrentConfig') }}</button>
          </div>
        </div>
  
        <!-- LUT -->
        <div class="control-group">
          <div class="label">{{ $t('leftTab.lutColorTable') }}</div>
          <div class="flex-row">
            <button class="btn-dark full-width">{{ $t('leftTab.importLUT') }}</button>
            <button class="btn-dark">{{ $t('common.clear') }}</button>
          </div>
        </div>
  
        <!-- 底部操作按钮 -->
        <div class="action-footer">
          <button class="btn-danger">{{ $t('common.reset') }}</button>
          <button class="btn-primary">{{ $t('leftTab.exportPNG') }}</button>
          <button class="btn-primary">{{ $t('leftTab.exportJPEG') }}</button>
        </div>
  
        <Dialog 
          :visible="dialog.visible"
          v-model="dialog.formData"
          v-model:currentTab="dialog.currentTab"
          @update:visible="dialog.visible = $event"
          @confirm="handleDialogConfirm"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { storeToRefs } from 'pinia';
  import { useUIStore } from '../store/UI';
  import Dialog from './Dialog.vue';

  const { t } = useI18n();
  
  const uiStore = useUIStore();
  const { leftConfig, dialog } = storeToRefs(uiStore);
  
  const fileInputRef = ref(null);
  const config = leftConfig;
  
  const triggerFileUpload = () => {
    fileInputRef.value?.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      config.value.fileName = file.name;
    }
  };
  
  const handleWbChange = (type) => {
    if (type === 'auto' && config.value.autoWhiteBalance) {
      config.value.cameraWhiteBalance = false;
    } else if (type === 'camera' && config.value.cameraWhiteBalance) {
      config.value.autoWhiteBalance = false;
    }
  };
  
  const openDialog = () => {
    dialog.value.visible = true;
  };
  
  const handleDialogConfirm = (formData) => {
    // 可以在这里处理确认后的逻辑
    console.log('Dialog confirmed:', formData);
  };
  </script>
  
  <style scoped>
  .panel-container {
    width: 320px;
    background-color: var(--bg-dark);
    padding: 10px;
    font-family: 'Segoe UI', sans-serif;
    color: var(--text-main);
    font-size: 14px;
    border-radius: 4px;
  }
  
  .card {
    background-color: transparent;
    padding: 10px 0;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 8px;
    margin-bottom: 12px;
  }
  .mt-2 { margin-top: 20px; }
  
  /* 上传区域 */
  .upload-area {
    border: 1px dashed #555;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    background-color: rgba(255,255,255,0.02);
  }
  .hidden-input { display: none; }
  .file-status {
    margin-top: 8px;
    color: var(--text-sub);
    font-size: 12px;
  }
  
  /* 按钮通用样式 */
  button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 13px;
    transition: opacity 0.2s;
  }
  button:hover { opacity: 0.9; }
  
  .icon-btn { background: none; color: var(--text-sub); padding: 0; font-size: 18px; }
  .btn-primary-ghost {
    background-color: var(--btn-ghost);
    color: var(--text-main);
    border: 1px solid var(--border-color);
    padding: 8px 16px;
  }
  .btn-primary {
    background-color: var(--btn-primary);
    color: white;
  }
  .btn-danger {
    background-color: var(--btn-danger);
    color: white;
  }
  .btn-dark {
    background-color: var(--btn-dark);
    color: var(--text-main);
  }
  .full-width { width: 100%; }
  .small { font-size: 12px; padding: 4px 8px; }
  
  /* Checkbox */
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }
  .checkbox-item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .checkbox-item input {
    margin-right: 8px;
    accent-color: var(--accent-blue);
  }
  
  /* 滑块样式 */
  .sliders-area {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .slider-item { display: block; }
  .slider-label { margin-bottom: 4px; color: var(--text-sub); }
  .slider-control {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .slider-value {
    width: 30px;
    text-align: right;
    font-family: monospace;
  }
  
  /* 自定义 Range Input 样式 */
  input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: transparent;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: var(--accent-blue);
    cursor: pointer;
    margin-top: -5px; 
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: var(--border-color);
    border-radius: 2px;
  }
  
  /* 下拉框和底部区域 */
  .control-group { margin-top: 15px; }
  .control-group .label { margin-bottom: 6px; color: var(--text-sub); }
  .flex-row { display: flex; gap: 8px; }
  .dark-select {
    flex: 1;
    background-color: var(--input-bg);
    color: var(--input-text);
    border: 1px solid var(--input-border);
    padding: 5px;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;
  }
  
  .dark-select:focus {
    border-color: var(--input-focus-border);
  }
  
  .action-footer {
    display: flex;
    gap: 8px;
    margin-top: 20px;
  }
  .action-footer button {
    flex: 1;
  }
  </style>