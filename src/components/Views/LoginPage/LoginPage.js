import React,{useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../actions/user_actions'

const LoginPage = ({history}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = e => {
    setEmail(e.target.value);
    console.log(email)
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
    console.log(password)
  };
  const onSubmit = e => {
    e.preventDefault();
    
    let dataToSubmit = {
        email:email,
        password:password
    }

    dispatch(loginUser(dataToSubmit)).then(res =>{
      if (res.payload.loginSuccess) {
        window.localStorage.setItem('userId', res.payload.userId);
       history.push("/");
      } else {
        
      }})
  }; 

  return (
    <div>
      <form >
        <input type="email" onChange={onChangeEmail} value={email} />
        <input type="password" onChange={onChangePassword} value={password} />
        <button type="submit" name="action" onClick={onSubmit}>로그인</button>
        <Link to="/register">
        <button name="action" onClick={onSubmit}>회원가입</button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
