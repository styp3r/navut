import Footer from "./Footer";
import aboutUsHeroImg from '../images/property/aboutUsHeroImg2.jpg'

const About = () => {

    window.scrollTo(0, 0);

    return (
        <div id="aboutUsPage">
            <p style={{ color: '#996132', fontSize: "1.5rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 'bold', margin: '12rem 0 0 0' }}>About Us</p>
            <div className="aboutUsSection">
                <img style={{ objectFit: 'contain' }} src={aboutUsHeroImg} width="370" height="350" alt="homestay"></img>
                <div className="aboutUsContent-container">
                    <p className="aboutUsContent">Welcome to our tranquil retreat nestled in the heart of Coorg's lush forests, where the melody of nature intertwines with the aroma of freshly brewed coffee. Established in March 2024, our homestay in Kedamallur, Karnataka, invites you to escape the hustle and bustle of city life and immerse yourself in the serenity of nature.</p>

                    <p className="aboutUsContent">Our story begins with a simple yet profound intention – to offer a haven of peace and tranquility amidst the verdant surroundings of Coorg. Tucked away in the midst of a sprawling coffee plantation, our homestay provides a sanctuary for those seeking solace and rejuvenation. Perched atop a hill in the quaint village of Kedamallur, our homestay is a testament to the harmonious coexistence of man and nature.</p>

                </div>
                <p className="aboutUsContent">At our homestay, hospitality is not just a service; it's a philosophy ingrained in every aspect of our guest experience. From the moment you arrive, our dedicated staff is committed to ensuring that your stay is nothing short of exceptional. Welcomed with warm smiles and genuine hospitality, you'll find yourself enveloped in an atmosphere of care and attention to detail.</p>
                <p className="aboutUsContent">Throughout the year, Kedamallur offers a tapestry of weather conditions, each season painting its own unique portrait. From the refreshing showers of the monsoon season, which breathe new life into the emerald landscapes, to the crisp, cool air of winter that blankets the region in a serene hush, every visit promises a different yet equally enchanting experience. Whether you're seeking adventure amidst the vibrant hues of autumn or seeking refuge from the summer heat amidst the shade of ancient trees, our homestay offers a warm welcome to all who yearn to reconnect with nature's rhythm.</p>
            </div>
            <Footer />


        </div>
    );
}

export default About;