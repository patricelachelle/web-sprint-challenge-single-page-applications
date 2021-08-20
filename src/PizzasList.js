import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function ItemsList(props) {
  const { pizzas } = props
  const { url } = useRouteMatch()

  return (
    <div className='items-list-wrapper'>
      {pizzas.map(pizza => (
        <div
          className='item-card'
          key={pizza.id}
        >
          <Link to={`${url}/${pizza.id}`}>
          <img
            className='items-list-image'
            src={pizza.imageUrl}
            alt={pizza.name}
          />
          <p>{pizza.name}</p>
          </Link>
          <p>{pizza.price}</p>
        </div>
      ))}
    </div>
  )
}
