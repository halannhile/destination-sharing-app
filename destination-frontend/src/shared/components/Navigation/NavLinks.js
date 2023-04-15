import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'
import './NavLinks.css'


function NavLinks(props) {
    // auth holds isLoggedIn property, login method and logout method
    const auth = useContext(AuthContext)
    return (
        <ul className="nav-links">

            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>

            {/* only show MY PLACES when user is logged in */}
            {auth.isLoggedIn && 
                <li>
                    <NavLink to="/u1/places">MY PLACES</NavLink>
                </li>
            }        

            {/* only show ADD PLACE when user is logged in */}
            {auth.isLoggedIn &&             
                <li>
                    <NavLink to="/places/new">ADD PLACE</NavLink>
                </li>
            }

            {/* only show AUTHENTICATE when user is NOT logged in */}
            {!auth.isLoggedIn &&
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
            }

        </ul>
    )
}

export default NavLinks