const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const config = require("./config/key");

const { User } = require("./models/User");
const { Favorite } = require("./models/Favorite");
const { auth } = require('./middleware/auth')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser())

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




  app.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
  });

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  // 유저정보를 저장하기전엠 암호화

  user.save((err, userInfo) => {
    if (err) return res.json({ success: true, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 email을 데이터베이스에서 찾기 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: " 찾고자 하는 이메일이 없습니다."
      });
    }
  

  //이메일 있다면비밀번호 같은지 확인
  user.comparePassword(req.body.password, (err, isMatch) =>{
     if(!isMatch)
     return res.json({ loginSuccess: false, message:"비밀번호가 맞지 않습니다."})
     // 비밀번호 까지 맞다면 토큰생성
     
     user.generateToken((err, user) =>{
         if(err) return res.status(400).send(err)
         // 토큰을 저장한다
         res.cookie("x_auth", user.token)
         .status(200)
         .json({ loginSuccess: true, userId: user._id})
        })
         
  })
    });
});

//auth 콜백전에 인증처리 해줄 미들웨어추가

app.get('/api/users/logout',auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: ""}, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
          success: true
      });
  });
});

app.post('/api/favorite/favoriteNumber', (req, res) => {

  //mongoDB에서   favorite 숫자를 가져오기 
  Favorite.find({ "championId": req.body.championId })
      .exec((err, info) => {
          if (err) return res.status(400).send(err)
          // 그다음에   프론트에  다시   숫자 정보를 보내주기  
          res.status(200).json({ success: true, favoriteNumber: info.length })
      })

})


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


const port = 5000; //백엔드 서버
app.listen(port, () => console.log(`${port}`));

