import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const getAllCountries = async () => {
    try {
      const res = await axios.get("https://crio-location-selector.onrender.com/countries");
      setCountries(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getStatesOfSpecificCountry = async (country) => {
    try {
      const res = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
      setStates(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getCitiesOfSpecificState = async (country, state) => {
    try {
      const res = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      setCities(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    if (country) {
      getStatesOfSpecificCountry(country);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [country]);

  useEffect(() => {
    if (state && country) {
      getCitiesOfSpecificState(country, state);
    } else {
      setCities([]);
    }
  }, [state, country]);

  return (
    <>
      <div style={{textAlign: "center", marginTop: "50px"}}>
        <h1>Select Location</h1>
        <select value={country} onChange={(e) => setCountry(e.target.value)} style={{
          margin: "10px",
          height: "50px",
          width: "251px",
          fontWeight: 600,
          border: "1px solid",
          padding: "10px",
        }}>
          <option value="">Select Country</option>
          {countries.map((country) => {
            return <option key={country} value={country}>{country}</option>
          })}
        </select>
        <select value={state} onChange={(e) => setState(e.target.value)} style={{
          margin: "10px",
          height: "50px",
          width: "251px",
          fontWeight: 600,
          border: "1px solid",
          padding: "10px",
        }}>
          <option value="">Select State</option>
          {states.map((state) => {
            return <option key={state} value={state}>{state}</option>
          })}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)} style={{
          margin: "10px",
          height: "50px",
          width: "251px",
          fontWeight: 600,
          border: "1px solid",
          padding: "10px",
        }}>
          <option value="">Select Cities</option>
          {cities.map((city) => {
            return <option key={city} value={city}>{city}</option>
          })}
        </select>
        {city && state && country && (<div style={{fontSize: "20px", marginTop: "20px"}}> <b>You selected {country}</b>, {state}, {city} </div>)}
        
      </div>
    </>
  )
}

export default App
