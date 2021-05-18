import {useState} from 'react';
import {useFetch} from '../useFetch';

const SpaceX = () => {
  
  const [request, setRequest] = useState("past")
  
  function addDefaultSrc(ev){
    ev.target.src = "/images/spacex-placeholder.jpg"
  }

  function handleClickUpcoming(ev){
    ev.preventDefault();
    setRequest("upcoming");
  }

  function handleClickPast(ev){
    ev.preventDefault();
    setRequest("past");
  }

    
  const {loading, data, error} = useFetch(`https://api.spacexdata.com/v3/launches/${request}?limit=8&order=asc`);
  if(loading) return <h1>loading...</h1>;
  if(error)
    return (<pre>{JSON.stringify(error, null, 2)}</pre>);

    return(
      <div className="content-wrap">
          <nav>
              <ul className="navbar">
                  <a onClick={handleClickUpcoming} href="#"><li>Upcoming Launches</li></a>
                  <a onClick={handleClickPast}href="#"><li>Previous Launches</li></a>
              </ul>
          </nav>

          <h2>SpaceX {request} Missions</h2>
            <ul className="spaceX-items">
                {data.map((r) => (
                    <li key={r.id}>

                      {/* Use placeholder img if none available */}
                        <img 
                        onError={addDefaultSrc}
                        src={r.links.mission_patch_small} 
                        alt={r.mission_name}
                        />
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

export default SpaceX;