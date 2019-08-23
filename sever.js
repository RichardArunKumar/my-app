//Install express server
const express = require('express');
const path = require('path');
bodyParser = require('body-parser'),
//cros = require('cros');

mongoose = require('mongoose'),  
config = require('./DB');  
mongoose.Promise = global.Promise;  
mongoose.connect(config.DB, { useNewUrlParser: true }).then(  
  () => {console.log('Database is connected') },  
  err => { console.log('Can not connect to the database'+ err)}  
);  

let productRoute = require("./routes/product_route.js");

const app = express();  
app.use(bodyParser.json());  
//app.use(cors()); 
app.use('/products', productRoute); 

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/my-app'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/my-app/index.html'));
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);