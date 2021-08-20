import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Form from './Form'
import Pizza from './Pizza'
import PizzasList from './PizzasList'
import './App.css';
import data from './data'

function fetchStock() {
  // fetchStock simulates getting data through axios.get(<URL>)
  return Promise.resolve({ success: true, data })
}

export default function App() {

  const [stock, setStock] = useState([])

  useEffect(() => {
    fetchStock().then(res => setStock(res.data))
  }, [])

  return (
    <div className="App">
    <nav>
        <h1 className='store-header'>Lambda Eats</h1>
        <div className='nav-links'>
          
          <Link to='/'>Home</Link>
          <Link to='/pizzas-list'>Pizza</Link>
        </div>
      </nav>

    
      <Switch>

      <Route path={'/pizzas-list/:pizzaID'}>
        <Pizza pizzas={stock}/>
      </Route>

      <Route path='/pizzas-list'>
        <PizzasList pizzas={stock}/>
      </Route>

      <Route path='/'>
        <Home />
      </Route>

    
      <Route path='/pizza'>
        <Form />
      </Route>
         
      </Switch>
     
    </div>
  );
}

function Home() {
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