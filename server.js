// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const database = require('mime-db');

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.use(cors());
const port = 8080;
const server = app.listen(port,()=> {
    console.log(`server running in port ${port}`)
});

//post function
function addWezData(req,res){

    newWezData = {
      dt: new Date(req.body.dt *1000).toLocaleDateString("en-US"),
      cuntery: req.body.cuntery,
      city: req.body.city,
      temp: req.body.temp +' °C',
      feeling: req.body.feeling
  }
    projectData.push(newWezData)
    //console.log(newWezData)
    }

//send the data back to the frontend
app.get('/all',(request, response) =>{
    response.send(projectData);
    
    
});

//post response
app.post('/addWezData', addWezData);


    



