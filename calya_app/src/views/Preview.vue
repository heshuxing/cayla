<template>
  <div class="preview">
    <div class="navbar">
      <div class="nav-back" @click="$router.back()">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="nav-title">{{ works[index]?.title || '预览' }}</div>
    </div>
    <div class="preview-container">
      <img
        :src="works[index].remote"
        @error="fallbackImage"
        :class="['full-image', { zoomed: isZoomed, loaded: imageLoaded }]"
        alt="作品大图"
        loading="lazy"
        @click="toggleZoom"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @load="onImageLoad"
      />
    </div>
  </div>
</template>

<script>
import worksData from '../assets/works.json';

export default {
  name: 'Preview',
  data() {
    return {
      index: 0,
      works: worksData.map(item => ({ ...item })),
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0,
      isZoomed: false,
      imageLoaded: false
    };
  },
  mounted() {
    const id = parseInt(this.$route.params.id);
    if (!isNaN(id) && id >= 0 && id < this.works.length) {
      this.index = id;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  },
  methods: {
    fallbackImage() {
      this.works[this.index].remote = this.works[this.index].local;
    },
    toggleZoom() {
      this.isZoomed = !this.isZoomed;
    },
    onTouchStart(e) {
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
    },
    onTouchEnd(e) {
      this.endX = e.changedTouches[0].clientX;
      this.endY = e.changedTouches[0].clientY;

      const deltaX = this.endX - this.startX;
      const deltaY = this.endY - this.startY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && this.index > 0) this.index--;
        else if (deltaX < 0 && this.index < this.works.length - 1) this.index++;
        this.imageLoaded = false;
      }
    },
    onImageLoad() {
      this.imageLoaded = true;
    }
  }
};
</script>

<style>
.preview {
  padding: 0 0 40px;
  position: relative;
  text-align: center;
  margin-top: 48px;
}

.preview-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.full-image {
  width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, opacity 0.5s ease;
  cursor: zoom-in;
  opacity: 0;
}

.full-image.loaded {
  opacity: 1;
}

.full-image.zoomed {
  transform: scale(1.5);
  cursor: zoom-out;
  z-index: 2;
  position: relative;
}

/* 顶部吸顶栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: #1677ff;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 12px;
  z-index: 1001;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-back {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.nav-back .icon {
  width: 18px;
  height: 18px;
}

.nav-title {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  margin-right: 32px;
}
</style>