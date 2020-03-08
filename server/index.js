const express = require("express");
const app = express();
const port = 5000; //백엔드 서버
const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

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

app.get("/", (req, res) => res.send("hello"));

app.post("/register", (req, res) => {
  const user = new User(req.body);
  // 유저정보를 저장하기전엠 암호화

  user.save((err, userInfo) => {
    if (err) return res.json({ success: true, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", (req, res) => {
  //요청된 email을 데이터베이스에서 찾기 찾기
  User.findOne({ email: req.body.eamil }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: " 찾고자 하는 이메일이 없습니다."
      });
    }
  });

  //이메일 있다면비밀번호 같은지 확인
  user.comparePassword(req.body.password, (err, isMatch) =>{
     if(!isMatch)
     return res.json({ loginSuccess: false, message:"비밀번호가 맞지 않습니다."})
  })
  // 비밀번호 까지 맞다면 토큰생성

  user.generateToken((err, user) =>{

  })
});

app.listen(port, () => console.log(`${port}`));
