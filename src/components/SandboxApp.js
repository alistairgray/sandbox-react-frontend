import React from 'react';


// Components
import Heading from './Heading';
import Navbar from './Navbar';
import Landing from './Landing';


const SandboxApp = () => {

    return(
        <div>
            <header className="head">
                <Navbar />
                <Heading />
            </header>
            <main className="main">
                <Landing />
            </main>
            <footer className="foot">
                &copy; Alistair Gray 2021
            </footer>
        </div>
    )
}

export default SandboxApp;