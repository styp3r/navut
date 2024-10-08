import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Video from '../images/coorg_video_final.mp4';

const PropertyVideo = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleReady = () => {
        setIsLoading(false);
    };

    return (
        <div id="property-video">
            <div className="property-video-container">
                <div className="video-container">
                    {isLoading && <p>Loading video...</p>}
                    <ReactPlayer
                        className="video"
                        url={Video}
                        controls={true}
                        width='auto'
                        height='100%'
                        muted={true}
                        loop={true}
                        playing={true}
                        onReady={handleReady}
                    />
                </div>
                <div className="video-content-title-container">
                    <p className="video-content-title"><span className="material-symbols-outlined">psychiatry</span> We Welcome You to Navut</p>
                    <p>Our homestay isn't just a building; it's a labor of love, reflecting the essence of the local community and the spirit of its people. Each corner whispers stories of tradition and tales of the land, inviting you to unravel the secrets of Navut and forge unforgettable memories.</p>
                </div>
            </div>
        </div>
    );
}

export default PropertyVideo;
