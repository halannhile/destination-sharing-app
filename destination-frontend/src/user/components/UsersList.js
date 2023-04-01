import React from 'react'

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css'

function UsersList(props) {

    if (props.items.lenght === 0) {
        return (
        
        // className="center" is from index.css
        <div className="center">
            <Card>
                <h2>No users found.</h2>
            </Card>
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