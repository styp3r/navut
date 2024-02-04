import React from 'react';
import { useLocation } from 'react-router-dom';
import NavutLogo from '../images/navut_logo_minimal.jpg'

const PaymentGateway = () => {
    const location = useLocation();
    const receivedData = location.state?.data || [];

    let roomData = [];
    for (let i = 0; i < receivedData.length; i++) {
        roomData[i] = receivedData[i];
    }

    const amount = (roomData[0].grandTotal) * 100;
    const currency = "INR";
    const receiptID = "qwsaq1";


    const paymentHandler = async (e) => {
        const response = await fetch("http://localhost:5000/order", {
            method: "POST",
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptID,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        console.log(order);

        var options = {
            description: 'Credits towards consultation',
            image: NavutLogo,
            order_id: order.id,
            currency: currency,
            key: 'rzp_test_1DP5mmOlF5G5ag',
            amount: '500',
            external: {
              wallets: ['paytm']
            },
            name: 'Navut Hotels',
            prefill: { //Use Guest Details Here
              email: 'akshay@razorpay.com', 
              contact: '8955806560',
              name: 'Akshay Bhalotia'
            },
            theme: {color: '#d49c6e'}
          }
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    };

    return (
        <div>
            <p>Payment Gateway</p>
            {/* Updated roomData.map function */}
            {"Rs." + roomData[0].grandTotal}
            <button onClick={paymentHandler}>Pay Now</button>
        </div>
    );
};

export default PaymentGateway;
