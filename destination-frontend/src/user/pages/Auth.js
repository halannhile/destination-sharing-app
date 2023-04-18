import React, {useState} from 'react'
import { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './UserAuthForm.css'

function Auth() {

  const auth = useContext(AuthContext)

  // login state: 
  const [isLoginMode, setIsLoginMode] = useState(true);

 // these info we get from the useForm custom hook we create
 const [formState, inputHandler, setFormData] = useForm(
  {
  // initial state of email
  email: {
      value: '',
      isValid: false
  },
  // initial state of password
  password: {
      value: '',
      isValid: false
  }
  },
  // initial form validity: 
  false
);

const switchModeHandler = () => {
  // we're in login mode: only need to check validity of email and pw
  if (!isLoginMode) {
    setFormData({
      // copying all fields, overwriting name to undefined as login mode doesn't need
      ...formState.inputs,
      name: undefined
    }, formState.inputs.email.isValid && formState.inputs.password.isValid)
  } 

  // we're not in login mode: overall form validity is false initially
  else {
    setFormData({
      ...formState.inputs,
      name: {
        value: '',
        isValid: false
      }
    }, false)
  }

  setIsLoginMode(prevMode => !prevMode);
}

const authSubmitHandler = event => {
  event.preventDefault();
  console.log(formState.inputs); // will later send this to the backend
  auth.login();
}

return (
<Card className="user-auth-form__card">
<h2 className="user-auth-form__header center">LOG IN TO YOUR ACCOUNT</h2>

<hr/>

<form onSubmit={authSubmitHandler}>

  {!isLoginMode && (
    <Input 
      element="input" 
      id="name" 
      type="text" 
      label="Your Name" 
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Name must not be blank"
      onInput={inputHandler} /> )}

  {/* if don't specify element="input", Input.js will render <textarea/> instead of <input/> */}
  <Input 
    id="email"
    element="input" 
    type="email" 
    label="Email"
    validators={[VALIDATOR_EMAIL()]}
    errorText="Please enter a valid email address" 
    onInput={inputHandler} />

  <Input 
    id="password"
    element="input" 
    type="text"  
    label="Password"
    validators={[VALIDATOR_MINLENGTH(8)]}
    errorText="Please enter a valid password (at least 8 characters)" 
    onInput={inputHandler} />

  {/* button is disabled when form is invalid */}
  <Button type="submit" disabled={!formState.isValid}>
    {isLoginMode ? 'LOG IN' : 'SIGN UP'}
  </Button>

</form>
<br/>
<Button inverse onClick={switchModeHandler}>
  SWITCH TO {isLoginMode ? 'SIGN UP' : 'LOG IN'}
</Button>

</Card>
)
}

export default Auth