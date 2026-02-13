import express from 'express';
import {initDB} from "./data/database.js";


const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/api/spoons/data', async (req, res) => {
    const database = await initDB();
    res.json(database.data.spoons);
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});


