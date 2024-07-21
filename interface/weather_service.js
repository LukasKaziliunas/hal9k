function getWeather(city)
{
    const currentDateTime = getCurrentTimestamp();

    return new Promise((resolve, reject) => {
        fetch(`https://api.meteo.lt/v1/places/${city}/forecasts/long-term`)
        .then( data => data.json() )
        .then( result => {
                var weatherForcasts = result['forecastTimestamps'].filter( (item) => { return item['forecastTimeUtc'] == currentDateTime })
                if(weatherForcasts.length > 0)
                {
                    var currentWeather = weatherForcasts[0];
                    resolve(
                        { 
                            "temperature": currentWeather['feelsLikeTemperature'],
                            "conditions": currentWeather['conditionCode']
                        })
                }
                else
                {
                    reject("Could not get the weather")
                }
            } 
        )
        .catch( err => {
            console.log(err);
            reject("Could not get the weather")
            }
        )

    })

}

function getCurrentTimestamp() {
    // Create a new Date object
    const now = new Date();

    // Extract the date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');

    // Extract the time components
    const hours = String(now.getHours()).padStart(2, '0');

    // Combine them into the desired format
    const formattedTimestamp = `${year}-${month}-${day} ${hours}:00:00`;

    return formattedTimestamp;
}

module.exports.getWeather = getWeather


