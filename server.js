const axios = require('axios');
const express = require('express');
const apps = express();
const cors = require('cors');
const mongoose = require('mongoose');
const db = 'mongodb://adylau97:yitchin97@ds037498.mlab.com:37498/wallpaperdb';

var bodyParser = require('body-parser');   
var Schema = mongoose.Schema;
var imageSchema = new Schema({
  url: {type: String}
});
var model = mongoose.model('Image', imageSchema, 'Image');


apps.use(cors());
apps.use(bodyParser.json({limit:'5mb'}));
apps.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  

apps.listen(5000, ()=>{
  console.log('Connecting...');
});

apps.get('/getImage/:page/:q',(req,res)=>{

const API_KEY = '10095037-097333a2362dace817e1654de';
const URL = `https://pixabay.com/api/?key=${API_KEY}&page=${req.params.page}&q=${req.params.q}`;

  axios.get(URL)
    .then(function (response){
      if(response.data.totalHits>0){
        res.send(response.data.hits);
      }else{
        console.log('No hits');
      }
    })
    .catch(function(error){
      console.log(error);
    });
});

mongoose.connect(db, { useNewUrlParser : true})
.then(()=>{
  console.log('Connected to mongodb');
})
.catch(error=>{
  console.log(error);
});

apps.get('/getFavorite',(req,res)=>{
  model.find({},function(err,data){
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
});

apps.post('/removeFavorite',function(req,res){
  model.deleteOne({_id: req.body.id}, function(err){
    if(err){  
      res.send(err);  
    }else{    
      res.send({data:"Img has been Deleted..!!"});             
    }  
  });
});

apps.post('/addFavorite',function(req,res){
  var mod = new model(req.body);
  console.log(req.body);
  mod.save(function(err){
    if(err){
      res.send(err);
    }else{
      res.send({data:"Img has been Added..!!"})
    }
  })
});
