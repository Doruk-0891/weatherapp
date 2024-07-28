import React, {useState} from "react";

const SearchWeather = () => {
    const [weatherDetails, setWeatherDetails] = useState({});
    const [searchCity, setSearchCity] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const fetchWeatherDetails = (city) => {
        const url = `https://api.weatherapi.com/v1/current.json?key=efdbd86eceda4904a4c93851243004&q=${city}&aqi=no`;
        fetch(url).then(response => response.json()).then(jsonResponse => setWeatherDetails(jsonResponse)).catch(err => alert('Failed to fetch weather data')).finally(() => setIsSearching(false));
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSearching(true);
        setWeatherDetails({});
        fetchWeatherDetails(searchCity);

    }

    return (
        <div style={{
            width: '80%',
            margin: '75px auto',
            
        }}>
            
                <form 
                onSubmit={handleSubmit}
                style={{
                    textAlign:'center'
                }}>
                    <input type="text" placeholder="Enter city name"  
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    style={{
                        height: '50px',
                        borderRadius: '5px'
                    }}/>
                    <button 
                    type="submit"
                    disabled={!searchCity}
                    style={{
                        border: '1px solid #4CAF50',
                        backgroundColor: '#4CAF50',
                        color: '#FFFFFF',
                        height: '50px',
                        borderRadius: '5px',
                        fontWeight: '700',
                        padding: '0 1.4rem',
                        marginLeft: '10px',
                        cursor: 'pointer'

                    }}>Search</button>
                </form>

                {
                    isSearching && <p>Loading data...</p>
                }

                {
                    !isSearching && Object.keys(weatherDetails).length > 0 &&
                    
                    <div className="weather-cards">
                        <div className="weather-card">
                            <h5>Temperature</h5>
                            <p>{weatherDetails?.['current']?.['temp_c']}°C</p>
                        </div>

                        <div className="weather-card">
                            <h5>Humidity</h5>
                            <p>{weatherDetails?.['current']?.['humidity']}%</p>
                        </div>

                        <div className="weather-card">
                            <h5>Condition</h5>
                            <p>{weatherDetails?.['current']?.['condition']?.['text']}</p>
                        </div>

                        <div className="weather-card">
                            <h5>Wind Speed</h5>
                            <p>{weatherDetails?.['current']?.['wind_kph']} kph</p>
                        </div>

                    </div>
                }

            
        </div>
    );
}

export default SearchWeather;