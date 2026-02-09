<template>
  <div class="container1">
    <div class="content-document">
      <div class="tile-document">
        <h1>TỔNG QUAN </h1>
      </div>
      <hr />

      <div class="main-document">
        <a-row :gutter="[16, { xs: 8, sm: 16, md: 24, lg: 32 }]" style="margin: 20px;">
          <a-col :span="6" >
            <a-card style="background-color: red;">
              <h3>Địa giới hành chính</h3>
              <a-statistic title="Tổng đường địa giới hành chính" :value="totalDuongDiaGioiHanhChinh">
                <template #formatter>
                  <span ref="duongDiaGioiHanhChinhRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>

          <a-col :span="6">
            <a-card style="background-color: red;">
              <h3>Địa giới hành chính</h3>
              <a-statistic title="Tổng địa phận hành chính" :value="totalDiaPhanHanhChinh">
                <template #formatter>
                  <span ref="diaPhanHanhChinhRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>

          <a-col :span="6">
            <a-card style="background-color: red;">
              <h3>Địa giới hành chính</h3>
              <a-statistic title="Tổng ủy ban nhân dân xã" :value="totalUyBanNhanDanXa">
                <template #formatter>
                  <span ref="uyBanNhanDanXaRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>

          <a-col :span="6" >
            <a-card style="background-color: yellow;">
              <h3>Văn hóa - xã hội </h3>
              <a-statistic title="Tổng công trình y tế" :value="totalCongTrinhYTe">
                <template #formatter>
                  <span ref="congTrinhYTeRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card style="background-color: yellow;">
              <h3>Văn hóa - xã hội </h3>
              <a-statistic title="Tổng công trình giáo dục" :value="totalCongTrinhGiaoDuc">
                <template #formatter>
                  <span ref="congTrinhGiaoDucRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card style="background-color: yellow;">
              <h3>Văn hóa - xã hội </h3>
              <a-statistic title="Tổng công trình tôn giáo" :value="totalCongTrinhTonGiao">
                <template #formatter>
                  <span ref="congTrinhTonGiaoRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card style="background-color: yellow;">
              <h3>Văn hóa - xã hội </h3>
              <a-statistic title="Tổng nhà văn hóa" :value="totalNhaVanHoa">
                <template #formatter>
                  <span ref="nhaVanHoaRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card style="background-color: yellow;">
              <h3>Văn hóa - xã hội </h3>
              <a-statistic title="Tổng nhà" :value="totalNha">
                <template #formatter>
                  <span ref="nhaRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card style="background-color: blue; ">
              <h3>Giao thông </h3>
              <a-statistic title="Tổng đường bộ" :value="totalDuongBo">
                <template #formatter>
                  <span ref="duongBoRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card style="background-color: green;">
              <h3>Nông nghiệp - môi trường </h3>
              <a-statistic title="Tổng nước mặt" :value="totalNuocMat">
                <template #formatter>
                  <span ref="nuocMatRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card style="background-color: green;">
              <h3>Nông nghiệp - môi trường </h3>
              <a-statistic title="Tổng cây hàng năm" :value="totalCayHangNam">
                <template #formatter>
                  <span ref="cayHangNamRef"></span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>

        </a-row>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'
import { countCongTrinhGiaoDuc } from '@/api/api_count'

const diaPhanHanhChinhRef = ref(null);
const duongDiaGioiHanhChinhRef = ref(null);
const uyBanNhanDanXaRef = ref(null);
const congTrinhGiaoDucRef = ref(null);
const congTrinhTonGiaoRef = ref(null);
const congTrinhYTeRef = ref (null);
const nhaVanHoaRef = ref (null);
const nhaRef = ref (null);
const duongBoRef = ref (null);
const nuocMatRef = ref (null);
const cayHangNamRef = ref (null);

const totalCongTrinhGiaoDuc = ref();
const totalDiaPhanHanhChinh = ref(1);
const totalDuongDiaGioiHanhChinh = ref(1);
const totalUyBanNhanDanXa = ref(3);
const totalCongTrinhTonGiao = ref(13);
const totalCongTrinhYTe = ref(4);
const totalNhaVanHoa = ref(8);
const totalNha = ref(4903);
const totalDuongBo = ref(23);
const totalNuocMat = ref(14);
const totalCayHangNam = ref(27);



const totalCongTrinhGiaoDuc1 = async () => {
  try {
    const response = await countCongTrinhGiaoDuc();
    totalCongTrinhGiaoDuc.value = response.data;
    console.log('Tổng công trình giáo dục:', totalCongTrinhGiaoDuc.value);
    new CountUp(
      congTrinhGiaoDucRef.value,
      totalCongTrinhGiaoDuc.value,
      { duration: 2 }
    ).start()
  } catch (error) {
    console.error('Lỗi khi đếm công trình giáo dục:', error);
  }
};

onMounted(() => {
  totalCongTrinhGiaoDuc1();

  new CountUp(
    diaPhanHanhChinhRef.value,
    totalDiaPhanHanhChinh.value,
    { duration: 2 }
  ).start();

  new CountUp(
    duongDiaGioiHanhChinhRef.value,
    totalDuongDiaGioiHanhChinh.value,
    { duration: 2 }
  ).start();

  new CountUp(
    uyBanNhanDanXaRef.value,
    totalUyBanNhanDanXa.value,
    { duration: 2 }
  ).start();

  new CountUp(
    congTrinhTonGiaoRef.value,
    totalCongTrinhTonGiao.value,
    { duration: 2 }
  ).start();

  new CountUp(
    nhaVanHoaRef.value,
    totalNhaVanHoa.value,
    { duration: 2 }
  ).start();

  new CountUp(
    nhaRef.value,
    totalNha.value,
    { duration: 2 }
  ).start();

  new CountUp(
    duongBoRef.value,
    totalDuongBo.value,
    { duration: 2 }
  ).start();

  new CountUp(
    nuocMatRef.value,
    totalNuocMat.value,
    { duration: 2 }
  ).start();

  new CountUp(
    cayHangNamRef.value,
    totalCayHangNam.value,
    { duration: 2 }
  ).start();

  new CountUp(
    congTrinhYTeRef.value,
    totalCongTrinhYTe.value,
    { duration: 2 }
  ).start();
  

})
</script>
<style scoped>
.container1 {
  padding: 0 10px;
  background-color: white;
}

.tile-document h1 {
  padding: 0px;
  margin: 10px 10px;
  font-size: 20px;
  /* padding: 20px 0 0 20px; */
}

.search1 {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  /* padding: 10px; */
}

.main-document {
  /* margin-top: 20px; */
  overflow: hidden;
}

.main-document .search {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px;
}

.table :deep(.ant-table-tbody > tr > td, .ant-table-thead > tr > th) {
  padding: 7.5px 0 !important;
}


.editable-row-operations a {
  margin-right: 8px;
}
</style>