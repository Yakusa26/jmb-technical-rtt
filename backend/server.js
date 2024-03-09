const dotenv = require('dotenv');
const cors = require('cors');

const environment = process.env.NODE_ENV || 'development';
const envPath = `.env.${environment}`;

dotenv.config({ path: envPath });

const express = require('express');
const bodyParser = require('body-parser');
const rttRoutes = require('./routes/rttRoutes');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', rttRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}
