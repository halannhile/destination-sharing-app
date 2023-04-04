import React from 'react'

import './Input.css'

function Input(props) {
    // if element is input, return <input/>, else return <textarea/>
    const element = props.element === 'input' ? (
            <input id={props.id} type={props.type} placeholder={props.placeholder}/> 
        ) : (
            // if props.rows is not available, default value is 3
            <textarea id={props.id} rows={props.rows || 3} />
        );
        
    return (
        <div className={`form-control`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    )
}

export default Input