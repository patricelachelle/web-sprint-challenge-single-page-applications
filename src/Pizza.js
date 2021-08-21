import React from 'react'
import { useParams, NavLink, useRouteMatch, Route } from 'react-router-dom'
import Form from './Form'

export default function Pizza(props) {
  const { pizzas } = props
  const { url, path } = useRouteMatch()

  console.log('url', url)
  console.log('path', path)

  const { pizzaID } = useParams()
  const pizza = pizzas.find((pizza) => {
    return pizza.id === pizzaID
  }) || {}
  
  return (
    <div className='item-wrapper'>
      <div className='item-header'>
        <div className='image-wrapper'>
          <img src={pizza.imageUrl} alt={pizza.name} />
        </div>
        <div className='item-title-wrapper'>
          <h2>{pizza.name}</h2>
          <h4>{pizza.price}</h4>
        </div>
      </div>

      <nav className='item-sub-nav'>
    
      <NavLink to={`${url}/pizza-form`}>Order Form</NavLink>
      </nav>

      <Route path={`${path}/pizza-form`}>
        <Form />
      </Route>

    </div>
  )
}