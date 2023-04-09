import React from 'react'
// like all hooks, the useParams hook is only usable in functional components
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

// array of places
const DUMMY_PLACES = [
    // {
    //     id: 'p2',
    //     title: 'Empire State Building',
    //     description: 'One of the most famous sky scrappers in the world',
    //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    //     address: '20 W 34th St, New York, NY 10001',
    //     // lat and long can be extracted from google maps link: https://www.google.com/maps/d/u/0/viewer?mid=1qqg24F8Al_Uq2Bieu9cDHur_Cas&hl=en_US&ll=40.74849200000003%2C-73.985699&z=17
    //     // or can also right click on the point on Google Maps
    //     location: {
    //         lat: 40.7484405,
    //         lng: -73.9878584
    //       },
    //       creator: 'u2'
    // },
    // {
    //     id: 'p1',
    //     title: 'Sydney Opera House',
    //     description: 'An icon of Sydney, Australia. The Sydney Opera House is one of the most distinctive architecture of the 20th century.',
    //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Sydney_Australia._%2821339175489%29.jpg',
    //     address: 'Bennelong Point, Sydney NSW 2000, Australia',
    //     location: {
    //         lat: -33.85662900846622, 
    //         lng: 151.21531387971248
    //     },
    //     creator: 'u1'
    //   }
]

function UserPlaces() {
    // useParams will return the :userId part from the Router for UserPlaces in App.js
    // which we can then use to filter out the places for this user
    const userId = useParams().userId;
    
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
        <PlaceList items={loadedPlaces}/>
    )
}

export default UserPlaces