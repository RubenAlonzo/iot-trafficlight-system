const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3003); // Set to port 8080 in production

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
})

app.get('/styles.css', (req, res) => {
  res.sendFile(__dirname +'/styles.css');
})

app.get('/index.js', (req, res) => {
  res.sendFile(__dirname +'/index.js');
})

app.get('/browserMqtt.js', (req, res) => {
  res.sendFile(__dirname +'/browserMqtt.js');
})

app.get('/mqttClient.js', (req, res) => {
  res.sendFile(__dirname +'/mqttClient.js');
})
