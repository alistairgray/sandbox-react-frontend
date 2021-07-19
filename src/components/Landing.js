import React from 'react';
// import axios from 'axios';

import SpaceX from './spacex/SpaceX';
import SolarSystem from './animations/SolarSystem';
import {Canvas, useThree, extend} from 'react-three-fiber';





function Landing() {
    extend({OrbitControls});
    const {camera} = useThree();

    return(
        <section className="landing content-wrap flex-container">

            <div className="spaceX">
                <SpaceX />
            </div>

            <div className="solar">
                <Canvas camera={{position: [20, 0, 0]}}>
                    <SolarSystem />
                </Canvas>

            </div>
            
        </section>
    )
}

export default Landing;