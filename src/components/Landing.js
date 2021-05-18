import React from 'react';
import axios from 'axios';

import SpaceX from './spacex/SpaceX';

function Landing() {
    return(
        <section className="landing content-wrap flex-container">

            <div className="spaceX">
                <SpaceX />
            </div>
            
        </section>
    )
}

export default Landing;