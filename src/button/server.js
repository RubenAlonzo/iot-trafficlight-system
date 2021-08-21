import express from 'express'
import path from 'path'

const app = express();
const port = process.env.PORT || 3000;

app.listen(port);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
})

app.get('/styles.css', (req, res) => {
  res.sendFile(path.resolve('./styles.css'));
})

app.get('/index.js', (req, res) => {
  res.sendFile(path.resolve('./index.js'));
})
