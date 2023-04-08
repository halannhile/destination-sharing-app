import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';


function NewPlace() {

  // these info we get from the useForm custom hook we create
  const [formState, inputHandler] = useForm(
    {
      // initial state of title
      title: {
        value: '',
        isValid: false
      },
      // initial state of description
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    // initial form validity: 
    false
  );

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // will later send this to the backend
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>

      {/* if don't specify element="input", Input.js will render <textarea/> instead of <input/> */}
      <Input 
        id="title"
        element="input" 
        type="text" 
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid input" 
        onInput={inputHandler} />

      <Input 
        id="description"
        element="textarea" 
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)." 
        onInput={inputHandler} />

      <Input 
        id="address"
        element="input" 
        label="Address"
        // we'll later check if the address exists through the backend
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address." 
        onInput={inputHandler} />

      {/* button is disabled when form is invalid */}
      <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>

    </form>
    
  )
}

export default NewPlace

