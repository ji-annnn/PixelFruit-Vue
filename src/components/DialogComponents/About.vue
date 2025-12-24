<template>
  <div class="about-panel">
    <div class="about-content">
      <div class="about-header">
        <h2 class="about-title">{{ $t('about.title') }}</h2>
        <p class="about-version">{{ $t('about.version') }}</p>
      </div>
      
      <div class="about-description">
        <p>{{ $t('about.description1') }}</p>
        <p>{{ $t('about.description2') }}</p>
      </div>
      
      <div class="about-features">
        <h3 class="features-title">{{ $t('about.featuresTitle') }}</h3>
        <ul class="features-list">
          <li>{{ $t('about.feature1') }}</li>
          <li>{{ $t('about.feature2') }}</li>
          <li>{{ $t('about.feature3') }}</li>
          <li>{{ $t('about.feature4') }}</li>
          <li>{{ $t('about.feature5') }}</li>
          <li>{{ $t('about.feature6') }}</li>
          <li>{{ $t('about.feature7') }}</li>
        </ul>
        <div class="github-link-wrapper">
          <a 
            href="https://github.com/ji-annnn/PixelFruit-Vue" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="github-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="github-icon">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.87 10.94c.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.7-1.3-1.7-1.06-.73.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.2-3.08-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.91-.39c.99 0 1.99.13 2.92.39 2.21-1.49 3.19-1.18 3.19-1.18.63 1.6.23 2.78.11 3.07.75.8 1.19 1.82 1.19 3.08 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18 0 1.58-.01 2.86-.01 3.25 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
            </svg>
            <span>{{ $t('about.github') }}</span>
          </a>
        </div>
      </div>
      
      <div class="about-footer">
        <p>{{ $t('about.copyright') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About component - no logic needed
</script>

<style scoped>
.about-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.about-panel::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.about-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.about-header {
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--border-color);
}

.about-title {
  margin: 0 0 10px 0;
  font-size: 32px;
  font-weight: 600;
  color: var(--text-main);
}

.about-version {
  margin: 0;
  font-size: 14px;
  color: var(--text-sub);
}

.about-description {
  margin-bottom: 32px;
  line-height: 1.8;
}

.about-description p {
  margin: 10px 0;
  color: var(--text-main);
  font-size: 14px;
}

.about-features {
  margin-bottom: 32px;
}

.features-title {
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-main);
}

.features-list {
  margin: 0;
  padding-left: 20px;
  line-height: 1.8;
  color: var(--text-main);
  font-size: 14px;
}

.features-list li {
  margin: 8px 0;
}

.github-link-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-main);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.github-link:hover {
  color: var(--accent-blue);
}

.github-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.about-footer {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.about-footer p {
  margin: 0;
  font-size: 14px;
  color: var(--text-sub);
}
</style>
