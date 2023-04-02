import React from 'react'
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group'

import Backdrop from './Backdrop'
import './Modal.css'

// this component is for internal use: 
function ModalOverlay(props) {
    const content = (
        // rendering a template literal `` here bc we want to use the modal className but also some other className as well
        <div 
            className={`modal ${props.className}`}
            style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>

            {/* preventDefault will make sure if we add a button, clicking on it won't submit the form by default*/}
            {/* we want to submit form by using our own submit function */}
            <form onSubmit={
                props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
            }>

                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>

                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>

            </form>
        </div>
    )

    return (
        ReactDOM.createPortal(content, document.getElementById('modal-hook'))
    )
  }


// this component is what we actually export: 
function Modal(props) {
  return (
    <React.Fragment>

        {/* if props.show is True then... */}
        {props.show && <Backdrop onClick={props.onCancel}/>}
        
        <CSSTransition 
            in={props.show}
            timeout={200}
            mountOnEnter
            unmountOnExit
            // classNames="modal" is from Modal.css
            classNames="modal">   

            {/* forward all the props we get from Modal(props) to ModalOverlay()*/}
            {/* these props come to Modal() from outside but Modal() doesn't need them */}
            {/* instead, the internal component ModalOverlay() needs them */}
            <ModalOverlay {...props}/>
            
        </CSSTransition>

    </React.Fragment>
  )
}

export default Modal