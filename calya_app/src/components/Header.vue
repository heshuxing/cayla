<template>
  <section class="profile-wrapper">
    <div class="profile-card">
      <div class="avatar-block">
        <img src="/images/avatar.jpg" class="avatar" />
        <h1 class="name">深蓝设计</h1>
        <p class="location">浙江省 杭州市</p>
        <div class="stats">
          <div>排名：<span>2702</span></div>
          <div>人气：<span>1731</span></div>
          <div>粉丝：<span>0</span></div>
        </div>
      </div>
      <div class="banner">
        <img src="/images/backgroup.jpg" class="banner-img" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.profile-wrapper {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 40px;
}
.profile-card {
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
  border-bottom: 1px solid #eee;
  justify-content: center;
  align-items: center;
  gap: 40px;
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
.nav-tabs {
  display: flex;
  gap: 32px;
  padding: 16px 24px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #666;
}
.nav-tabs span {
  cursor: pointer;
}
.nav-tabs .active {
  color: #1677ff;
  font-weight: bold;
}
</style>
