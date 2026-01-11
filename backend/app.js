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


app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/congTrinhTonGiao', congTrinhTonGiaoRouter);
app.use('/api/congTrinhYTe', congTrinhYTeRouter);
app.use('/api/congTrinhGiaoDuc', congTrinhGiaoDucRouter);
app.use('/api/duongBo', duongBoRouter);
app.use('/api/matNuoc', matNuocRouter);
app.use('/api/files', fileRouter);
app.use('/api/loaiDoiTuong', loaiDoiTuongRouter);
app.use('/api/loaiHienTrang', loaiHienTrangRouter);
app.use('/api/loaiTrangThaiMat', loaiTrangThaiMatRouter);
app.use('/api/xepHangDiTich', xepHangDiTichRouter);
app.use('/api/nhaVanHoa', nhaVanHoaRouter);
app.use('/api/coQuanLamViec', coQuanLamViecRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
