<template>
  <div class="preview">
    <div class="back" @click="$router.back()">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M15 18l-6-6 6-6" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      返回
    </div>
    <div class="preview-container">
      <img
        ref="zoomImg"
        :src="works[index].remote"
        @error="fallbackImage"
        class="full-image"
        alt="作品大图"
        loading="lazy"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      />
    </div>
  </div>
</template>



<script>
import mediumZoom from 'medium-zoom';
import worksData from '../assets/works.json';

export default {
  name: 'Preview',
  data() {
    return {
      index: 0,
      works: worksData.map(item => ({ ...item })),
      startX: 0,
      endX: 0,
      zoom: null,
    };
  },
  mounted() {
    const id = parseInt(this.$route.params.id);
    if (!isNaN(id) && id >= 0 && id < this.works.length) {
      this.index = id;
    }
    this.$nextTick(() => {
      this.attachZoom();
    });
  },
  methods: {
    fallbackImage() {
      this.works[this.index].remote = this.works[this.index].local;
    },
    onTouchStart(e) {
      this.startX = e.changedTouches[0].clientX;
    },
    onTouchEnd(e) {
      this.endX = e.changedTouches[0].clientX;
      const delta = this.endX - this.startX;
      if (Math.abs(delta) < 50) return;
      if (delta > 50 && this.index > 0) this.index--;
      else if (delta < -50 && this.index < this.works.length - 1) this.index++;
    },
    attachZoom() {
      if (this.zoom) this.zoom.detach();
      this.zoom = mediumZoom(this.$refs.zoomImg, {
        background: '#000',
        container: '#zoom-container',
        margin: 24,
        scrollOffset: 0,
      });
    },
  },
  watch: {
    index() {
      this.$nextTick(() => {
        this.attachZoom();
      });
    },
  },
};
</script>

<style>
.preview {
  padding: 60px 0 40px;
  position: relative;
  text-align: center;
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
  cursor: zoom-in;
  transition: all 0.3s ease;
}

.back {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1000;
  background: #ffffffee;
  color: #333;
  border-radius: 20px;
  padding: 6px 12px 6px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  user-select: none;
}

.back .icon {
  width: 16px;
  height: 16px;
}
</style>
