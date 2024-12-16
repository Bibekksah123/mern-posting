const express = require('express');
const morgan = require('morgan');
const cors=require('cors')
const monk=require('monk')

const app = express();
app.use(cors())
app.use(express.json())
// Use Morgan middleware with 'dev' preset for logging
const db=monk('localhost:27017/mews')
const mews=db.get('cats')
app.use(morgan('dev'));
function isValid(mew){
  return mew.name && mew.name.toString().trim() !='' &&
  mew.content && mew.content.toString().trim() !=''
}

app.get('/', (req, res) => {
  res.json({
    message:'mew 🤣😍'
  })
});
app.post('/mews',(req,res)=>{
  if(isValid(req.body)){
    const {name,content}=req.body
    const mew={
      name,
      content
    }
    console.log(mew)
    mews
    .insert(mew)
    .then((data)=>{
      res.json(data)
    })
  }else{
    res.status(400).json({
      message:'please fill the form'
    })
  }
})
app.get('/mews',(req,res)=>{
  mews.find()
  .then(data=>res.json(data))
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
