import express from 'express';
import {getSpoonsFromIngredients, initDB} from "./data/database.js";


const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/api/spoons/data', async (req, res) => {
    const database = await initDB();
    res.json(database.data.spoons);
});

app.post('/api/spoons/search', async (req, res) => {
    try {
        const {q} = req.body;
        const spoons = await getSpoonsFromIngredients(q);
        res.json(spoons);
    } catch (err) {
        res.status(500).json({error: 'Search failed'});
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});


