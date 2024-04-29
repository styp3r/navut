import smalllogo from '../images/navut_logo_minimal.jpg'
import { Link } from 'react-router-dom';

const Footer = () => {

    const d = new Date();
    let year = d.getFullYear();

    return (
        <div id="footer">
            <div className="footer-content">
                <div className="useful-links">
                    <p style={{ color: '#f9f2eb', fontWeight: '600' }}>Useful Links</p>
                    <Link className = "useful-link-item" to="/"><p>Home</p></Link>
                    <Link className = "useful-link-item" to="/bookings-landing"><p>Bookings</p></Link>
                    <Link className = "useful-link-item" to="/about"><p>About Us</p></Link>
                    <Link className = "useful-link-item" to="/contact"><p>Contact Us</p></Link>
                </div>
            </div>
            <div className="logo-copyright-bottom">
                <img className="small-logo" alt="logo small" src={smalllogo}></img>
                <p id="copyright">Copyright &copy; {year} Xyka Hotels India Private Limited</p>
            </div>
        </div>
    );
}

export default Footer;