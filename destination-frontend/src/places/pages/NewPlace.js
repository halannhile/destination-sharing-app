import React, { useCallback } from 'react'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './NewPlace.css'

function NewPlace() {

  const titleInputHandler = useCallback((id, value, isValid) => {
    }, []);

  return (
    <form className="place-form">

      {/* if don't specify element="input", Input.js will render <textarea/> instead of <input/> */}
      <Input 
        element="input" 
        type="text" 
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid input" 
        onInput={titleInputHandler} />
    </form>
  )
}

export default NewPlace

