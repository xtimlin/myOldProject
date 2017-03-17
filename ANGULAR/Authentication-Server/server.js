var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');	//handler for mongodb for node.js
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router)
var path = require('path');

// app.use(morgan('div'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);


//database name login
mongoose.connect('mongodb://localhost:27017/login', (err)=>{
	if(err){
		console.log('Not Connecting To The Database' + err);
	}else{
		console.log('Successfully Connect to MongoDB');
	}
});

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})


// app.get('/home', function(req,res){
// 	res.send('hello feom home');
// })
// app.get('/home', (req,res)=>{res.send('hello feom home');});

// app.listen(port, ()=>{console.log(`running on ${port}`);});
app.listen(port, function(){
	console.log(`running on ${port}`);
});

