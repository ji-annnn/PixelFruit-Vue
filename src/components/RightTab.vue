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
              <span>红色色调</span>
              <span class="value-text">{{ config.redHue }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.redHue">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>绿色色调</span>
              <span class="value-text">{{ config.greenHue }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.greenHue">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>蓝色色调</span>
              <span class="value-text">{{ config.blueHue }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.blueHue">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>高光</span>
              <span class="value-text">{{ config.highlights }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.highlights">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>阴影</span>
              <span class="value-text">{{ config.shadows }}</span>
            </div>
            <input type="range" min="-100" max="100" v-model.number="config.shadows">
          </div>
  
          <div class="slider-row">
            <div class="slider-header">
              <span>白色</span>
              <span class="value-text">{{ config.whites }}</span>
            </div>
            <!-- 注意：图片中白色默认值似乎是 100 -->
            <input type="range" min="0" max="200" v-model.number="config.whites">
          </div>
  
        </div>
  
        <!-- 场景 B/C: 其他 Tab 的占位 -->
        <div v-else class="empty-placeholder">
          {{ getTabLabel(activeTab) }} 功能开发中...
        </div>
  
      </div>
  
      <!-- 3. 底部信息展示区 -->
      <div class="detail-card">
        <div class="card-title">图片细节 - 跟随模式</div>
        <div class="detail-content">
          <!-- 左侧预览图 -->
          <div class="preview-box">
            <img 
              v-if="imageInfo.previewUrl" 
              :src="imageInfo.previewUrl" 
              class="preview-img"
            />
            <span v-else class="no-img-text">无图片</span>
          </div>
          
          <!-- 右侧信息列表 -->
          <div class="info-list">
            <div class="info-item">
              <span class="label">位置:</span>
              <span class="value">{{ imageInfo.position || '请上传图片' }}</span>
            </div>
            <div class="info-item">
              <span class="label">RGB:</span>
              <span class="value">{{ imageInfo.rgb || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">亮度:</span>
              <span class="value">{{ imageInfo.brightness || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">色相:</span>
              <span class="value">{{ imageInfo.hue || '-' }}</span>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  
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
  
  const tabs = [
    { key: 'color', label: '颜色调整' },
    { key: 'detail', label: '细节处理' },
    { key: 'replace', label: '颜色替换' }
  ];
  
  const switchTab = (key) => {
    activeTab.value = key;
  };
  
  const getTabLabel = (key) => tabs.find(t => t.key === key)?.label;
  
  const indicatorStyle = computed(() => {
    const index = tabs.findIndex(t => t.key === activeTab.value);
    return {
      transform: `translateX(${index * 100}%)`
    };
  });
  </script>
  
  <style scoped>
  /* 容器基础 */
  .panel-container {
    width: 320px;
    background-color: #1e1e1e; /* 之前定义的深色背景 */
    padding: 16px;
    font-family: 'Segoe UI', sans-serif;
    color: #e0e0e0;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  /* 1. Tabs 样式 */
  .tabs-header {
    display: flex;
    position: relative;
    border-bottom: 1px solid #333;
    margin-bottom: 20px;
  }
  .tab-item {
    flex: 1;
    text-align: center;
    padding-bottom: 12px;
    cursor: pointer;
    font-size: 14px;
    color: #888;
    transition: color 0.3s;
    /* 处理文字换行，图片中是两行文字 */
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre-wrap; 
    line-height: 1.2;
  }
  .tab-item.active {
    color: #fff;
    font-weight: 500;
  }
  .tab-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 33.33%; /* 3个tab平分 */
    height: 2px;
    background-color: #3a86ff;
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
    color: #ccc;
  }
  .value-text {
    font-family: monospace;
    color: #fff;
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
    background: #3a86ff;
    cursor: pointer;
    margin-top: -5px; 
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: #333;
    border-radius: 2px;
  }
  
  /* 3. 底部详情卡片 */
  .detail-card {
    margin-top: 24px;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.02);
  }
  .card-title {
    font-size: 14px;
    margin-bottom: 12px;
    border-bottom: 1px solid #333;
    padding-bottom: 8px;
    color: #e0e0e0;
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
    color: #999;
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
  .info-item .label { color: #888; }
  .info-item .value { color: #ccc; font-family: monospace; }
  
  .empty-placeholder {
    text-align: center;
    color: #666;
    padding-top: 40px;
  }
  </style>