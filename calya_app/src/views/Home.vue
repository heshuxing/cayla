<template>
  <div class="container">
    <Header />
    <Works />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Works from '../components/Works.vue';

export default {
  components: {
    Header,
    Works,
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
