<template>
  <footer class="footer">
    <p>&copy; {{ currentYear }} 资深设计师作品集</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style>
.footer {
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
