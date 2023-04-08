import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

// set up the useReducer() function outside component's function
// because it's not dependent on any component input

// this function takes in the current state and an action to dispatch
// this function always returns a new state and a dispatch function

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': 
            // using spread operator here to copy all key-pair values of the old state
            // but it can also overwrite selected keys/values
            return {

                // in ...state, there will be isTouched state
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case 'TOUCH': 
            return {
            ...state,
            isTouched: true};

        default: 
            return state;
    }
};

function Input(props) {

    // initialization: value to '' and isValid to false
    // output: initial state, and the dispatch function to change this state
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '', 
        isTouched: false,
        isValid: props.valid || false})

    const { id, onInput }= props;
    const { value, isValid } = inputState;

    useEffect(() => {
        // pass these back to NewPlace
        props.onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    const changeHandler = event => {

        // UPDATING THE STATE:
        // event: what we automatically get from onChange
        dispatch({
            type:'CHANGE', 
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }


    // if element is input, return <input/>, else return <textarea/>
    const element = props.element === 'input' ? (
            <input 
                id={props.id} 
                type={props.type} 
                placeholder={props.placeholder}

                // changeHandler will be called on every keystroke
                onChange={changeHandler}

                // onBlur handle: when user loses focus on element
                onBlur={touchHandler}
               
                // 2-way binding
                value={inputState.value}/> 
        ) : (
            // if props.rows is not available, default value is 3
            <textarea 
                id={props.id} 
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value} />
        );
    
    
        
    return (
        // conditional className: adding 'form-control--invalid' to input className if isValid is false
        // throw error when the input is invalid AND isTouched = true (i.e. use's been able to input something)
        
        <div className={`form-control 
            ${!inputState.isValid && inputState.isTouched && 
            'form-control--invalid'}`}>

            <label htmlFor={props.id}>{props.label}</label>
            {element}

            {/* if isValid is false, then return error text */}
            {!inputState.isValid && inputState.isTouched &&
                <p>{props.errorText}</p>}

        </div>
    )
}

export default Input