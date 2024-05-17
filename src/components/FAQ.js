import React, { useState } from 'react';

const FAQ = () => {
    const [isClickedOne, setIsClickedOne] = useState(false);
    const [isClickedTwo, setIsClickedTwo] = useState(false);
    const [isClickedThree, setIsClickedThree] = useState(false);

    const handleFaqExpand = (faqId, setIsClicked, isClicked) => {
        const element = document.getElementById(faqId);
        const arrowId = faqId + '-arrow';
        const elementArrow = document.getElementById(arrowId);

        if (isClicked) {
            elementArrow.textContent = "keyboard_arrow_down"
            element.classList.remove('open');
        } else {
            elementArrow.textContent = "minimize"
            element.classList.add('open');
        }
        setIsClicked(!isClicked);
    };

    return (
        <div id="faq-section">
            <div className="faq-container">
                <p className="faq-title">Frequently Asked Questions</p>
                <div className="faq-items-container">
                    <div id="faq-item-one" className="faq-item" onClick={() => handleFaqExpand("faq-item-one", setIsClickedOne, isClickedOne)}>
                        <p className="faq-item-q">What if I want to cancel my booking? <span id = "faq-item-one-arrow" className="material-symbols-outlined">keyboard_arrow_down</span></p>
                        <p id="faq-item-one-ans" className={isClickedOne ? "faq-displayed" : "faq-hidden"}>Cancellations will only be considered if the request is made at least 72 hours prior to the check-in date. Cancellations made within 72 hours of check-in may incur a penalty fee equivalent to one night's stay. Any Refund amount will be credited to the guest within 3-5 business days.</p>
                    </div>

                    <div id="faq-item-two" className="faq-item" onClick={() => handleFaqExpand("faq-item-two", setIsClickedTwo, isClickedTwo)}>
                        <p className="faq-item-q">Are there any additional charges for early check-in or late check-out? <span id = "faq-item-two-arrow" className="material-symbols-outlined">keyboard_arrow_down</span></p>
                        <p id="faq-item-two-ans" className={isClickedTwo ? "faq-displayed" : "faq-hidden"}>Early check-in and late check-out are subject to availability. Additional charges may apply if there are any issues faced by the next guest because of late check-out. Please contact our front desk prior to your departure to confirm availability and any applicable fees.</p>
                    </div>

                    <div id="faq-item-three" className="faq-item" onClick={() => handleFaqExpand("faq-item-three", setIsClickedThree, isClickedThree)}>
                        <p className="faq-item-q">Is breakfast included in the room rate? <span id = "faq-item-three-arrow" className="material-symbols-outlined">keyboard_arrow_down</span></p>
                        <p id="faq-item-three-ans" className={isClickedThree ? "faq-displayed" : "faq-hidden"}>Guests have the flexibility to select their preferred rooms and choose whether to include breakfast in their booking. This option is designed to accommodate those who prefer to explore local dining options. However, if your plans change, breakfast is available daily from 7:00 AM to 10:00 AM in our dining area at standard restaurant rates.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
