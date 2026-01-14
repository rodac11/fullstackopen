import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY

const Weather = ({weather}) => {
    if(weather) {
    return (
	<div>
	    <h2>Weather in {weather.cityname}</h2>
	    <p>Temperature {weather.tempC}</p>
	    <p>{weather.desc}</p>
	    <img src={`https://openweathermap.org/img/wn/${weather.imgId}@2x.png`}/>
	    <p>{weather.windSpeed} m/s</p>
	</div>
    )
    }
}

const Country = ({country, weather, toggleShow}) => {
    
    if (country.show) {
	const languages = Object.values(country.languages)
	return (
	<div>
	    <h1>{country.name.common}</h1>
	    <p>Region: {country.region}</p>
	    <p>Capital: {country.capital[0]}</p>
	    <p>Area: {country.area}</p>
	    <p>Population: {country.population}</p>
	    <h2>Languages</h2>
	    <ul>
		{
		    languages.map(n =>
			<li key={n}>{n}</li>
		    )}
	    </ul>
	    <img src={country.flags.svg}/>
	    <Weather weather={weather}/>
	</div>
	)
    }
    else return (
	<li>
	    {country.name.common} <button onClick={toggleShow}>show</button>				
	</li>
    )
}

const Results = ({countries, toggleShowOf, weather}) => {
    if (countries.length === 0) return ''
    
    if (countries.length === 1) {
	const singleCountry = countries[0]
	singleCountry.show = true
	return (<Country country={singleCountry} weather={weather}/>)
    }

    if (countries.length > 10) {
	return <p>Too many results, be more specific</p>
    } else if (countries.length !== 1) {
	return (
	    <div>{
		countries.map(country => (
		<Country key={country.name.common} country={country} toggleShow={() => toggleShowOf(country.name)}/>
	    ))

	    }
	    </div>
	)
    }
}

const App = () => {
    const [value, setValue] = useState('')
    const [country, setCountry] = useState(null)
    const [countries, setCountries] = useState([])
    const [city, setCity] = useState(null)
    const [weather, setWeather] = useState({})
    
    useEffect(() => {
	if (country) {
	    axios
		.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
		.then(response => {
		    const arr = response.data
				 .filter(n => n.name.common.toLowerCase().includes(country))
		    if (arr.length <= 10) {
			
			arr.map(n => (n.show = false))
			setCountries(arr)
			if (arr.length === 1)
			    setCity(arr[0].capital[0])
		    } else {
			setCountries(arr)
		    }
		})
	}		    
    }, [country])
    
    useEffect(() => {
	if (city) {
	    axios
		.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
		.then(response => {
		    const weatherObject = {
			cityname: city,
			tempC: (Math.round((response.data.main.temp - 273.15) * 100) / 100),
			desc: response.data.weather[0].description,
			imgId: response.data.weather[0].icon,
			windSpeed: response.data.wind.speed
		    }
		    setWeather(weatherObject)
		})
	}
    }, [city])

    const handleChange = (event) => {
	event.preventDefault()
	setValue(event.target.value)
    }

    const handleWeather = (weatherObj) => {
	setWeather(weatherObj)
    }
    
    const toggleShowOf = name => {
	const country = countries.find(n => n.name === name)
	const changedCountry = { ...country, show: !country.show}
	setCountries(countries.map( country => (country.name !== name ? country: changedCountry)))		    
    }

    const onSearch = () => {
	event.preventDefault()
	setCountry(value.toLowerCase())
    }

    return (
	<div>
	    <form onSubmit={onSearch}>
		find countries <input value={value}
				      onChange={handleChange} />
	    </form>
	    <Results countries={countries}
		     toggleShowOf={toggleShowOf}
		     weather={weather}
		     />
	</div>
    )
}

export default App
