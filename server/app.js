const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DictionaryApp');

const Word = require('./models/word')
app.get('/',async(req,res)=>{
    const {name}=req.body;
    //want to find the word coming from client will exists in mongodb or not
    const newword = await Word.find({name : name});
    //if exists , send the response to client side
    if(newword.length>0){
        res.status(201).json({message : "word is there in mongodb" , data : newword})
    }else{
       try{
        const response = await fetch(`https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-us/${name}`,
            {
              method : 'GET',
              headers:{
                 "Content-Type" : "application/json",
                 app_id : "e3c92a72",
                 app_key :'3b6f180a749150577a7dcc35199a3517'
              }
            }
         )
        const data = await response.json();
        await Word.create({name : name , data :data})
        res.status(200).json({message : 'the word is fetched from oxford api' , data : data})
       }
       catch(err){
        console.error(err),
        res.status(500).json({message : err.message})
       }
    }
})

const port = 5000;
app.listen(port,()=>console.log(`the server is running at ${port}`))