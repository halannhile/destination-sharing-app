import { useReducer, useCallback } from "react";


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
  
export const useForm = () => {

}