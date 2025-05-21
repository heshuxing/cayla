<template>
  <section class="works">
    <div class="grid">
      <div
        v-for="(work, index) in visibleWorks"
        :key="index"
        class="work-item"
        @click="viewPreview(index)"
      >
        <div class="thumb">
          <img
            :src="work.thumb"
            loading="lazy"
            @error="fallbackImage(index)"
          />
        </div>
        <h3>{{ work.title }}</h3>
        <div class="meta">
          <span class="brand">深蓝设计</span>
        </div>
      </div>
    </div>

    <div ref="loadTrigger" class="observer-trigger"></div>
  </section>
</template>

<script>
import worksData from '../assets/works.json';

export default {
  name: 'Works',
  data() {
    return {
      works: worksData.map(item => ({ ...item })),
      visibleCount: 5,
      observer: null
    };
  },
  computed: {
    visibleWorks() {
      return this.works.slice(0, this.visibleCount);
    }
  },
  mounted() {
    this.createObserver();
    this.preloadFullImages();
  },
  methods: {
    viewPreview(index) {
      this.$router.push(`/preview/${index}`);
    },
    fallbackImage(index) {
      this.works[index].thumb = this.works[index].remote;
    },
    loadMore() {
      if (this.visibleCount < this.works.length) {
        this.visibleCount += 5;
        this.$nextTick(() => this.preloadFullImages());
      }
    },
    createObserver() {
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.loadMore();
        }
      }, {
        root: null,
        threshold: 1.0
      });
      this.observer.observe(this.$refs.loadTrigger);
    },
    preloadFullImages() {
      this.visibleWorks.forEach(work => {
        const img = new Image();
        img.src = work.remote;
      });
    }
  },
  beforeUnmount() {
    if (this.observer && this.$refs.loadTrigger) {
      this.observer.unobserve(this.$refs.loadTrigger);
    }
  }
};
</script>

<style>
.works {
  padding: 24px 0 32px;
}
@media (max-width: 768px) {
  .works {
    padding: 16px 0 24px;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
.work-item {
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.work-item:hover {
  transform: translateY(-4px);
}
.thumb {
  width: 100%;
  height: 140px;
  overflow: hidden;
  border-radius: 4px;
  background-color: #f3f3f3;
}
.thumb img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top;
  display: block;
}
h3 {
  font-size: 16px;
  margin: 12px 0 4px;
  text-align: center;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 13px;
  color: #888;
}
.logo {
  width: 32px;
  height: auto;
  margin-right: 6px;
}
.brand {
  flex: 1;
}
.time {
  white-space: nowrap;
}
.observer-trigger {
  height: 1px;
}
</style>