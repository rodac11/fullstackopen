import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country, toggleShow}) => {
    const c = {
	name: country.name.common,
	region: country.region,
	area: country.area,
	population: country.population,
	languages: Object.values(country.languages),
	flag: country.flags.svg
    }
    if (country.show) {
	return (
	<div>
	    <h1>{c.name}</h1>
	    <p>Region: {c.region}</p>
	    <p>Area: {c.area}</p>
	    <p>Population: {c.population}</p>
	    <h2>Languages</h2>
	    <ul>
		{
		    c.languages.map(n =>
			<li key={n}>{n}</li>
		    )}
	    </ul>
	    <img src={c.flag}/>
	</div>
	)
    }
    else return (
	<li>
	    {c.name} <button onClick={toggleShow}>show</button>				
	</li>
    )
}

const Results = ({countries, toggleShowOf}) => {
    if (countries.length === 0) return ''
    if (countries.length === 1) {
	const singleCountry = countries[0]
	singleCountry.show = true
	return (<Country country={singleCountry}/>)
    }
    if (countries.length > 10) {
	return <p>Too many results, be more specific</p>
    } else if (countries.length !== 1) {
	console.log(countries.length)
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
    
    useEffect(() => {
	if (country) {
	    console.log(`searching list: ${country}`)
	    axios
		.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
		.then(response => {
		    const arr = response.data
				 .filter(n => n.name.common.toLowerCase().includes(country))
		    if (arr.length <= 10) {
			
			arr.map(n => (n.show = false))
			console.log(arr)
			setCountries(arr)
		    } else {
			setCountries(arr)
			console.log(arr)
		    }
		})
	}		    
    }, [country])

    const handleChange = (event) => {
	setValue(event.target.value)
    }

    const toggleShowOf = name => {
	const country = countries.find(n => n.name === name)
	const changedCountry = { ...country, show: !country.show}
	console.log('flag toggle')
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
		     toggleShowOf={toggleShowOf}/>
	</div>
    )
}

export default App
