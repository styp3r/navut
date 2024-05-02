import smalllogo from '../images/navut_logo_minimal.jpg'
import { Link } from 'react-router-dom';

const Footer = () => {

    const d = new Date();
    let year = d.getFullYear();

    return (
        <div id="footer">
            <div className="footer-content">
            </div>
            <div className="logo-copyright-bottom">
                <img className="small-logo" alt="logo small" src={smalllogo}></img>
                <p id="copyright">Copyright &copy; {year} Xyka Hotels India Private Limited</p>
            </div>
        </div>
    );
}

export default Footer;