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
app.set('views', './views');
app.set('view engine', 'ejs');

// This fun will create middlewre in nodejs app
app.use(express.urlencoded());

app.get('/', (req,res)=>{
  res.render('index');
})

// Post
app.post('/', function(req, res){
  console.log(req.body);
  res.send(req.body);
})

// Listen
app.listen(port ,() => console.info(`Listening on port ${port}`));

module.exports = app;
