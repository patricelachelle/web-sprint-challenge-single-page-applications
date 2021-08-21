import React, { useState, useEffect } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Form from './Form'
import Home from './Home'
import Pizza from './Pizza'
import PizzasList from './PizzasList'
import './App.css';
import data from './data'

function fetchStock() {
  // fetchStock simulates getting data through axios.get(<URL>)
  return Promise.resolve({ success: true, data })
}

function App() {

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

export default App;