import React, { useCallback } from 'react'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './NewPlace.css'

function NewPlace() {

  const titleInputHandler = useCallback((id, value, isValid) => {
    }, []);

  const descriptionInputHandler = useCallback((id, value, isValid) => {
    }, []);

  return (
    <form className="place-form">

      {/* if don't specify element="input", Input.js will render <textarea/> instead of <input/> */}
      <Input 
        id="title"
        element="input" 
        type="text" 
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid input" 
        onInput={titleInputHandler} />

      <Input 
        id="description"
        element="textarea" 
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)." 
        onInput={descriptionInputHandler} />

    </form>
    
  )
}

export default NewPlace

