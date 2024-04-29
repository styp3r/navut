import One from '../images/gallery/gal1.jpeg'
import Two from '../images/gallery/gal2.jpeg'
import Three from '../images/gallery/gal3.jpeg'
import Four from '../images/gallery/gal4.jpg'
import Five from '../images/gallery/gal5.jpg'
 
const Gallery = () => {

    return (
        <div id="gallery-section">
            <p style = {{margin: 0}} >Gallery</p>
            <div className="gallery-grid">
                <div className="hero-grid-img"><img alt = "hero" className = "gallery-img-hero" src = {One}/></div>
                <div className="side-grid-imgs">
                    <div className = "side-grid-left">
                        <div className="side-grid-image"><img alt = "yo" className = "gallery-img-1" src = {Two}/></div>
                        <div className="side-grid-image"><img  alt = "yo" className = "gallery-img-2" src = {Three}/></div>
                    </div>
                    <div className = "side-grid-right">
                        <div className="side-grid-image"><img alt = "yo" className = "gallery-img-3" src = {Four}/></div>
                        <div className="side-grid-image"><img alt = "yo" className = "gallery-img-4" src = {Five}/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;