import React from 'react'

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import './UserAuthForm.css';

function UserAuth() {

    // these info we get from the useForm custom hook we create
    const [formState, inputHandler] = useForm(
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

    const userSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // will later send this to the backend
    }

  return (
    <form className="user-auth-form" onSubmit={userSubmitHandler}>

      {/* if don't specify element="input", Input.js will render <textarea/> instead of <input/> */}
      <Input 
        id="email"
        element="input" 
        type="text" 
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
      <Button type="submit" disabled={!formState.isValid}>LOG IN</Button>

    </form>
  )
}

export default UserAuth