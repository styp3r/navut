import smalllogo from '../images/navut_logo_minimal.jpg'
import { Link } from 'react-router-dom';

const Footer = () => {

    const d = new Date();
    let year = d.getFullYear();

    return (
        <div id="footer">
            <div className="footer-content">
                <div className="useful-links">
                    <p style={{ margin: '1rem 5rem 1rem 1rem', fontWeight: '600', color: '#996132' }}>Useful Links</p>
                    <Link style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="/"><p className="navbar-link-footer">Home</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="bookings-landing"><p className="navbar-link-footer">Bookings</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="about"><p className="navbar-link-footer">About Us</p></Link>
                    <Link style={{ textDecoration: 'none', margin: '1rem 5rem 1rem 1rem' }} to="contact"><p className="navbar-link-footer">Contact Us</p></Link>
                </div>
                <div className="our-location">
                    <p style={{ margin: '1rem 5rem 1rem 1rem', fontWeight: '600', color: '#996132' }}>Our Locations</p>
                    <a style={{ textDecoration: 'none', color: '#996132' }} target = "_blank" href="https://www.google.com/maps/search/12.189052,+75.748366?entry=tts"><p style = {{margin: '1rem 5rem 1rem 1rem'}}>Navut Homestay - Coorg</p></a>
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