import React from 'react';
import { useState } from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop'

// to make things clickable
import { Link } from 'react-router-dom';

import './MainNavigation.css';

function MainNavigation(props) {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () => {
        setDrawerIsOpen(true)
    }
    
    const closeDrawer = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
            {drawerIsOpen && (
            <SideDrawer>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks/>
                </nav>
            </SideDrawer>) 
            }

            <MainHeader>
                {/* burger button to open side drawer */}
                <button className="main-navigation__menu-btn" onClick={openDrawer}>
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