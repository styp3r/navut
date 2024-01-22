import agodaLogo from '../images/agodalogo.png'
import airbnbLogo from '../images/airbnblogo.png'
import bookingcomLogo from '../images/bookingcomlogo.png'
import cleartripLogo from '../images/cleartriplogo.png'
import easemytripLogo from '../images/easemytriplogo.png'
import expediaLogo from '../images/expedialogo.png'
import goibiboLogo from '../images/goibibologo.png'
import kayakLogo from '../images/kayaklogo.png'
import makemytripLogo from '../images/makemytriplogo.png'
import trivagoLogo from '../images/trivagologo.png'
import yatraLogo from '../images/yatralogo.png'
import smalllogo from '../images/navut_logo_minimal.jpg'
import fbLogo from '../images/fbLogo.png'
import whatsappLogo from '../images/whatsappLogo.png'
import instaLogo from '../images/instaLogo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div id="footer">
            <img className="smallLogo" alt="logo small" src={smalllogo}></img>
            <div className="partnerLogos">
                <img className="partnerLogoItem" style={{ margin: '1rem 1rem 1.5rem 1rem' }} src={agodaLogo} alt="partner" width="70" height="30"></img>
                <img className="partnerLogoItem" src={airbnbLogo} alt="partner" width="60" height="80"></img>
                <img className="partnerLogoItem" src={bookingcomLogo} alt="partner" width="110" height="25"></img>
                <img className="partnerLogoItem" src={cleartripLogo} alt="partner" width="100" height="25"></img>
                <img className="partnerLogoItem" src={easemytripLogo} alt="partner" width="100" height="45"></img>
                <img className="partnerLogoItem" src={expediaLogo} alt="partner" width="100" height="30"></img>
                <img className="partnerLogoItem" src={goibiboLogo} alt="partner" width="100" height="35"></img>
                <img className="partnerLogoItem" src={kayakLogo} alt="partner" width="100" height="25"></img>
                <img className="partnerLogoItem" src={makemytripLogo} alt="partner" width="120" height="50"></img>
                <img className="partnerLogoItem" src={trivagoLogo} alt="partner" width="80" height="25"></img>
                <img className="partnerLogoItem" src={yatraLogo} alt="partner" width="60" height="25"></img>
            </div>
            <hr className="footerDivider"></hr>
            <div className = "footerContent">
                <div className = "socialMedia">
                    <p style = {{color: '#996132'}}>Find Us On Social Media</p>
                    <img className = "socialItem" src = {fbLogo} alt = "link to facebook page"></img>
                    <img className = "socialItem" src = {instaLogo} alt = "link to instagram page"></img>
                    <img className = "socialItem" src = {whatsappLogo} alt = "link to whatsapp chat"></img>
                </div>
                <div className = "usefulLinks">
                    <p style = {{color: '#996132'}}>Useful Links</p>
                    <Link to = "/"><p className="navbarLink">Home</p></Link>
                    <Link to = "/bookings"><p className="navbarLink">Bookings</p></Link>
                    <Link to = "/about"><p className="navbarLink">About Us</p></Link>
                    <Link to = "/contact"><p className="navbarLink">Contact Us</p></Link>
                </div>
                <div className = "newsletter">
                    <p style = {{color: '#996132'}}>Join Our Newsletter</p>
                    <input className = "newsletterEmailInput" placeholder = "Email"></input>
                    <button className = "joinNewsletterBtn">Join</button>
                </div>
            </div>
        </div>
    );
}

export default Footer;