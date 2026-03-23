const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const congTrinhTonGiaoRouter = require('./routes/congTrinhTonGiaoRouter');
const congTrinhYTeRouter = require('./routes/congTrinhYTeRouter');
const congTrinhGiaoDucRouter = require('./routes/congTrinhGiaoDucRouter');
const duongBoRouter = require('./routes/duongBoRouter');
const matNuocRouter = require('./routes/matNuocRouter');
const fileRouter = require('./routes/fileRouter');
const loaiDoiTuongRouter = require('./routes/loaiDoiTuongRouter');
const loaiHienTrangRouter = require('./routes/loaiHienTrangRouter');
const loaiTrangThaiMatRouter = require('./routes/loaiTrangThaiMatRouter');
const xepHangDiTichRouter = require('./routes/xepHangDiTichRouter');
const nhaVanHoaRouter = require('./routes/nhaVanHoaRouter');
const coQuanLamViecRouter = require('./routes/coQuanLamViecRouter');
const nhaRouter = require('./routes/nhaRouter');
const duongDiaGioiHanhChinhRouter = require('./routes/duongDiaGioiHanhChinhRouter');
const diaPhanHanhChinhRouter = require('./routes/diaPhanHanhChinh');

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/cong_trinh_ton_giao', congTrinhTonGiaoRouter);
app.use('/api/cong_trinh_y_te', congTrinhYTeRouter);
app.use('/api/cong_trinh_giao_duc', congTrinhGiaoDucRouter);
app.use('/api/duong_bo', duongBoRouter);
app.use('/api/mat_nuoc', matNuocRouter);
app.use('/api/files', fileRouter);
app.use('/api/loaiDoiTuong', loaiDoiTuongRouter);
app.use('/api/loaiHienTrang', loaiHienTrangRouter);
app.use('/api/loaiTrangThaiMat', loaiTrangThaiMatRouter);
app.use('/api/xepHangDiTich', xepHangDiTichRouter);
app.use('/api/nha_van_hoa', nhaVanHoaRouter);
app.use('/api/tru_so_co_quan_nha_nuoc', coQuanLamViecRouter);
app.use('/api/nha', nhaRouter);
app.use('/api/duong_dia_gioi_hanh_chinh', duongDiaGioiHanhChinhRouter);
app.use('/api/dia_phan_hanh_chinh', diaPhanHanhChinhRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
