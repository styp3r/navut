import Footer from './Footer'
import Map from './MapContact'

const Contact = () => {

    window.scrollTo(0, 0);

    return (
        <div id="contactUsPage">
            <p style={{ color: '#996132', fontSize: "2.5rem", fontFamily: "'Caveat', cursive", margin: '8rem 0 0 0' }}>Contact Us</p>

            <div className="contactCardsContainer">
                <div className="callUsCard">
                    <div style={{ width: '100%', height: '0.5rem', backgroundColor: '#dfb899', borderRadius: '1rem 1rem 0 0' }}></div>
                    <h3 style={{ fontWeight: 'bold' }}>Connect With Us</h3>
                    <div style={{ margin: '3rem 0 0 0', padding: '1rem' }}>
                        <p className="contactItem"><span class="material-symbols-outlined">call</span>+91 63644 01444</p>
                        <p className="contactItem"><span class="material-symbols-outlined">call</span>+91 99452 58005</p>
                        <p className="contactItem"><span class="material-symbols-outlined">call</span>+91 72590 31520</p>
                        <p className="contactItem"><span class="material-symbols-outlined">mail</span>navuthotels@gmail.com</p>
                    </div>
                </div>
                <div className="help-supportCard">
                    <div style={{ width: '100%', height: '0.5rem', backgroundColor: '#bb8456', borderRadius: '1rem 1rem 0 0' }}></div>
                    <h3 style={{ fontWeight: 'bold' }}>Help & Support</h3>
                    <div style={{ margin: '5rem 0 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ width: '15rem', margin: '0 0 2rem 0' }}>We've Got Your Back! Count on us for supportive assistance whenever you need it</p>
                        <button id="whatsappUsBtn">WhatsApp Us Now</button>
                        <p style={{ fontStyle: 'italic', margin: '7rem 0 0 0' }}>Response Time  ~15min</p>
                    </div>
                </div>
                <div className="reachUsCard">
                    <div style={{ width: '100%', height: '0.5rem', backgroundColor: '#dfb899', borderRadius: '1rem 1rem 0 0' }}></div>
                    <h3 style={{ fontWeight: 'bold'}}>Registered Office</h3>
                    <div style={{ margin: '3rem 0 0 0', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <span class="material-symbols-outlined">home_pin</span>
                        <p>Xyka Hotels India Pvt. Ltd.</p>
                        <p className="contactItem">'Hemkund', BMP 10, 14th D Cross, Behind GR Regency, Byrasandra, GM Palya, New Thippasandra Post, Bengaluru 560 075</p>
                        <p>GST No. 29AAACX0860G1ZB</p>
                    </div>
                </div>
            </div>
            <Map />
            <p style={{ fontStyle: 'italic', margin: '1rem 0 5rem 0' }}>- Tap on the blue marker to get directions -</p>
            <Footer />
        </div>
    );
}

export default Contact;