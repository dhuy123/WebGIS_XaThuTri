<template>
  <div class="main">
    <div class="overlay">
      <HeaderView class="header" />
      <div class="container">
        <h1 class="title-homeview">HỆ THỐNG WEBGIS THÔNG TIN XÃ THƯ TRÌ - TỈNH HƯNG YÊN</h1>

        <div class="box-service">
          <router-link to="/vanhoaxahoi" class="service-item" style="background-color: #FF793F;">Văn hóa - xã hội</router-link>
          <router-link to="/giaothong" class="service-item"style="background-color: #F1C40F;">Giao thông</router-link>
          <router-link to="/nongnghiepmoitruong" class="service-item"style="background-color: #3498DB;">Nông nghiệp - môi trường</router-link>
          <router-link to="/diagioi" class="service-item"style="background-color: #79FF3F ;">Địa giới hành chính</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import HeaderView from '@/components/HeaderView.vue';

</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/image/xathutri.jpg');
  background-size: cover;
  background-position: center;
}

/* .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.344);
} */

.header {
  margin-top: 50px;
}

.container {
  position: relative;
  z-index: 1;
  color: #040760;
  text-align: center;
  padding-top: 150px;

}

.title-homeview {
  display: inline-block;
  font-weight: bold;
  font-size: 38px;
  text-shadow: 2px 2px #ffff;
}

.box-service {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.box-service .service-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  /* background-color: rgba(255, 255, 255, 0.8); */
  border-radius: 12px;
  text-decoration: none;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.box-service .service-item:hover {
  transform: translateY(-10px);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
}


</style>
