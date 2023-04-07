import React, { useReducer } from 'react';

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
                ...state,
                value: action.val,
                isValid: true,
            };
        default: 
            return state;
    }
};

function Input(props) {

    // initialization: value to '' and isValid to false
    // output: initial state, and the dispatch function to change this state
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '', 
        isValid: false})

    const changeHandler = event => {

        // UPDATING THE STATE:
        // event: what we automatically get from onChange
        dispatch({type:'CHANGE', val: event.target.value});
    };


    // if element is input, return <input/>, else return <textarea/>
    const element = props.element === 'input' ? (
            <input 
                id={props.id} 
                type={props.type} 
                placeholder={props.placeholder}

                // changeHandler will be called on every keystroke
                onChange={changeHandler}
               
                // 2-way binding
                value={inputState.value}/> 
        ) : (
            // if props.rows is not available, default value is 3
            <textarea 
                id={props.id} 
                rows={props.rows || 3}
                onChange={changeHandler}
                value={inputState.value} />
        );
    
    
        
    return (
        // conditional className: adding 'form-control--invalid' to input className if isValid is false
        <div className={`form-control 
            ${!inputState.isValid && 'form-control--invalid'}`}>

            <label htmlFor={props.id}>{props.label}</label>
            {element}

            {/* if isValid is false, then return error text */}
            {!inputState.isValid && 
                <p>{props.errorText}</p>}

        </div>
    )
}

export default Input