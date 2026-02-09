import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashbroadView.vue'
import TongQuanView from '../views/DashbroardComponents/TongQuanView.vue'
import LoaiDoiTuongView from '@/views/DashbroardComponents/LoaiDoiTuongView.vue'
import LoaiHienTrangView from '@/views/DashbroardComponents/LoaiHienTrangView.vue'
import NguoiDungView from '@/views/DashbroardComponents/NguoiDungView.vue'
import VanHoaXaHoiView from '../views/VanHoaXaHoiView.vue'
import GiaoThongView from '../views/GiaoThongView.vue'
import NongNghiepMoiTruongView from '@/views/NongNghiepMoiTruongView.vue'
import DiaGioiView from '@/views/DiaGioiView.vue'
import DocumentView from '@/views/DocumentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path : '/dashboard',
      name : 'Dashboard',
      component : DashboardView,
      children: [
        { path:'/dashboard/tongquan', component: TongQuanView },
        { path:'/dashboard/loaidoituong', component: LoaiDoiTuongView },
        { path:'/dashboard/loaihientrang', component: LoaiHienTrangView },
        { path:'/dashboard/nguoidung', component: NguoiDungView },
      ]
    },
    {
      path : '/vanhoaxahoi',
      name : 'VanHoaXaHoi',
      component : VanHoaXaHoiView,
    },
    {
      path : '/giaothong',
      name : 'GiaoThong',
      component : GiaoThongView,
    },
    {
      path : '/nongnghiepmoitruong',
      name : 'NongNghiepMoiTruong',
      component : NongNghiepMoiTruongView,
    },
    {
      path : '/document',
      name : 'Document',
      component : DocumentView,
    },
    {
      path : '/diagioi',
      name : 'DiaGioi',
      component : DiaGioiView,
    },
  ],
})

export default router
