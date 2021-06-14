const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/noteModel.js')
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    console.log("Refresh Index Page");
    res.send("every is connected");
})

const db = 'mongodb://localhost/newDb';

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connection successfull");
}).catch(()=>{
    console.log("not successfulll")
})

app.get('/movies',function(req,res){
    Note.find().then(movies=>res.json(movies))
})
 
app.post('/newmovie',function(req,res){
    const title = req.body.title
    
    const newMovie = new Note({
        title
        
    })
    console.log(newMovie)
    newMovie.save()

})

app.delete('/delete/:id',function(req,res){
    console.log("i was here")
    const id = req.params.id
    Note.findByIdAndDelete({_id: id},function(err){
        if(!err){
            console.log("todo deleted")
        }else{
            console.log(err)
        }
    })
})

app.get('/movies/:id', function(req, res) {  
    Note.findById(req.params.id, function(err, article) {
      if (!article) {
        res.status(404).send('No result found');
      } else {
        res.json(article);
      }
    });
  });

  app.patch('/movies/:id', function(req, res){    
    Note.findByIdAndUpdate(req.params.id, req.body)
      .then(function() {
        res.json('Todo updated');
      })
      .catch(function(err) {
        res.status(422).send("Todo update failed.");
      });
  });



app.listen(8000,function(){
    console.log("server is running on port 8000")
})