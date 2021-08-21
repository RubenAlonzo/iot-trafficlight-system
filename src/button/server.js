const express = require('express');
const app = express();

// DEFINE APPLICATION LISTENER
app.set('port', process.env.PORT || 3000); // Set to port 8080 in production
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

//CONFIGURE STATIC RESOURCES https://expressjs.com/en/4x/api.html#express.static
let options = {
  dotfiles: "ignore",
  etag: true,
  extensions: ["htm", "html"],
  index: false,
  maxAge: "7d",
  redirect: false,
  setHeaders: function(res, path, stat) {
    //add this header to all static responses
    res.set("x-timestamp", Date.now());
  }
};

app.use(express.static("static", options));

// DEFINE ENDPOINTS
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/static/html/index.html');
})

