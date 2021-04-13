import {useFetch} from './useFetch';


function SpaceXAPI() {
    const {loading, data, error} = useFetch(`https://api.spacexdata.com/v3/capsules`);
    if(loading) return <h1>loading...</h1>;
    if(error)
      return (<pre>{JSON.stringify(error, null, 2)}</pre>);
    return(
      <div>
        <ul>
            {data.map((capsule) => (
                <li key={capsule.id}>{capsule.id}</li>
            ))}
        </ul>
      </div>
    );
};

export default SpaceXAPI;