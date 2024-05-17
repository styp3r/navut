import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from './supabase'

const PriceChangeManager = () => {

    const [isAuth, setIsAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [d1, setd1] = useState();
    const [d2, setd2] = useState();
    const [f1, setf1] = useState();
    const [f2, setf2] = useState();

    const heroname = process.env.REACT_APP_PCM_HERONAME;
    const secret = process.env.REACT_APP_PCM_SECRET;

    const handleAuthCheck = () => {
        if (username === heroname && pass === secret) {
            setIsAuth(true);
            toast.success('Login Successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setIsAuth(false);
            toast.error(('Username or Password Incorrect!'), {
                position: "top-right",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    const handelPCMRateUpdate = async () => {
        try {
            const { error } = await supabase
                .from('pcm')
                .update({
                    deluxe_room_only: d1,
                    deluxe_breakfast: d2,
                    family_room_only: f1,
                    family_breakfast: f2,
                })
                .eq('id', 0);

            toast.success('Update Successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            if (error) {
                throw error
            }
        } catch (error) {
            toast.error(('Unable to Update!'), {
                position: "top-right",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.error('Error fetching PCM Data:', error.message);
            // Handle errors (display message, retry logic)
        }
    }

    return (
        isAuth ? (<div id="price-change-manager-page">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
            <div className="price-change-input-container">
                <p style={{ color: '#996132', fontWeight: '500' }}>Rate Change Manager</p>
                <input className="price-change-input" onChange={(event) => setd1(event.target.value)} placeholder='Deluxe - Room Only - Per Night'></input>
                <input className="price-change-input" onChange={(event) => setd2(event.target.value)} placeholder='Deluxe - With Breakfast - Per Night'></input>
                <input className="price-change-input" onChange={(event) => setf1(event.target.value)} placeholder='Family - Room Only - Per Night'></input>
                <input className="price-change-input" onChange={(event) => setf2(event.target.value)} placeholder='Family - With Breakfast - Per Night'></input>
                <button onClick={() => handelPCMRateUpdate()} className="price-change-submit-btn">Update Rates</button>
            </div>
        </div>) :
            <div id="onsite-staff-login">
                <ToastContainer
                    position="top-right"
                    autoClose={7000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored" />
                <div className="login-container">
                    <p style={{ color: '#996132', fontWeight: '500' }}>Price Change Manager</p>
                    <input type="text" className="loginid-input" placeholder='Username' onChange={(event) => setUsername(event.target.value)}></input>
                    <input type="text" className="loginpass-input" placeholder='Password' onChange={(event) => setPass(event.target.value)}></input>
                    <button className="login-btn" onClick={() => handleAuthCheck()}>Login</button>
                </div>
            </div>
    );
}

export default PriceChangeManager;