import React from 'react'

import Input from '../../shared/components/FormElements/Input'
import './NewPlace.css'

function NewPlace() {
  return (
    <form className="place-form">

      {/* if don't specify element="input", Input.js will render <textarea/> instead of <input/> */}
      <Input element="input" type="text" label="Title" />
    </form>
  )
}

export default NewPlace