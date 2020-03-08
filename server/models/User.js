const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})

userSchema.pre('save', function( next ) {
    var user = this;
    //비밀번호가 변경될때만 암호화 해준다 
    if(user.isModified('password')){    
        console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            
            //userSchema에서 생성한 password 넣어준다
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
        //비밀번호 변경아니라면 넥스트를 해줘서 바로 넘어간다
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword,this.password, function(err, isMatch ){
        if(err) return cb(err),
        cb(null,isMatch)
    })
}

const User = mongoose.model('User', userSchema )

module.exports = { User }