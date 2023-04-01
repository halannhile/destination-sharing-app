import React from 'react'

import './UsersList.css'
import UserItem from './UserItem';

function UsersList(props) {

    if (props.items.lenght === 0) {
        return (
        
        // className="center" is from index.css
        <div className="center">
            <h2>No users found.</h2>
        </div>
        );
    }

    return (
    
    // unordered list: 
    <ul className="users-list">
        {props.items.map(user => (
            <UserItem 

                // key is needed to make unordered lists work fine
                key={user.id} 

                // props we pass to UserItem:
                id={user.id} 
                image={user.image} 
                name={user.name} 
                placeCount={user.places}/>
        ))}

    </ul>);

}

export default UsersList