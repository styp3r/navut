import ReactPlayer from 'react-player';
import Video from '../images/coorg_video.mp4'

const PropertyVideo = () => {
    return (
        <div id="property-video">
            <div className="video-container">
                <ReactPlayer className="video"
                    url={Video}
                    controls={true}
                    width = 'auto'
                    height = '100%'
                    muted = {true}
                    loop = {true}
                    playing = {true}
                />
            </div>
            <div className="video-content-title-container">
                <p className="video-content-title"><span className="material-symbols-outlined">psychiatry</span> We Welcome You to Navut</p>
                <p>Our homestay isn't just a building; it's a labor of love, reflecting the essence of the local community and the spirit of its people. Each corner whispers stories of tradition and tales of the land, inviting you to unravel the secrets of Navut and forge unforgettable memories.</p>
            </div>
        </div>
    );
}

export default PropertyVideo;