const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const config = require("./config/key");

const userAPIRouter = require('./routes/user');


const { Favorite } = require("./models/Favorite");
const { Comment } = require("./models/Comment");
const { Product } = require("./models/Product");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', userAPIRouter)



const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("몽고DB  연결됨"))
  .catch(err => console.log(err));




app.post('/api/favorite/myFavorited', (req, res) => {

  //내가 좋아요 눌렀나 DB에서 가져오기
  Favorite.find({ "championId": req.body.championId ,"userFrom": req.body.userFrom})
  .exec((err, info) => {
    if (err) return res.status(400).send(err)
    // 그다음에   프론트에  다시   숫자 정보를 보내주기  

    let result = false;
    if (info.length !== 0) {
        result = true
    }

    res.status(200).json({ success: true, myFavorited: result })
})

})

app.post('/api/favorite/addFavorite', (req, res) => {
   const favorite = new Favorite(req.body)
   favorite.save((err, doc) =>{
    if (err) return res.status(400).send(err)
    return res.status(200).json({ success: true });
   })
})

app.post('/api/favorite/removeFavorite', (req, res) => {
  Favorite.findOneAndDelete({ championId: req.body.championId , userFrom: req.body.userFrom })
  .exec((err,doc) =>{
     if(err) return res.status(400).send(err)
     return res.status(200).json({ success:true, doc })
  })
})
// 내가 좋아요를 누른 챔피언들의 리스트를 가죠온다

app.post('/api/favorite/getFavoritedChampion', (req, res) => {
  Favorite.find({ 'userFrom': req.body.userFrom })
  .exec((err,favorites) =>{
     if(err) return res.status(400).send(err)
     return res.status(200).json({ success:true, favorites })
  })
})



// 내가 좋아요를 누른 챔피언들의 리스트를 삭제한다

app.post('/api/favorite/removeFavorite', (req, res) => {
  Favorite.findOneAndDelete({ "championId":req.body.championId,'userFrom': req.body.userFrom })
  .exec((err,result) =>{
     if(err) return res.status(400).send(err)
     return res.status(200).json({ success:true, result })
  })
})





app.post('/api/comment/saveComment', (req, res) => {
    const comment = new Comment(req.body)
    comment.save((err, comment) =>{
      if(err) return res.json({ success: false, err})
  
        Comment.find({"_id": comment._id})
        .populate('writer')
        .exec((err,result) =>{
          if(err) return res.status(400).send(err)
          return res.status(200).json({ success:true, result })
        })
    })
}) 
 
app.post('/api/comment/getComments', (req, res) => {

    Comment.find({"championId": req.body.championId})
      .populate('writer')
      .exec((err,comments) =>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success:true, comments })
      })
})


//상품 정보들을 업로드한다
app.post('/api/product/uploadProduct', (req, res) => {

  const product = new Product(req.body)
  product.save((err, doc) =>{
    if (err) return res.status(400).send(err)
    return res.status(200).json({ success: true ,doc});
   })
})


const port = 5000; //백엔드 서버
app.listen(port, () => console.log(`${port}`));

