import {useFetch} from './useFetch';


function SpaceXAPI() {
    const {loading, data, error} = useFetch(`https://api.spacexdata.com/v3/launches`);
    if(loading) return <h1>loading...</h1>;
    if(error)
      return (<pre>{JSON.stringify(error, null, 2)}</pre>);
    return(
      <div className="content-wrap">
          <h2>SpaceX Previous Missions</h2>
            <ul className="spaceX-items">
                {data.map((r) => (
                    <li key={r.id}>
                        <img src={r.links.mission_patch_small} alt={r.mission_name}/>
                        <br />
                        Flight Number: {r.flight_number}
                        <br />
                        Launch Year: {r.launch_year}
                        <br />
                        Type: {r.rocket.rocket_name}
                        <br />
                        Mission Name: {r.mission_name}
                    </li>
                ))}
            </ul>
      </div>
    );
};

export default SpaceXAPI;