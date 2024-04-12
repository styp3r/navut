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
import { Link } from 'react-router-dom';

const Footer = () => {

    const d = new Date();
    let year = d.getFullYear();

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
                <img className="partnerLogoItem" src={makemytripLogo} alt="partner" width="120" height="45"></img>
                <img className="partnerLogoItem" src={trivagoLogo} alt="partner" width="80" height="25"></img>
                <img className="partnerLogoItem" src={yatraLogo} alt="partner" width="60" height="25"></img>
            </div>
            <hr className="footerDivider"></hr>
            <div className="footerContent">
                <div className="usefulLinks">
                    <p style={{ color: '#996132' }}>Useful Links</p>
                    <Link style={{ textDecoration: 'none', color: '#000000', display: 'inline-block', margin: '0 0.5rem 0 0.5rem'}} to="/"><p >Home</p></Link>
                    <Link style={{ textDecoration: 'none', color: '#000000', display: 'inline-block', margin: '0 0.5rem 0 0.5rem' }} to="/bookings"><p >Bookings</p></Link>
                    <Link style={{ textDecoration: 'none', color: '#000000', display: 'inline-block', margin: '0 0.5rem 0 0.5rem' }} to="/about"><p >About Us</p></Link>
                    <Link style={{ textDecoration: 'none', color: '#000000', display: 'inline-block', margin: '0 0.5rem 0 0.5rem' }} to="/contact"><p >Contact Us</p></Link>
                </div>
                <div className="newsletter">
                    <p style={{ color: '#996132' }}>Join Our Newsletter</p>
                    <input id="newsletterEmailInput" placeholder="Email"></input>
                    <button className="joinNewsletterBtn">Join</button>
                </div>
            </div>
            <p style={{ color: '#996132' }}>Copyright &copy; {year} Xyka Hotels India Private Limited - All Rights Reserved</p>
        </div>
    );
}

export default Footer;