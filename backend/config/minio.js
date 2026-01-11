const Minio = require('minio');
const dotenv = require('dotenv');
dotenv.config();

const minioClient = new Minio.Client({
    endPoint: process.env.END_POINT,
    port: Number(process.env.PORT_POINT),
    useSSL: false,
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY
}
);



const connectMinio = async () => {
    try {
    await minioClient.listBuckets();
    console.log('MinIO OK');
  } catch (err) {
    console.error('MinIO lỗi:', err.message);
  }
};

console.log('MinIO config:', {
  endPoint: process.env.END_POINT,
  port: process.env.PORT_POINT
});

connectMinio();

module.exports = minioClient;
