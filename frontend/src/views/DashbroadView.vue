<template>
    <HeaderView />
    <div class="dashboard-view">
        <div class="sidebar">
            <div class="sidebar-title">Quản trị chung</div>

            <div class="menu">
                <RouterLink to="/dashboard/tongquan" class="menu-item" active-class="active">
                    Tổng quan
                </RouterLink>

                <RouterLink to="/dashboard/loaidoituong" class="menu-item" active-class="active">
                    Quản lý loại đối tượng
                </RouterLink>

                <RouterLink to="/dashboard/loaihientrang" class="menu-item" active-class="active">
                    Quản lý loại hiện trạng
                </RouterLink>

                 <RouterLink to="/dashboard/loaicaytrong" class="menu-item" active-class="active">
                    Quản lý loại cây trồng
                </RouterLink>

                  <RouterLink to="/dashboard/loaitrangthainuocmat" class="menu-item" active-class="active">
                    Quản lý loại trạng thải nước mặt 
                </RouterLink>

                  <RouterLink to="/dashboard/xephangditich" class="menu-item" active-class="active">
                    Quản lý loại xếp hạng di tích
                </RouterLink>

                <RouterLink to="/dashboard/document" class="menu-item" active-class="active">
                    Quản lý văn bản, tài liệu
                </RouterLink>

                <RouterLink to="/dashboard/nguoidung" class="menu-item" active-class="active">
                    Quản lý người dùng
                </RouterLink>
            </div>
        </div>
        <div class="main-content">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import HeaderView from '@/components/HeaderView.vue';
</script>

<style scoped>
.dashboard-view {
    display: flex;
    width: 100%;
    height: 100vh;
}

.sidebar {
    background-color: #a3dbbc;
    position: fixed;
    top: 50px;
    /* left: 0; */
    width: 280px;
    height: calc(100% - 50px);
    box-sizing: border-box;
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 28px;
}

.sidebar-title {
    font-weight: 700;
    margin-bottom: 12px;
    padding: 16px;
}

.menu {
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
}
.menu-item {
    padding: 10px 16px;
    border-radius: 6px;
    text-decoration: none;
    color: #000;
    font-size: 18px;

}
.menu-item:hover {
  background: rgba(255,255,255,0.55);
}

.menu-item.active {
  background: #ffffff;
  font-weight: 700;
  box-shadow: 0 1px 6px rgba(0,0,0,0.12);
}

.main-content {
    margin-left: 280px;
    width: calc(100% - 280px);
    height: calc(100% - 50px);
    margin-top: 50px;
    background-color: #ffffff;
}
</style>