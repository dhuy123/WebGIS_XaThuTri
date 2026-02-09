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
      { title: 'Zoom', dataIndex: 'zoom', key: 'zoom'},
      { title: 'Mã đối tượng', dataIndex: 'ma_doi_tuong', key: 'ma_doi_tuong' },
      { title: 'Hiện trạng', dataIndex: 'loai_hien_trang', key: 'loai_hien_trang' },
      { title: 'Mã thôn', dataIndex: 'ma_thon', key: 'ma_thon' },
      { title: 'Loại nhà', dataIndex: 'loai_nha', key: 'loai_nha' },
      { title: 'Tên chủ nhà', dataIndex: 'ten_chu_nha', key: 'ten_chu_nha' },
      { title: 'Số tầng', dataIndex: 'so_tang', key: 'so_tang' },
      { title: 'Địa chỉ', dataIndex: 'dia_chi', key: 'dia_chi' },
      { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', width: 150 },
      { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', width: 150},
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
  },
  {
    page: 'VanHoaXaHoiView',
    title: 'Công trình giáo dục',
    layerName: 'cong_trinh_giao_duc',
    geometryType: 'Point',
    form: 'CongTrinhGiaoDucForm',
    propertyName: '',
    columns: [
       { title: 'Zoom', dataIndex: 'zoom', key: 'zoom'},
    ]
  },
  {
    page: 'VanHoaXaHoiView',
    title: 'Công trình tôn giáo',
    layerName: 'cong_trinh_ton_giao',
    geometryType: 'Point',
    form: 'CongTrinhTonGiaoForm'
  },
  {
    page: 'VanHoaXaHoiView',
    title: 'Nhà văn hóa',
    layerName: 'nha_van_hoa',
    geometryType: 'Point',
    form: 'NhaVanHoaForm'
  },
  {
    page: 'GiaoThongView',
    title: 'Đường bộ',
    layerName: 'duong_bo',
    geometryType: 'LineString',
    form: 'DuongBoForm'
  },
  {
    page: 'NongNghiepMoiTruongView',
    title: 'Cây hàng năm',
    layerName: 'cay_hang_nam',
    geometryType: 'Polygon',
    form: 'CayHangNamForm'
  },
  {
    page: 'NongNghiepMoiTruongView',
    title: 'Nước Mặt',
    layerName: 'mat_nuoc',
    geometryType: 'Polygon',
    form: 'NuocMatForm'
  },
];

const getLayerByPage = (page) => {
  return editableLayers.filter(layer => layer.page === page);
}


export { editableLayers, getLayerByPage };
