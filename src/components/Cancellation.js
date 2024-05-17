const Cancellation = () => {

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional smooth scrolling behavior
    });


    return (
        <div id="cancellation-page">
            <div className="cancellation-container">
                <p style={{ color: '#996132', fontWeight: '500', fontSize: '1.5rem' }}>Cancellation & Refund Policy</p>
                <p style={{ color: '#996132', fontWeight: '400', fontSize: '0.8rem' }}>Last updated on May 17 2024</p>

                <p>XYKA HOTELS INDIA PRIVATE LIMITED believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>

                <p>Cancellations will only be considered if the request is made at least 72 hours prior to the check-in date, after which the request to cancel the booking may not be entertained.</p>

                <p>In case of any issues at the time of booking, check-in, check-out or during the stay, please report the same to our staff at the homestay or our Customer Service team. The request will, however, be entertained once the team has checked and determined the same at their own end but will ensure to the best of their ability that the issue has been resolved.</p>

                <p>In case of any Refunds approved by XYKA HOTELS INDIA PRIVATE LIMITED, it will take 3-5 days for the refund to be processed to the end customer.</p>
            </div>
        </div>
    );
}

export default Cancellation;