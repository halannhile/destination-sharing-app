import React from 'react'

import './UsersLists.css'
import UserItem from './UserItem';

function UsersList(props) {
    if (props.items.lenght=0) {
        return (
        <div className="center">
            <h2>No users found.</h2>
        </div>
        )
    }

    return (
    
    // unordered list: 
    <ul>
        {props.items.map(user => {
            <UserItem 

                // key is needed to make unordered lists work fine
                key={user.id} 

                // props we pass to UserItem:
                id={user.id} 
                image={user.image} 
                name={user.name} 
                placeCount={user.places}/>
        })}
    </ul>

    )
}

export default UsersList