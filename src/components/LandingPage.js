import Navbar from './Navbar'
import SquareLogo from '../images/navut_logo_square.jpg'
import HeroImg from '../images/heroImg.jpg'

const LandingPage = () => {
    return (
        <div id='landingPage'>
            <img id="squareLogo" width="130" height="130" alt="logo" src={SquareLogo}></img>
            <Navbar />
            <div className="heroSection">
                <img id="heroImg" alt="heroImage" src={HeroImg}></img>
            </div>

        </div>
    )
}

export default LandingPage