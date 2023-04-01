import React from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

// to make things clickable
import { Link } from 'react-router-dom';

import './MainNavigation.css';

function MainNavigation(props) {
  return (
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
        <nav>
            <NavLinks/>
        </nav>
    </MainHeader>
  )
}

export default MainNavigation