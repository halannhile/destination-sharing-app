import React, { useRef, useEffect } from 'react'

import './Map.css'

function Map(props) {

    // this mapRef constant stores a pointer to the div below in Map()
    const mapRef = useRef();

    // object destructuring so we can pass these props from outside to the dependencies of useEffect
    // pulls keys and values out of props and store in new constant
    const { center, zoom } = props

    // useEffect function will rerun whenever the center or zoom dependency passed from outside changes
    useEffect(
        () => 
            {
                const map = new window.google.maps.Map(
                    mapRef.current,
                    // setting center and zoom through props will make them controllable from ourside this component
                    {center: center,
                    zoom: zoom});
            
                // render a marker in the center of our map
                new window.google.maps.Marker({
                    position: center, 
                    // the map constant created above
                    map: map
                })    
            }
        , [center, zoom]
    )

    

    return (
        <div 
            ref={mapRef}
            className={`map ${props.className}`} 
            style={props.style}>
        </div>
    )
}

export default Map