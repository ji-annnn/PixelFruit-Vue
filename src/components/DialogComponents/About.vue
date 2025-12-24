<template>
  <div class="about-panel">
    <p>{{ $t('about.version') }}</p>
    <p>{{ $t('about.description') }}</p>
  </div>
</template>

<script setup lang="ts">



</script>

<style scoped>
  .about-panel {
  color: var(--text-sub);
  font-size: 14px;
  text-align: center;
  margin-top: 40px;
}
</style>

