import React from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

// to make things clickable
import { Link } from 'react-router-dom';

import './MainNavigation.css';

function MainNavigation(props) {
  return (
    <React.Fragment>
        
        <SideDrawer>
            <nav className="main-navigation__drawer-nav">
                <NavLinks/>
            </nav>
        </SideDrawer>

        <MainHeader>
            <button className="main-navigation__menu-btn">
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main-navigation__title">
                {/* always navigate back to home page when clicking on name of the app YourDestinations */}
                <Link to="/">YourDestinations</Link>
            </h1>
            <nav className="main-navigation__header-nav">
                <NavLinks/>
            </nav>
        </MainHeader>

    </React.Fragment>
  )
}

export default MainNavigation