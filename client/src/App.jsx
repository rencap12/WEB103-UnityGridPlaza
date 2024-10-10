import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations.jsx'
import LocationEvents from './pages/LocationEvents.jsx'
import Events from './pages/Events.jsx'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/centralpark',
      element: <LocationEvents index={1} />
    },
    {
      path: '/la',
      element: <LocationEvents index={2} />
    },
    {
      path: '/lourve',
      element: <LocationEvents index={3} />
    },
    {
      path: '/miami',
      element: <LocationEvents index={4} />
    },
    {
      path: '/events',
      element: <Events />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
          
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App