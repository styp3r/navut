import Leaf3 from '../images/decoration/leaf3.png'

const PropertyInfo = () => {
    return (
        <div>
            <p style = {{color: '#996132', fontSize: "2.5rem",fontFamily: "'Caveat', cursive"}}>Amenities</p>
            <p style = {{fontWeight: 'bold', margin: '0 0 2rem 0'}}>~ Where comfort meets convenience ~ </p>
            <div id="propertyInfo">
                <div className="amenList">
                    <div className="amenBlocks">
                        <div className="amenBlockLeft">
                            <p className="amenItem"><span className="material-symbols-outlined">local_parking</span>Parking</p>
                            <p className="amenItem"><span className="material-symbols-outlined">wifi</span>Free WiFi</p>
                            <p className="amenItem"><span className="material-symbols-outlined">psychiatry</span>Coffee Plantation</p>
                            <p className="amenItem"><span className="material-symbols-outlined">landscape</span>Valley View</p>
                            <p className="amenItem"><span className="material-symbols-outlined">pets</span>Furry Friends Allowed</p>
                            <p className="amenItem"><span className="material-symbols-outlined">restaurant</span>Restaurant</p>
                            <p className="amenItem"><span className="material-symbols-outlined">table_lamp</span>Dedicated Workspace</p>
                        </div>
                        <div className="amenBlockRight">
                            <p className="amenItem"><span className="material-symbols-outlined">device_thermostat</span>Hot Water</p>
                            <p className="amenItem"><span className="material-symbols-outlined">self_care</span>Essentials</p>
                            <p className="amenItem"><span className="material-symbols-outlined">balcony</span>Balcony</p>
                            <p className="amenItem"><span className="material-symbols-outlined">deck</span>Terrace</p>
                            <p className="amenItem"><span className="material-symbols-outlined">concierge</span>Self Check-In</p>
                            <p className="amenItem"><span className="material-symbols-outlined">smoking_rooms</span>Smoking Allowed</p>
                            <p className="amenItem"><span className="material-symbols-outlined">room_Service</span>Room Service</p>
                        </div>
                    </div>
                </div>

                <div className="amenContent">
                    <img alt = "leaf decoration" className="leaf3Img" src={Leaf3}></img>
                    <p style={{ margin: '3.5rem 10rem 2rem 0', textAlign: 'left' }}>Immerse yourself in nature's embrace as you gaze upon the breathtaking forest and valley views from the comfort of your room. Nestled amidst lush greenery and rolling hills, our location offers a symphony of sights that redefine tranquility and serenity.</p>
                    <p style={{ margin: '0 10rem 0 0', textAlign: 'left' }}>Explore the city with ease using our concierge services, which provide insider knowledge and assistance in planning your excursions and experiences.</p>
                    <p style={{ margin: '2rem 10rem 2rem 0', textAlign: 'left' }}>At Navut, our commitment to your comfort and satisfaction is unwavering. Elevate your stay with our array of amenities, meticulously curated to cater to your every need.</p>
                </div>
            </div>
        </div>
    );
}

export default PropertyInfo;