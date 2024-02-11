import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const path = require('path');
dotenv.config();
const app = express();
process.env.TZ = 'Asia/Jakarta';
// accessible to any
app.use(cors());

// Body Parser middleware to handle raw JSON files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/upload', express.static(path.join(__dirname, '../upload')));;
const PORT = process.env.LISTEN || 2001;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});

// routes
app.use('/api/users', require('./routes/users/app'));

// when invalid routes are entered
app.use(async (req, res) => {
    res.status(404).send(`Route is no where to be found.`);
});

export default app;
