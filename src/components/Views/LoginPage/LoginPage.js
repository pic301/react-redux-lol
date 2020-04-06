import React,{useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../actions/user_actions'
import styled from 'styled-components'
import efdg from '../../../images/efdg.png'

const StyledWrapper = styled.div`
    display:flex;
    align-items:center;
    height:100vh;
`;

const Container = styled.div`
  position: relative;
  background-color: #FFFFFF;
  width: 400px;
  height: 400px;
  margin: 1rem auto;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  & > form{
    padding-top: 40px;
  }
  @media (max-width: 600px) {
  .Container {
      border-radius: 0px;
  }
}
`;
const LoginTitle = styled.p`
  color: #8C55AA;
  font-weight: bold;
  font-size: 23px;
  padding-top: 40px;
  text-align:center;
`;
const StyledInput = styled.input`
width: 76%;
color: rgb(38, 50, 56);
font-weight: 700;
font-size: 14px;
letter-spacing: 1px;
background: rgba(136, 126, 126, 0.04);
padding: 10px 20px;
border: none;
border-radius: 20px;
outline: none;
box-sizing: border-box;
border: 2px solid rgba(0, 0, 0, 0.02);
margin-bottom: 50px;
margin-left: 46px;
text-align: center;
margin-bottom: 27px;
font-family: 'Ubuntu', sans-serif;
`;
const LoginButton = styled.button`
    cursor: pointer;
    border-radius: 5em;
    color: #fff;
    background: linear-gradient(to right, #9C27B0, #E040FB);
    border: 0;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 10px;
    padding-top: 10px;
    font-family: 'Ubuntu', sans-serif;
    margin-left: 35%;
    font-size: 13px;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
    text-align:center;
`;

const StyledLoginText = styled.p`
  text-align:center;
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: #E1BEE7;
  padding-top: 15px;
`;
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
    <StyledWrapper >
      <Container>
        <img style={{position:"absolute",width:"200px", top:"-170px",right:"30%"}} src={efdg} alt="champion"/>
        <LoginTitle class="sign">LOGIN</LoginTitle>
        <form>
          <StyledInput
            type="email"
            onChange={onChangeEmail}
            value={email}
            placeholder="UserEmail"
          />
          <StyledInput
            type="password"
            onChange={onChangePassword}
            value={password}
            placeholder="Password"
          />
          <LoginButton type="submit" name="action" onClick={onSubmit}>
            로그인
          </LoginButton>
          <StyledLoginText>Forgot Password?</StyledLoginText>
          <StyledLoginText>아직 
            <Link to="/register"><span style={{color:"#8C55AA"}}>회원가입</span></Link>중이 아니신가요?
            </StyledLoginText>
        </form>
      </Container>
    </StyledWrapper>
  );
};

export default LoginPage;
