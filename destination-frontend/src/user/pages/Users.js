import React from 'react'

import UsersList from '../components/UsersList'

function Users() {

  const USERS = [{id: 'u1', name: 'Nhi Le', image: 'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon', places: 3 }];

  return (
    <UsersList items={USERS}/>
  )
}

export default Users