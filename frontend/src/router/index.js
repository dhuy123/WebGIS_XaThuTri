import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashbroadView.vue'
import TongQuanView from '../views/DashbroardComponents/TongQuanView.vue'
import LoaiDoiTuongView from '@/views/DashbroardComponents/LoaiDoiTuongView.vue'
import LoaiCayTrongView from '@/views/DashbroardComponents/LoaiCayTrongView.vue'
import Documment1View from '@/views/DashbroardComponents/DocumentView.vue'
import LoaiTrangThaiNuocMat from '@/views/DashbroardComponents/LoaiTrangThaiNuocMatView.vue'
import XepHangDiTich from '@/views/DashbroardComponents/XepHangDiTichView.vue'
import LoaiHienTrangView from '@/views/DashbroardComponents/LoaiHienTrangView.vue'
import NguoiDungView from '@/views/DashbroardComponents/NguoiDungView.vue'
import VanHoaXaHoiView from '../views/VanHoaXaHoiView.vue'
import GiaoThongView from '../views/GiaoThongView.vue'
import NongNghiepMoiTruongView from '@/views/NongNghiepMoiTruongView.vue'
import DiaGioiView from '@/views/DiaGioiView.vue'
import DocumentView from '@/views/DocumentView.vue'
import AboutView from '@/views/AboutView.vue'

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
        { path:'/dashboard/loaicaytrong', component: LoaiCayTrongView },
        { path:'/dashboard/loaitrangthainuocmat', component: LoaiTrangThaiNuocMat },
        { path:'/dashboard/xephangditich', component: XepHangDiTich },
        { path:'/dashboard/document', component: Documment1View },
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
    {
      path : '/about',
      name : 'About',
      component : AboutView,
    }
  ],
})

export default router
