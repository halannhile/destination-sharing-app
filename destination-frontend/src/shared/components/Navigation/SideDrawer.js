import React from 'react'
import ReactDOM from 'react-dom';

import './SideDrawer.css'

function SideDrawer(props) {
  
  const content = 
    <aside className="side-drawer">
       {props.children} 
    </aside>

  return (
    // tell React which content to render where
    ReactDOM.createPortal(
      content, 
      document.getElementById('drawer-hook'))
  )
}

export default SideDrawer