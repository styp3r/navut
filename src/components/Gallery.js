import One from '../images/gallery/gal1.jpeg'
import Two from '../images/gallery/gal2.jpeg'
import Three from '../images/gallery/gal3.jpeg'
import Four from '../images/gallery/gal4.jpg'
import Five from '../images/gallery/gal5.jpg'
 
const Gallery = () => {

    return (
        <div id="gallerySection">
            <p style = {{color: '#996132', fontSize: "2.5rem",fontFamily: "'Caveat', cursive"}}>Gallery</p>
            <div className="galleryGrid">
                <div className="heroGridImg"><img alt = "hero" className = "galleryImgHero" src = {One}/></div>
                <div className="sideGridImgs">
                    <div className = "sideGridImgsTop">
                        <div className="subGridImg"><img alt = "yo" className = "galleryImg" src = {Two}/></div>
                        <div className="subGridImg"><img  alt = "yo" className = "galleryImg" src = {Three}/></div>
                    </div>
                    <div className = "sideGridImgsBottom">
                        <div className="subGridImg"><img alt = "yo" className = "galleryImg" src = {Four}/></div>
                        <div className="subGridImg"><img alt = "yo" className = "galleryImg" src = {Five}/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;