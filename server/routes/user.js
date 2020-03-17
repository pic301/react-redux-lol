const express = require('express')

const router = express.Router()


const { User } = require("./models/User");
const { auth } = require('./middleware/auth')




// ========================================
//                user
// ========================================

router.get("/auth", auth, (req, res) => {
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

router.post("/register", (req, res) => {
  const user = new User(req.body);
  // 유저정보를 저장하기전엠 암호화

  user.save((err, userInfo) => {
    if (err) return res.json({ success: true, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/login", (req, res) => {
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

router.get('/logout',auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
        success: true
    });
});
});

router.post('ite/favoriteNumber', (req, res) => {

  //mongoDB에서   favorite 숫자를 가져오기 
  Favorite.find({ "championId": req.body.championId })
      .exec((err, info) => {
          if (err) return res.status(400).send(err)
          // 그다음에   프론트에  다시   숫자 정보를 보내주기  
          res.status(200).json({ success: true, favoriteNumber: info.length })
      })

})



module.exports = router;