import React from 'react'
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group'

import './SideDrawer.css'

function SideDrawer(props) {
  
  const content = 
    // note: 200 milliseconds animation, classNames with s
    <CSSTransition 
      in={props.show} 
      timeout={200} 
      classNames="slide-in-left"
      mountOnEnter
      mountOnExit
      >
    <aside className="side-drawer" onClick={props.onClick}>
       {props.children} 
    </aside>
    </CSSTransition>

  return (
    // tell React which content to render where
    ReactDOM.createPortal(
      content, 
      document.getElementById('drawer-hook'))
  )
}

export default SideDrawer