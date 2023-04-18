import React from 'react'
import { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import { AuthContext } from '../../shared/context/auth-context'
import './PlaceItem.css'

function PlaceItem(props) {

    // create auth object that uses useContext to listen to AuthContext
    const auth = useContext(AuthContext);

    // init false because we don't want to show the map at first
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);


    // modal to show DELETE warning message: 
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler= () => setShowConfirmModal(true);

    const cancelDeleteHandler = () => setShowConfirmModal(false);

    const confirmDeleteHandler = () => {
        // closing the warning dialogue box when use's confirmed delete
        setShowConfirmModal(false);
        console.log('DELETING...');
    }

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

    {/* modal for displaying DELETE warning message  */}
    <Modal 
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?" 
        footerClass="place-item__modal-actions" 
        footer={
            <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
            </React.Fragment>}>

        <p>Do you want to proceed to deleting this place? Please note that this cannot be undone.</p>
   
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
            
            <Button inverse onClick={openMapHandler}>
                VIEW ON MAP
            </Button>

            {auth.isLoggedIn && 
                <Button to={`/places/${props.id}`}>EDIT</Button>}
            
            {auth.isLoggedIn && 
                <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>} 

        </div>
        
        </Card>

    </li>

    </React.Fragment>
  )
}

export default PlaceItem