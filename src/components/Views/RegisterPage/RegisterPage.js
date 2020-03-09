import React,{ useState } from "react";
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../actions/user_actions'

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
        // if(res.payload.success){

        // }else{

        // }
        }) 
  } 
  return( 
  <div>
      <form >
      <input type="text" onChange={onChangeName} value={name} />
      <input type="email" onChange={onChangeEmail} value={email} />
      <input type="password" onChange={onChangePassword} value={password} />
      <input type="password" onChange={onChangePasswordCheck} value={passwordCheck} />
      <button onClick={subminForm}></button>
      </form>
      
  </div>
  )
};

export default RegisterPage;
