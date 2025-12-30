const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /getAll:
 *   get:
 *     tags: [Test]
 *     summary: Simple API example
 *     responses:
 *       200:
 *         description: Ok
 */
app.get('/getAll', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
