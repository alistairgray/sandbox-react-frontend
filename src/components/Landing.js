import React from 'react';
import axios from 'axios';

import SpaceXAPI from './SpaceXAPI';

function Landing() {
    return(
        <section className="landing content-wrap flex-container">
            <SpaceXAPI />
        </section>
    )
}

export default Landing;