const minioClient = require('./config/minio');

async function test() {
    try {
        const exists = await minioClient.bucketExists('huy');
        console.log('Bucket exists:', exists);
    } catch (err) {
        console.error('MinIO error:', err);
    }
}

test();
