import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css'


// array of places
const DUMMY_PLACES = [
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrappers in the world',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        // lat and long can be extracted from google maps link: https://www.google.com/maps/d/u/0/viewer?mid=1qqg24F8Al_Uq2Bieu9cDHur_Cas&hl=en_US&ll=40.74849200000003%2C-73.985699&z=17
        // or can also right click on the point on Google Maps
        location: {
            lat: 40.7484405,
            lng: -73.9878584
          },
          creator: 'u2'
    },
    {
        id: 'p1',
        title: 'Sydney Opera House',
        description: 'An icon of Sydney, Australia. The Sydney Opera House is one of the most distinctive architecture of the 20th century.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Sydney_Australia._%2821339175489%29.jpg',
        address: 'Bennelong Point, Sydney NSW 2000, Australia',
        location: {
            lat: -33.85662900846622, 
            lng: 151.21531387971248
        },
        creator: 'u1'
      }
]

function UpdatePlace() {

    // page is loading when identifiedPlace has not been found yet
    const [isLoading, setIsloading] = useState(true)

    const placeId = useParams().placeId;


    // first, initialize forms with '' for title and description, and isValid to false
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '', 
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }

        // overall form validity
    }, false)

    // filter out the place we want to update from DUMMY_PLACES array
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    // reinitialize form's fields with info from identifiedPlace
    useEffect(() => {
        
        setFormData({
            title: {
                value: identifiedPlace.title, 
                isValid: true
            },
            description: {
                value: identifiedPlace.description,
                isValid: true
            }
        }, true);

        setIsloading(false);

        // because identifiedPlace doesn't change whenever UpdatePlace reruns, it won't trigger useEffect again
        // seFormData won't change also because in form-hook, it's wrapped in useCallback
    }, [setFormData, identifiedPlace])

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedPlace) {
        return <div className="center">
            <h2>Could not find place!</h2>
        </div>
    }

    if (isLoading) {
        return <div className="center">
            <h2>Loading...</h2>
        </div>
    }
    
    return (
        // if place is found, load form with prefilled info of that place
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>

            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                
                // using outputs from custom hook useForm
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />

            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)"
                
                // using outputs from custom hook useForm
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />

            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>

        </form>
    )
}

export default UpdatePlace