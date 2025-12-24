<template>
  <!-- 遮罩层 transition -->
  <Transition name="fade">
    <div v-if="visible" class="dialog-overlay" @click="handleOverlayClick">
      <!-- 弹窗主体 -->
      <div class="dialog-container" @click.stop>
        <!-- 顶部标题栏 -->
        <div class="dialog-header">
          <span class="title">{{ $t('dialog.title') }}</span>
          <button class="close-btn" @click="close">×</button>
        </div>

        <div class="dialog-body">
          <!-- 左侧导航栏 -->
          <div class="sidebar">
            <div
              v-for="item in dialogData"
              :key="item.id"
              class="nav-item"
              :class="{ active: activeTab === item.key }"
              @click="activeTab = item.key"
            >
              {{ item.name }}
            </div>
          </div>

          <!-- 右侧内容区 -->
          <div class="content-area">
            <!-- 动态组件 -->
            <component :is="currentComponent" @confirm="handleConfirm" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import AI from "./DialogComponents/AI.vue";
import About from "./DialogComponents/About.vue";
import type { DialogItem } from "../type";
import UI from "./DialogComponents/UI.vue";
import I18N from "./DialogComponents/I18N.vue";

const { t } = useI18n();

const props = defineProps({
  // 控制弹窗显示
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible"]);

// Dialog 数据配置
const dialogData = computed<DialogItem[]>(() => [
  { id: 1, name: t('dialog.aiSettings'), component: AI, key: "ai" },
  { id: 2, name: t('dialog.about'), component: About, key: "about" },
  { id: 3, name: t('dialog.ui'), component: UI, key: "ui" },
  { id: 4, name: t('dialog.i18n'), component: I18N, key: "i18n" },
]);

// 内部状态管理
const activeTab = ref("ai");

// 当前显示的组件
const currentComponent = computed(() => {
  return dialogData.value.find((item) => item.key === activeTab.value)
    ?.component;
});

// 关闭弹窗
const close = () => {
  emit("update:visible", false);
};

// 点击遮罩关闭
const handleOverlayClick = () => {
  close();
};

// 点击确定
const handleConfirm = () => {
  close();
};
</script>

<style scoped>
/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 遮罩层 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 弹窗容器 */
.dialog-container {
  width: 550px;
  height: 400px; /* 固定高度或者使用 min-height */
  background-color: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  color: var(--text-main);
  font-family: "Segoe UI", sans-serif;
  border: 1px solid var(--border-color);
}

/* 头部 */
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}
.title {
  font-size: 16px;
  font-weight: 500;
}
.close-btn {
  background: none;
  border: none;
  color: var(--text-sub);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.close-btn:hover {
  color: var(--text-main);
}

/* 主体布局 */
.dialog-body {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* 左侧侧边栏 */
.sidebar {
  width: 120px;
  background-color: var(--bg-dark);
  padding: 20px 0;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.nav-item {
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  color: var(--text-sub);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.nav-item:hover {
  color: var(--text-main);
}
.nav-item.active {
  color: var(--accent-blue);
  background-color: rgba(91, 137, 247, 0.1);
}
.nav-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 3px;
  background-color: var(--accent-blue);
}

/* 右侧内容 */
.content-area {
  flex: 1;
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--bg-card);
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
}
</style>
