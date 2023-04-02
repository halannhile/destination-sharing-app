import React from 'react'
import { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import './PlaceItem.css'

function PlaceItem(props) {

    // init false because we don't want to show the map at first
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);


  return (
    <React.Fragment>

     <Modal 
        show={showMap} 
        onCancel={closeMapHandler} // close map when click on backdrop
        header={props.address} 
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>} // close map when click on the footer's button
    >
        {/* this is for {props.children in ModalOverlay()} */}
        <div className="map-container">
            <Map 
                center={props.coordinates}
                zoom={16}/>
        </div>

    </Modal>  

    <li className="place-item">

        <Card className="place-item__content">

        <div className="place-item__image">
            <img src={props.image} alt={props.title}/>
        </div>

        <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
        </div>
        
        <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
        </div>
        
        </Card>

    </li>

    </React.Fragment>
  )
}

export default PlaceItem