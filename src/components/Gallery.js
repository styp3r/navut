import One from '../images/one.jpg'
import Two from '../images/two.jpg'
import Three from '../images/three.jpg'
import Four from '../images/four.jpg'
import Five from '../images/five.jpg'

const Gallery = () => {
    return (
        <div id="gallerySection">
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