import express from 'express'
import path from 'path'

const app = express();
const port = process.env.PORT || 3002;

app.listen(port);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})