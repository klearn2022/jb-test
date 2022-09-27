const express = require('express');
const app = express();
const port = process.env.PORT || 80;

// Static files

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

app.use(express.static('node_modules'));
app.use('/jquery', express.static(__dirname + 'node_modules/jquery'));

// Set Views
app.use(express.static('views'));

//app.set('view engine', 'ejs');

// This fun will create middlewre in nodejs app
app.use(express.urlencoded());

app.get('/', (req,res)=>{
  res.sendFile(__dirname  + 'public/index.html');
})

// Called when a journey is saving the activity
app.post("/journeybuilder/save", function (req, res) {
  console.log("debug: /journeybuilder/save");
  return res.status(200).json({ success: true });
});

// Called when a Journey has been published
app.post("/journeybuilder/publish", function (req, res) {
  console.log("debug: /journeybuilder/publish");
  return res.status(200).json({ success: true });
});

//Called when Journey Builder wants you to validate the configuration
app.post("/journeybuilder/validate", function (req, res) {
  console.log("debug: /journeybuilder/validate");
  return res.status(200).json({ success: true });
});

//Called when a Journey is stopped
app.post("/journeybuilder/stop", function (req, res) {
  console.log("debug: /journeybuilder/stop");
  return res.status(200).json({ success: true });
});

// Post
app.post('/', function(req, res){
  console.log(req.body);
  res.send(req.body);
})

// Listen
app.listen(port ,() => console.info(`Listening on port ${port}`));

module.exports = app;
