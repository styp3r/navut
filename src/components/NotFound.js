import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div id="not-found">
            <div className = 'not-found-content'>
            <h1 style = {{color: '#996132', fontWeight: 'bold'}}>Uh oh! Looks like we've lost our way.</h1>
            <p>The page you requested seems to be hiding. Maybe it went on an adventure?</p>
            <p>No worries, you can try going back to the homepage.</p>
            <Link to = "/"><button id = "go-home-btn" className = 'classicBtn'>Go to Homepage</button></Link>
            </div>
        </div>
    );
};

export default NotFound;