import React from 'react'
import { useHistory } from 'react-router-dom'


export default function Home() {
    const history = useHistory()
    const routeToShop = () => {
    console.log(history)
    history.push('pizzas-list')
  }

  return (
    <div className='home-wrapper'>
      <img
        className='home-image'
        src='https://media.istockphoto.com/photos/homemade-veggie-pizza-with-mushrooms-peppers-picture-id842082336'
        alt=''
      />
      <button
        id = 'order-pizza'
        onClick={routeToShop}
        className='md-button shop-button'
      >Buy Now</button>
    </div>
  )
}