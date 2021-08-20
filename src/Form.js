import React, { useState, useEffect } from 'react';
import * as yup from 'yup'

import axios from 'axios'

export default function Form() {

    const [formState, setFormState] = useState({
        name: '',
        size: '',
        pepperoni: false || true,
        sausage: false || true,
        cheese: false || true,
        veggie: false || true,
        special: ''

    })
    const [serverError, setServerError] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [errors, setErrors] = useState({
        name: '',
        size: '',
        pepperoni: false || true,
        sausage: false || true,
        cheese: false || true,
        veggie: false || true,
        special: ''
    })

    const [post, setPost] = useState([]);

    const validateChange = (event) => {
      yup
       .reach(formSchema, event.target.name)
       .validate(event.target.type === 'checkbox' ? event.target.checked : event.target.value)
       .then(() => {
           setErrors({ ...errors, [event.target.name]: ''})
       })
       .catch((err) => {
           console.log('err', err);
           setErrors({ ...errors, [event.target.name]: err.errors[0] })
       })
   }
   const formSubmit = (event) => {
       event.preventDefault();
       axios
         .post('https://reqres.in/api/orders', formState)
         .then((response) => {
             setPost(response.data);
             setServerError(null);
             setFormState({
                name: '',
                size: '',
                pepperoni: false || true,
                sausage: false || true,
                cheese: false || true,
                veggie: false || true,
                special: ''
             })
         })
         .catch(() => {
             setServerError('Error Message')
         })
   }
   const inputChange = (event) => {
       event.persist();
       const newFormState = {
           ...formState,
           [event.target.name]:
            event.target.type === 'checkbox' ? event.target.checked : event.target.value
       }
       validateChange(event); 
       setFormState(newFormState) 
   };
   const formSchema = yup.object().shape({
        name: yup.string().required('name must be at least 2 characters').min(2),      
        size: yup
            .string()
            .oneOf(['Personal', 'Small', 'Medium', 'Large']), 
        pepperoni: yup.boolean().oneOf([false, true]),
        sausage: yup.boolean().oneOf([false, true]),
        cheese: yup.boolean().oneOf([false, true]),
        veggie: yup.boolean().oneOf([false, true]),
        special: yup.string()      
   })
   useEffect(() => {
       formSchema.isValid(formState).then((valid) => {
           console.log('Is form valid?', valid)
           setButtonDisabled(!valid) 
       })
   }, [formState, formSchema])
   console.log('formState', formState)
   return (
       <form id ='pizza-form' onSubmit={formSubmit}>
           {serverError && <p className='error'>{serverError}</p>}
           <label>
               Name
                <input 
                id='name-input' 
                type='text' 
                name='name' 
                data-cy='name'
                value={formState.name}
                onChange={inputChange}
            />
            {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
           </label>
           
           <label>
               Size
                <select
                 id='size-dropdown'
                 name='size'
                 data-cy='size'
                 value={formState.size}
                 onChange={inputChange}
                 >
                  <option value=''>--Choose One--</option>
                  <option value='Personal'>Personal</option>
                  <option value='Small'>Small</option>
                  <option value='Medium'>Medium</option>
                  <option value='Large'>Large</option>
                 </select>
           </label>
           
           <label>
               <input
                 type='checkbox'
                 id='pepperoni'
                 name='pepperoni'
                 data-cy='pepperoni'
                 checked={formState.pepperoni}
                 onChange={inputChange}
            />
                 Pepperoni
           </label>

           <label>
               <input
                 type='checkbox'
                 id='sausage'
                 name='sausage'
                 data-cy='sausage'
                 checked={formState.sausage}
                 onChange={inputChange}
            />
                 Sausage
           </label>

           <label>
               <input
                 type='checkbox'
                 id='cheese'
                 name='cheese'
                 data-cy='cheese'
                 checked={formState.cheese}
                 onChange={inputChange}
            />
                 Cheese
           </label>

           <label>
               <input
                 type='checkbox'
                 id='veggie'
                 name='veggie'
                 data-cy='veggie'
                 checked={formState.veggie}
                 onChange={inputChange}
            />
                 Veggie
           </label>

           <label>
                <input 
                id='special-text' 
                type='text' 
                name='special' 
                data-cy='special-text'
                value={formState.special}
                onChange={inputChange}
            />
                 Special
           </label>
           
           <button data-cy='submit' id='order-button'  type='submit' disabled={buttonDisabled}>Submit</button>

           <pre>{JSON.stringify(post, null, 2)}</pre>
       </form>
   )
}