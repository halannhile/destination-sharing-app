import React, { useCallback, useReducer } from 'react'

import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import './NewPlace.css'

const formReducer = (state, action) => {
  switch(action.type) {
    case 'INPUT_CHANGE':
      
      // helper variable: 
      let formIsValid = true;
      for (const inputId in state.inputs) {

        // this logic makes sure we always take the previous value of formIsValid
        // and combine it with the new validity value
        // false+false=false, false+true=false, true+true=true
        // so, if either Title or Description field is invalid, form is invalid
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        
        inputs: {
          ...state.inputs,
          // dynamic assignment: if we dispatch an action with inputId="Title"
          // then we'll only update Title with new value and validity
          // while leaving description untouched
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },

        // overall form validity 
        isValid: formIsValid
      };

    default: 
      return state;
  }
};


function NewPlace() {

  const [formState, dispatch] = useReducer(formReducer, {

    // initial state of inputs, which contain title and description
    inputs: {

      // initial state of title
      title: {
        value: '',
        isValid: false
      },

      // initial state of description
      description: {
        value: '',
        isValid: false
      }
    },

    // initial overall state of form
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE', 
      inputId: id, 
      value: value, 
      isValid: isValid});
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
        onInput={inputHandler} />

      <Input 
        id="description"
        element="textarea" 
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)." 
        onInput={inputHandler} />

    </form>
    
  )
}

export default NewPlace

