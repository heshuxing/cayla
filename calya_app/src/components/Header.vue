<template>
  <section class="profile-wrapper">
    <div class="profile-card">
      <div class="avatar-block">
        <img src="/images/avatar.jpg" class="avatar" />
        <h1 class="name">深蓝设计</h1>
        <p class="location">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#888"/>
          </svg>
          浙江省 杭州市
        </p>
        <div class="stats">
          <div>排名：<span>2702</span></div>
          <div>人气：<span>1731</span></div>
          <div>粉丝：<span>1314</span></div>
        </div>
      </div>
      <div class="banner" v-if="!isMobile">
        <img src="/images/backgroup.jpg" class="banner-img" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768;
  },
};
</script>

<style>
.profile-wrapper {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
}
.profile-card {
  display: flex;
  flex-wrap: wrap;
  padding: 24px 16px;
  border-bottom: 1px solid #eee;
  justify-content: center;
  align-items: center;
  gap: 32px;
}
@media (max-width: 768px) {
  .profile-card {
    padding: 16px 12px;
    gap: 24px;
  }
}
.avatar-block {
  flex: 1;
  min-width: 280px;
  text-align: center;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 8px;
  object-fit: cover;
}
.name {
  font-size: 20px;
  margin: 12px 0 6px;
}
.location {
  color: #888;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.location .icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.stats {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 14px;
}
.stats span {
  font-weight: bold;
}
.actions {
  margin-top: 16px;
}
.actions button {
  margin: 0 6px;
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.follow {
  background-color: #1677ff;
  color: white;
}
.message {
  background-color: #f5f5f5;
}
.banner {
  flex: 2;
  min-width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
