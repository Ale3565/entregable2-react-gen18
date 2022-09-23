import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Card.css"


const Card = ({ lat, lon }) => {

    const [response, setResponse] = useState()
    const [isCelsius, setIsCelsius] = useState(true)

    //const celsiusTemp = ((response?.main.temp) - 273.15).toFixed(2)

    //const numberCelsiusTemp = parseInt(celsiusTemp)

    const [temp, setTemp] = useState()

    const changeValue = () => {
        /*if (temp == numberCelsiusTemp) {
            setTemp((numberCelsiusTemp * 9 / 5 + 32).toFixed(2))
        } else {
            setTemp(numberCelsiusTemp)
        }*/
        setIsCelsius(!isCelsius)
    }

    useEffect(() => {
        if (lat && lon) {
            const APIKey = "081b9b25949eab31306552737f899918"
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
            axios.get(URL)
                .then(res => {
                    setResponse(res.data)
                    const obj = {
                        celsius: (res.data.main.temp - 273.15).toFixed(2),
                        farenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2)
                    }
                    setTemp(obj)
                })
                .catch(err => console.log(err.message))
        }
    }, [lat, lon])

  

    // hay un array con los codigos de cada icono
    // existe una "response?.weather[0].icon" con el codigo de cada imagen
    // hay imagenes de nubes en jpg
    // retornar una variable que contenga la jpg

    
    return (
        <article className='card'>
            <header className='header'>
                <h1>Weather APP</h1>
                <h2>{`${response?.name}, ${response?.sys.country} `}</h2>
            </header>
            <div className='hero__container'>
                <div className='hero__container-mid'>
                    <div>
                        <img src={`http://openweathermap.org/img/wn/${response?.weather[0].icon}@4x.png`} alt={`${response?.name} ${response?.weather[0].main}`} />
                    </div>
                    <div className='list'>
                        <ul>
                            <span>{`"${response?.weather[0].description}"`
                            }</span>
                        </ul>
                        <div className='list__container'>
                            <ul className='list__item'>
                                <i className="fa-solid fa-wind"></i>
                                <li><span>Wind Speed: </span>{response?.wind.speed} m/s</li>
                            </ul>
                            <ul className='list__item'>
                                <i className="fa-solid fa-cloud"></i>
                                <li><span>Clouds: </span>{response?.clouds.all} %</li>
                            </ul>
                            <ul className='list__item'>
                                <i className="fa-solid fa-temperature-full"></i>
                                <li><span>Pressure: </span>{response?.main.pressure} mb</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='degrees__text'>
                    <h3 className='degrees__text-temp'>{isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F`}</h3>

                </div>
                <footer className='footer'>
                    <button onClick={changeValue}>{isCelsius ? "Change to Farenheit" : "Change to Celsius"}</button>
                </footer>
            </div>
        </article>
    )
}

export default Card