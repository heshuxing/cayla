<template>
  <div class="preview">
    <button class="back" @click="$router.back()">← 返回</button>
    <div class="swiper">
      <img
        ref="zoomImg"
        :src="currentImage"
        class="full-image"
        alt="作品大图"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script>
import mediumZoom from 'medium-zoom';

export default {
  name: 'Preview',
  data() {
    return {
      works: Array.from({ length: 20 }, (_, i) => ({
        fullsize: `/images/works/full-${20 - i}.webp`,
      })),
      index: 0,
      startX: 0,
      endX: 0,
      zoom: null,
    };
  },
  computed: {
    currentImage() {
      return this.works[this.index]?.fullsize || '';
    },
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
    attachZoom() {
      if (this.zoom) this.zoom.detach();
      this.zoom = mediumZoom(this.$refs.zoomImg, {
        background: '#000',
        container: '#zoom-container',
        margin: 24,
        scrollOffset: 0,
      });
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
  },
  watch: {
    currentImage() {
      this.$nextTick(() => {
        this.attachZoom();
      });
    },
  },
};
</script>

<style>
.preview {
  padding: 60px 20px 40px;
  position: relative;
  text-align: center;
}
.full-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  cursor: zoom-in;
  transition: all 0.3s ease;
}
.back {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #ffffffcc;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  z-index: 10;
}
</style>
