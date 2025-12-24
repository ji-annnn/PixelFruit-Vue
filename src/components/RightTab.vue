<template>
    <div class="panel-container">
      
      <!-- 1. 顶部 Tab 切换栏 -->
      <div class="tabs-header">
        <div 
          v-for="tab in tabs" 
          :key="tab.key"
          class="tab-item"
          :class="{ active: activeTab === tab.key }"
          @click="switchTab(tab.key)"
        >
          {{ tab.label }}
        </div>
        <!-- 动态下划线 -->
        <div class="tab-indicator" :style="indicatorStyle"></div>
      </div>
  
      <!-- 2. 中间内容区：根据 Tab 显示不同内容 -->
      <div class="tab-content">
        
        <!-- 场景 A: 颜色调整 (图片展示的内容) -->
        <div v-if="activeTab === 'color'" class="sliders-group">
          
          <div class="slider-row">
            <div class="slider-header">
              <span>{{ $t('rightTab.redHue') }}</span>
              <span class="value-text">{{ config.redHue }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.redHue">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>{{ $t('rightTab.greenHue') }}</span>
              <span class="value-text">{{ config.greenHue }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.greenHue">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>{{ $t('rightTab.blueHue') }}</span>
              <span class="value-text">{{ config.blueHue }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.blueHue">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>{{ $t('rightTab.highlights') }}</span>
              <span class="value-text">{{ config.highlights }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.highlights">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>{{ $t('rightTab.shadows') }}</span>
              <span class="value-text">{{ config.shadows }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.shadows">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>{{ $t('rightTab.whites') }}</span>
              <span class="value-text">{{ config.whites }}</span>
            </div>
            <!-- 注意：图片中白色默认值似乎是 100 -->
            <input type="range" min="0" max="200" v-model.number="config.whites">
          </div>
  
        </div>
  
        <!-- 场景 B/C: 其他 Tab 的占位 -->
        <div v-else class="empty-placeholder">
          {{ getTabLabel(activeTab) }} {{ $t('rightTab.featureDeveloping') }}
        </div>
  
      </div>
  
      <!-- 3. 底部信息展示区 -->
      <div class="detail-card">
        <div class="card-title">{{ $t('rightTab.imageDetail') }}</div>
        <div class="detail-content">
          <!-- 左侧预览图 -->
          <div class="preview-box">
            <img 
              v-if="imageInfo.previewUrl" 
              :src="imageInfo.previewUrl" 
              class="preview-img"
            />
            <span v-else class="no-img-text">{{ $t('common.noImage') }}</span>
          </div>
          
          <!-- 右侧信息列表 -->
          <div class="info-list">
            <div class="info-item">
              <span class="label">{{ $t('rightTab.position') }}</span>
              <span class="value">{{ imageInfo.position || $t('common.uploadImage') }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('rightTab.rgb') }}</span>
              <span class="value">{{ imageInfo.rgb || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('rightTab.brightness') }}</span>
              <span class="value">{{ imageInfo.brightness || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('rightTab.hue') }}</span>
              <span class="value">{{ imageInfo.hue || '-' }}</span>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  
  const activeTab = ref('color');
  const config = ref({
    redHue: 0,
    greenHue: 0,
    blueHue: 0,
    highlights: 0,
    shadows: 0,
    whites: 100
  });
  const imageInfo = ref({
    previewUrl: '',
    position: '',
    rgb: '',
    brightness: '',
    hue: ''
  });
  
  const tabs = computed(() => [
    { key: 'color', label: t('rightTab.colorAdjust') },
    { key: 'detail', label: t('rightTab.detailProcess') },
    { key: 'replace', label: t('rightTab.colorReplace') }
  ]);
  
  const switchTab = (key) => {
    activeTab.value = key;
  };
  
  const getTabLabel = (key) => tabs.value.find(t => t.key === key)?.label;
  
  const indicatorStyle = computed(() => {
    const index = tabs.value.findIndex(t => t.key === activeTab.value);
    return {
      transform: `translateX(${index * 100}%)`
    };
  });
  </script>
  
  <style scoped>
  /* 容器基础 */
  .panel-container {
    width: 320px;
    background-color: var(--bg-dark);
    padding: 16px;
    font-family: 'Segoe UI', sans-serif;
    color: var(--text-main);
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  /* 1. Tabs 样式 */
  .tabs-header {
    display: flex;
    position: relative;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 20px;
  }
  .tab-item {
    flex: 1;
    text-align: center;
    padding-bottom: 12px;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-sub);
    transition: color 0.3s;
    /* 处理文字换行，图片中是两行文字 */
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre-wrap; 
    line-height: 1.2;
  }
  .tab-item.active {
    color: var(--text-main);
    font-weight: 500;
  }
  .tab-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 33.33%; /* 3个tab平分 */
    height: 2px;
    background-color: var(--accent-blue);
    transition: transform 0.3s ease;
  }
  
  /* 2. 滑块区域样式 */
  .tab-content {
    min-height: 200px; /* 保持高度稳定 */
  }
  .sliders-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .slider-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .slider-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--text-sub);
  }
  .value-text {
    font-family: monospace;
    color: var(--text-main);
  }
  
  /* 复用之前的滑块 CSS */
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
  
  /* 3. 底部详情卡片 */
  .detail-card {
    margin-top: 24px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.02);
  }
  .card-title {
    font-size: 14px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 8px;
    color: var(--text-main);
  }
  .detail-content {
    display: flex;
    gap: 12px;
  }
  .preview-box {
    width: 80px;
    height: 80px;
    background-color: #f5f5f5;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .no-img-text {
    color: var(--text-sub);
    font-size: 12px;
  }
  .preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .info-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
  }
  .info-item {
    display: flex;
    justify-content: space-between;
  }
  .info-item .label { color: var(--text-sub); }
  .info-item .value { color: var(--text-sub); font-family: monospace; }
  
  .empty-placeholder {
    text-align: center;
    color: var(--text-sub);
    padding-top: 40px;
  }
  </style>