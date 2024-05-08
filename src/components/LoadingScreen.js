import React from 'react';
import SmallLogo from '../images/navut_logo_minimal.jpg'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img alt = "loading screen logo" style = {{margin: '3rem'}} width = "100" height = "100" src = {SmallLogo}></img>
      <div className="spinner"></div>
      <p>Loading Your Journey...</p>
    </div>
  );
};

export default LoadingScreen;