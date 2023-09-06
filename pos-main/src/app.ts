import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

// accessible to any
app.use(cors());

// Body Parser middleware to handle raw JSON files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.LISTEN || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});

// routes
app.use('/api/users', require('./routes/users/app'));
app.use('/api/customers', require('./routes/customers/app'));
app.use('/api/inventory', require('./routes/inventories/app'));
app.use('/api/sell', require('./routes/sells/app'));
app.use('/api/buy', require('./routes/buys/app'));
app.use('/api/warehouse', require('./routes/warehouses/app'));
app.use('/api/report', require('./routes/report/app'));
app.use('/api/dashboard', require('./routes/dashboards/app'));

// when invalid routes are entered
app.use(async (req, res) => {
    res.status(404).send(`Route is no where to be found.`);
});

export default app;
