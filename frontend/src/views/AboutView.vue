<template>
  <div class="page-document">
    <HeaderView class="header-view" />

    <div class="container">
      <div class="content-document">
        <div class="tile-document">
          <h1>GIỚI THIỆU VỀ XÃ THƯ TRÌ - TỈNH HƯNG YÊN </h1>
        </div>
        <hr />
        <div class="video">
          <video controls width="800" height="400px" style="max-width: 100%; display: block; margin: 20px auto;">
            <source src="../assets/image/thuyetminh.mp4" type="video/mp4">
          </video>
        </div>
        <div class="xa-thu-tri" style="margin-left: 20px;">
          <h2>Vị trí địa lý</h2>
          <p>
            Xã Thư Trì là một đơn vị hành chính cấp xã thuộc tỉnh Hưng Yên. Nằm ở phía nam của tỉnh Hưng Yên, có vị trí
            tâm điểm nằm tại 20,4861 độ vĩ độ Bắc - 106,263 độ kinh độ Đông.
          </p>

          <h2>Địa giới hành chính</h2>
          <ul>
            <li>Phía Đông giáp phường Thái Bình</li>
            <li>Phía Tây giáp xã Vạn Xuân</li>
            <li>Phía Nam giáp xã Vũ Thư</li>
            <li>Phía Bắc giáp xã Tiên Hưng và Nam Tiên Hưng</li>
          </ul>

          <h2>Lịch sử hình thành</h2>
          <p>
            Trước đây, địa bàn xã Thư Trì thuộc huyện Vũ Thư, tỉnh Thái Bình (cũ).
            Kể từ ngày 16/06/2025, Ủy ban Thường vụ Quốc hội ban hành Nghị quyết số 1666/NQ-UBTVQH15 về việc sắp xếp các
            đơn vị hành chính cấp xã của tỉnh Hưng Yên.
          </p>
          <p>
            Theo đó, toàn bộ diện tích tự nhiên và quy mô dân số của các xã Song Lãng, Hiệp Hòa và Minh Lãng được sáp
            nhập để thành lập xã mới có tên gọi là xã Thư Trì.
          </p>

          <h2>Đặc điểm địa hình</h2>
          <p>
            Xã Thư Trì nằm trong vùng đồng bằng châu thổ sông Hồng, địa hình tương đối bằng phẳng, độ dốc nhỏ. Hệ thống
            sông ngòi và kênh mương thủy lợi phát triển, thuận lợi cho sản xuất nông nghiệp, xây dựng hạ tầng kỹ thuật
            và phát triển khu dân cư.
          </p>

          <h2>Khí hậu</h2>
          <ul>
            <li>Thuộc vùng khí hậu nhiệt đới gió mùa miền Bắc</li>
            <li>Có bốn mùa rõ rệt</li>
            <li>Nhiệt độ trung bình năm: 23-24 độ C</li>
            <li>Lượng mưa trung bình: 1.500-1.700 mm/năm</li>
          </ul>
          <p>
            Điều kiện khí hậu thuận lợi cho canh tác nông nghiệp và phát triển đa dạng cây trồng.
          </p>

          <h2>Dân số và diện tích</h2>
          <ul>
            <li>Dân số: khoảng 27.178 người</li>
            <li>Diện tích: 20.97 km2</li>
            <li>Mật độ dân số: khoảng 1.296 người/km2</li>
          </ul>
          <p>
            Đây là xã nông thôn, vùng ven đô với mật độ dân số ở mức trung bình, thấp.
          </p>

          <h2>Định hướng phát triển</h2>
          <p>
            Sau khi thực hiện sắp xếp đơn vị hành chính, xã Thư Trì được tập trung đầu tư hạ tầng đồng bộ theo định
            hướng đô thị hóa của tỉnh Hưng Yên.
          </p>
          <p>
            Trọng tâm quy hoạch bao gồm:
          </p>
          <ul>
            <li>Hiện đại hóa mạng lưới giao thông kết nối</li>
            <li>Số hóa dữ liệu văn hóa - xã hội, hạ tầng và dân cư</li>
            <li>Nâng cao năng lực quản trị hành chính công</li>
          </ul>
          <p>
            Nhằm thúc đẩy phát triển kinh tế - xã hội bền vững tại địa phương.
          </p>

        </div>


      </div>
    </div>

  </div>
</template>

<script setup>
import HeaderView from "@/components/HeaderView.vue";

</script>

<style>
.page-document {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

.page-document .header-view {
  height: 50px;
}

.page-document .content-document {
  margin-top: 50px;
  height: calc(100vh - 50px);
  background-color: white;
  overflow-y: scroll;
}

.page-document .tile-document h1 {
  margin: 5px;
  font-size: 24px;
  padding: 20px 0 0 20px;
}

.page-document .sreach {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
}

.page-document .box {
  height: 570px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: #c1c0c0 0px 0px 10px;
  overflow-y: scroll;
}

.page-document .box .box1 {
  display: flex;
  margin: 10px;
  border-radius: 8px;
  box-shadow: #c1c0c0 0px 0px 10px;
}

.video {
  border: 20px;
}
</style>
