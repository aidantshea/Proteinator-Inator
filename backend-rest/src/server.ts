import express from 'express';
import 'dotenv/config';
import * as db from './models.js';
import router from './controllers.js'

const app = express(); 
const PORT = process.env.port || 3000;

app.use(express.json());
app.use('/', router);

app.listen(PORT, async () => {
    await db.connect();
    console.log(`Server listening on PORT ${PORT}...`);
});