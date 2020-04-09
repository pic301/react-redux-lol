import React,{ useState } from "react";
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../actions/user_actions'
import styled from 'styled-components'


const StyledWrapper = styled.div`
    display:flex;
    align-items:center;
    height:100vh;
`;

const Container = styled.div`
  position: relative;
  background-color: #FFFFFF;
  width: 400px;
  height: 600px;
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
const RegisterTitle = styled.p`
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
const RegisterButton = styled.button`
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


const RegisterPage = () => { 

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const onChangeEmail = (e) =>{
    setEmail(e.target.value)
  }
  const onChangePassword = (e) =>{
    setPassword(e.target.value)
}
const onChangePasswordCheck = (e) =>{
    setPasswordCheck(e.target.value)
}
const onChangeName = (e) =>{
    setName(e.target.value)
}
  const subminForm = (e) =>{
    e.preventDefault()

    let dataToSubmit = {
        name:name,
        email:email,
        password:password,
        passwordCheck:passwordCheck,
    }
    console.log(dataToSubmit)
    dispatch(registerUser(dataToSubmit)).then(res =>{
        console.log(res)
        }) 
  } 
  return( 
  <div>
    <StyledWrapper >
      <Container>
        <RegisterTitle class="sign">회원가입</RegisterTitle>
        <form>
          <StyledInput
            type="text"
            onChange={onChangeName}
            value={name}
            placeholder="Name"
          />
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
          <StyledInput
            type="password"
            onChange={onChangePasswordCheck}
            value={passwordCheck}
            placeholder="PasswordCheck"
          />
          <RegisterButton type="submit" name="action" onClick={subminForm}>
            등록
          </RegisterButton>
        </form>
      </Container>
    </StyledWrapper>
  </div>
  )
};

export default RegisterPage;
