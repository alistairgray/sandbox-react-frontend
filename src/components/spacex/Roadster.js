import React from 'react';

const {loading, data, error} = useFetch(`https://api.spacexdata.com/v3/roadster`);
  if(loading) return <h1>loading...</h1>;
  if(error)
    return (<pre>{JSON.stringify(error, null, 2)}</pre>);

const Roadster = () => {
    return(
        <div>
            <h2>{data.name}</h2>
            <ul>
                <li><strong>Apoapsis:</strong>{data.apoapsis_au}</li>
                <li><strong>Periapsis:</strong>{data.periapsis_au}</li>
                <li><strong>Orbital Period:</strong>{data.period_days}</li>
                <li><strong>Speed(kph):</strong>{data.speed_kph}</li>
                <li><strong>Distance(Earth):</strong>{data.earth_distance_km}</li>
            </ul>
        </div>
    )
}

export default Roadster;