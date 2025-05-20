<template>
  <section class="works">
    <div class="grid">
      <div
        v-for="(work, index) in works"
        :key="index"
        class="work-item"
        @click="viewPreview(index)"
      >
        <div class="thumb">
          <img :src="work.fullsize" :alt="work.title" loading="lazy" />
        </div>
        <h3>{{ work.title }}</h3>
        <p>{{ work.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Works',
  data() {
    return {
      works: Array.from({ length: 20 }, (_, i) => ({
        title: `WP-${20 - i}`,
        description: '这是作品的简要描述。',
        fullsize: `/images/works/full-${20 - i}.webp`,
      })),
    };
  },
  methods: {
    viewPreview(index) {
      this.$router.push(`/preview/${index}`);
    },
  },
};
</script>

<style>
.works {
  padding: 40px 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
.work-item {
  cursor: pointer;
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
}
.work-item:hover {
  transform: translateY(-4px);
}
.thumb {
  width: 100%;
  height: 140px;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
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
}
p {
  font-size: 13px;
  color: #666;
  margin: 0;
}
</style>
