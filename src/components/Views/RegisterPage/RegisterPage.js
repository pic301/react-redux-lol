import React,{ useState, useCallback } from "react";
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../actions/user_actions'
import styled from 'styled-components'
import { Alert} from 'react-bootstrap'
import { palette } from '../../../lib/styles/palette'


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
const StyledErrorMessage = styled.div`
    color:${palette.red[7]};
    text-align:center;
    margin-top:20px;
    font-size: 1rem;
    font-weight: bold;
`;
const StyledAlert = styled(Alert)`
  /* style={{textAlign:"center",width:"70%",margin:"0 auto"}} */
  text-align:center;
  width: 70%;
  margin: 0 auto;
`;


const RegisterPage = () => { 

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
 
  const emailregexp= (
    /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/
  );

  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangePasswordCheck = e => {
    setPasswordCheck(e.target.value);
  };

  const onChangeName = useCallback(e => {
    let name = e.target.value;
    setName(e.target.value);
    if (name && name.length > 2) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  }, []);

  const onChangeEmail = useCallback(
    e => {
      let email = e.target.value;
      if (email === "" || emailregexp.test(email)) {
        setEmail(email);
        setIsEmailValid(true);
      } else {
        setEmail(email);
        setIsEmailValid(false);
      }
    },
    [emailregexp]
  );

  const subminForm = e => {
    e.preventDefault();
    if(!name || !email || !password || !passwordCheck){
      return
    }

    if (password !== passwordCheck) {
      return setErrorMessage('비밀번호가 일치하지 않습니다');
    }

    let dataToSubmit = {
      name: name,
      email: email,
      password: password,
      passwordCheck: passwordCheck
    };
    if(isNameValid && isEmailValid){
      dispatch(registerUser(dataToSubmit)).then(res => {
      if(res.payload.err ){ setErrorMessage('이미 사용중인 계정입니다')}
    });
    }
  }; 

  const example =(valid,text) =>{
    return valid ? "" : <StyledAlert variant="warning">{text}</StyledAlert>;
  }
  return( 
  <div>
    <StyledWrapper >
      <Container>
        <RegisterTitle className="sign">회원가입</RegisterTitle>
        <form>
            <StyledInput
            type="text"
            onChange={onChangeName}
            value={name}
            placeholder="Name"
            required
          />{
              example(isNameValid,"이름은 2자 이상 이어야 합니다.")
            }
            <StyledInput
              type="email"
              onChange={onChangeEmail}
              value={email}
              placeholder="UserEmail"
              required
            />
            {
              example(isEmailValid,"올바른 이메일 형식이 아닙니다")
            }
          <StyledInput
            type="password"
            onChange={onChangePassword}
            value={password}
            placeholder="Password"
            required
          />
          <StyledInput
            type="password"
            onChange={onChangePasswordCheck}
            value={passwordCheck}
            placeholder="PasswordCheck"
            required
          />
          <RegisterButton type="submit" name="action" onClick={subminForm}>
            등록
          </RegisterButton>
        </form>
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      </Container>
    </StyledWrapper>
  </div>
  )
};

export default RegisterPage;
