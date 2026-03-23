const GEOSERVER_WORKSPACE = import.meta.env.VITE_API_GEOSERVER_WORKSPACE;

const editableLayers = [
  {
    page: 'VanHoaXaHoiView',
    title: 'Nhà',
    layerName: 'nha',
    workspace: 'thutri',
    namespace: 'http://thutri.org',
    geometryType: 'Polygon',
    form: 'NhaForm',
    propertyName: 'id,geom,ma_doi_tuong,nhom_doi_tuong,loai_hien_trang,ma_thon,loai_nha,ten_chu_nha,so_tang,dia_chi,created_at,updated_at',
    columns: [
      { title: 'STT', dataIndex: 'stt', customRender: ({ index }) => index + 1, },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Zoom', dataIndex: 'zoom', key: 'zoom' },
      { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
      { title: 'Hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
      { title: 'Mã thôn', dataIndex: 'ma_thon', key: 'ma_thon' },
      { title: 'Loại nhà', dataIndex: 'loai_nha', key: 'loai_nha' },
      { title: 'Tên chủ nhà', dataIndex: 'ten_chu_nha', key: 'ten_chu_nha' },
      { title: 'Số tầng', dataIndex: 'so_tang', key: 'so_tang' },
      { title: 'Địa chỉ', dataIndex: 'dia_chi', key: 'dia_chi' },
      { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', width: 150 },
      { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
    ]
  },
  {
    page: 'VanHoaXaHoiView',
    title: 'Công trình y tế',
    layerName: 'cong_trinh_y_te',
    workspace: 'thutri',
    geometryType: 'Point',
    form: 'CongTrinhYTeForm',
    propertyName: '',
    columns: [
      { title: 'STT', dataIndex: 'stt', customRender: ({ index }) => index + 1, },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Zoom', dataIndex: 'zoom', key: 'zoom' },
      { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
      { title: 'Hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
      { title: 'Tên', dataIndex: 'ten', key: 'ten' },
      { title: 'Số điện thoại', dataIndex: 'so_dien_thoai', key: 'so_dien_thoai' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'URL', dataIndex: 'url', key: 'url' },
      { title: 'Diện tích', dataIndex: 'dien_tich', key: 'dien_tich' },
      { title: 'Số giường bệnh', dataIndex: 'so_giuong_benh', key: 'so_giuong_benh' },
      { title: 'Số bác sĩ', dataIndex: 'so_bac_si', key: 'so_bac_si' },
      { title: 'Số y tá', dataIndex: 'so_y_ta', key: 'so_y_ta' },
      { title: 'Địa chỉ', dataIndex: 'dia_chi', key: 'dia_chi' },
      { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', width: 150 },
      { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
    ]
  },
  {
    page: 'VanHoaXaHoiView',
    title: 'Công trình giáo dục',
    layerName: 'cong_trinh_giao_duc',
    workspace: 'thutri',
    geometryType: 'Point',
    form: 'CongTrinhGiaoDucForm',
    // propertyName: 'id,geom,ma_doi_tuong,nhom_doi_tuong,loai_hien_trang,ten,so_dien_thoai,email,url,dien_tich,so_lop,so_hoc_sinh,so_giao_vien,nam_hoc,dia_chi,created_at,updated_at',
    columns: [
      { title: 'STT', dataIndex: 'stt', customRender: ({ index }) => index + 1, },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Zoom', dataIndex: 'zoom', key: 'zoom' },
      { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
      { title: 'Hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
      { title: 'Tên', dataIndex: 'ten', key: 'ten' },
      { title: 'Số điện thoại', dataIndex: 'so_dien_thoai', key: 'so_dien_thoai' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'URL', dataIndex: 'url', key: 'url' },
      { title: 'Diện tích', dataIndex: 'dien_tich', key: 'dien_tich' },
      { title: 'Số lớp học', dataIndex: 'so_lop', key: 'so_lop' },
      { title: 'Số học sinh', dataIndex: 'so_hoc_sinh', key: 'so_hoc_sinh' },
      { title: 'Số giáo viên', dataIndex: 'so_giao_vien', key: 'so_giao_vien' },
      { title: 'Năm học', dataIndex: 'nam_hoc', key: 'nam_hoc' },
      { title: 'Địa chỉ', dataIndex: 'dia_chi', key: 'dia_chi' },
      // { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', width: 150 },
      // { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', width: 150 },

    ]
  },
  {
    page: 'VanHoaXaHoiView',
    title: 'Công trình tôn giáo',
    layerName: 'cong_trinh_ton_giao',
    workspace: 'thutri',
    namespace: 'http://thutri.org',
    geometryType: 'Point',
    form: 'CongTrinhTonGiaoForm',
    // propertyName: 'id,geom,ma_doi_tuong,nhom_doi_tuong,loai_hien_trang,dia_chi,created_at,updated_at,ten, xep_hang_di_tich',
      columns: [
        { title: 'STT', dataIndex: 'stt', customRender: ({ index }) => index + 1, },
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Zoom', dataIndex: 'zoom', key: 'zoom' },
        { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
        { title: 'Hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
        { title: 'Xếp hạng di tích', dataIndex: 'xep_hang_di_tich', key: 'xep_hang_di_tich' },
        { title: 'Tên', dataIndex: 'ten', key: 'ten' },
        { title: 'Địa chỉ', dataIndex: 'dia_chi', key: 'dia_chi' },
        // { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', width: 150 },
        // { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
      ] 
  },
  {
    page: 'VanHoaXaHoiView',
    title: 'Nhà văn hóa',
    layerName: 'nha_van_hoa',
    workspace: GEOSERVER_WORKSPACE,
    geometryType: 'Point',
    form: 'NhaVanHoaForm',
      columns: [
        { title: 'STT', dataIndex: 'stt', customRender: ({ index }) => index + 1, },
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Zoom', dataIndex: 'zoom', key: 'zoom' },
        { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
            { title: 'danh_tu_chung', dataIndex: 'danh_tu_chung', key: 'danh_tu_chung', width: 150 },
        { title: 'Hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
        { title: 'Tên', dataIndex: 'ten', key: 'ten' },
        { title: 'Địa chỉ', dataIndex: 'dia_chi', key: 'dia_chi' },
        // { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', width: 150 },
        // { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
      ]
  },
  {
    page: 'GiaoThongView',
    title: 'Đường bộ',
    layerName: 'duong_bo',
    geometryType: 'LineString',
    workspace: GEOSERVER_WORKSPACE,
    form: 'DuongBoForm'
  },
  {
    page: 'NongNghiepMoiTruongView',
    title: 'Cây hàng năm',
    layerName: 'cay_hang_nam',
    geometryType: 'Polygon',
    workspace: GEOSERVER_WORKSPACE,
    form: 'CayHangNamForm'
  },
  {
    page: 'NongNghiepMoiTruongView',
    title: 'Nước Mặt',
    layerName: 'mat_nuoc',
    geometryType: 'Polygon',
    form: 'MatNuocForm',
    workspace: GEOSERVER_WORKSPACE

  },
  {
    page: 'VanHoaXaHoiView',
    global: true,
    title : 'Đường địa giới hành chính',
    layerName: 'duong_dia_gioi_hanh_chinh',
    workspace: GEOSERVER_WORKSPACE,
    geometryType: 'LineString',
    form: 'DuongDiaGioiForm',
    columns: [
      { title: 'STT', dataIndex: 'stt', customRender: ({ index }) => index + 1, },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Zoom', dataIndex: 'zoom', key: 'zoom' },
            { title: 'Tên', dataIndex: 'ten', key: 'ten' },
      { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
{ title: 'Loại hiện trạng pháp lý', dataIndex: 'loai_hien_trang_phap_ly', key: 'loai_hien_trang_phap_ly' },
      // { title: 'Hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
      { title: 'Chiều dài (m)', dataIndex: 'chieu_dai_m', key: 'chieu_dai_m' },
      // { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', width: 150 },
      // { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
    ]

  },
  {
    page: 'VanHoaXaHoiView',
    global: true,
    title: 'Địa phân hành chính',
    layerName: 'dia_phan_hanh_chinh',
    workspace: GEOSERVER_WORKSPACE,
    geometryType: 'Polygon',
    form: 'DiaPhanHanhChinhForm',
    columns: [
      { title: 'STT', dataIndex: 'stt', customRender: ({ index }) => index + 1, },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Zoom', dataIndex: 'zoom', key: 'zoom' },
      { title: 'Tên', dataIndex: 'ten', key: 'ten' },
      { title: 'Mã đơn vị hành chính', dataIndex: 'ma_don_vi_hanh_chinh', key: 'ma_don_vi_hanh_chinh' },
      { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
      { title: 'Diện tích (Km²)', dataIndex: 'dien_tich', key: 'dien_tich' },
      // { title: 'Loại hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
      { title: 'Dân số (nghìn người)', dataIndex: 'so_dan', key: 'so_dan' },
      // { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', width: 150 },
      // { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
    ]
  },
  {
    page: 'VanHoaXaHoiView',
    global: true,
    title: 'Trụ sở cơ quan nhà nước',
    layerName: 'tru_so_co_quan_nha_nuoc',
    workspace: GEOSERVER_WORKSPACE,
    geometryType: 'Point',
    form: 'TruSoCoQuanNhaNuocForm',
    columns: [
      { title: 'STT', dataIndex: 'stt', customRender: ({ index }) => index + 1, },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Zoom', dataIndex: 'zoom', key: 'zoom' },
      { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
      { title: 'Hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
    ]
  }
];

// quản lý layer 
const getLayerByPage = (page) => {
  return editableLayers.filter(layer =>
    layer.global || layer.page === page
  );
}


export { editableLayers, getLayerByPage };
