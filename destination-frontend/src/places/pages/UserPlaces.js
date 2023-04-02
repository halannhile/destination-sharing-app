import React from 'react'

import PlaceList from '../components/PlaceList'

// array of places
const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrappers in the world',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        // lat and long can be extracted from google maps link: https://www.google.com/maps/d/u/0/viewer?mid=1qqg24F8Al_Uq2Bieu9cDHur_Cas&hl=en_US&ll=40.74849200000003%2C-73.985699&z=17
        location: {
            lat: 40.7484405,
            lng: -73.9878584
          },
          creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
          lat: 40.7484405,
          lng: -73.9878584
        },
        creator: 'u2'
      }
]

function UserPlaces() {
  return (
    <PlaceList items={DUMMY_PLACES}/>
  )
}

export default UserPlaces