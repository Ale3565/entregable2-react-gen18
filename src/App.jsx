import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import clearsky from "./assets/01d.jpg"



function App() {

  const [latlon, setLatlon] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 2000)
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setLatlon(obj)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

 


  return (

    <div className="App" style={{
      backgroundImage: `url(${clearsky})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: "cover"


    }}>
      {
        loading
          ?
          <div className="container">
            <div className="loader-container">
              <div className="spinner"></div>
              <span className='loading'>Loading...</span>
            </div>
          </div>
          :
          <Card
            lat={latlon?.lat}
            lon={latlon?.lon}
          />

      }
    </div>
  )
}

export default App
