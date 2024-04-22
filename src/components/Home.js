import React, { useState, useEffect } from 'react'
import BookNowSection from './BookNowSection'
import Map from './MapComponent'
import Footer from './Footer'
import Hero from './Hero'
import Gallery from './Gallery'
import PropertyInfo from './PropertyInfo'
import TestimonialSlider from './TestimonialSlider'
import supabase from './supabase'

const Home = () => {

    // Delete all bookings where stay is completed
    const [data, setData] = useState([]); // variable to store booking data from server

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data: fetchedBookings, error } = await supabase
                    .from('bookingData')
                    .select('bookings');

                if (error) {
                    throw error;
                }

                for (let i = 0; i < fetchedBookings.length; i++) {
                    console.log(fetchedBookings[i].bookings.check_out)

                    const checkOutDate = new Date(fetchedBookings[i].bookings.check_out);
                    const today = new Date();
                    console.log("checkout- " + checkOutDate)
                    console.log("today - " + today)
                    console.log("is it past 12pm?" + (new Date().getHours() >= 12 ? " Past 12pm" : " Not Past 12pm"))

                    // Check for matching date string (yyyy-mm-dd)
                    if (today >= checkOutDate) {
                        // Check if current time is past 12pm
                        if (today.getDate() ===  checkOutDate.getDate() && new Date().getHours() >= 12) {
                            console.log('Has to be deleted. (Today after 12pm)' + fetchedBookings[i].bookings.unique_id)

                            /* try {
                                 const { error } = await supabase
                                     .from('bookingData')
                                     .delete()
                                     .eq('bookings->>unique_id', fetchedBookings[i].bookings.unique_id);
 
                                 if (!error) {
                                     console.log('Rows with unique_id:', fetchedBookings[i].bookings.unique_id, 'deleted successfully!');
                                     // Update your UI
                                 } else {
                                     console.error('Error deleting rows:', error);
                                     // Handle errors
                                 }
                             } catch (error) {
                                 console.error('Unexpected error:', error);
                                 // Handle unexpected errors
                             }*/
                        } else {
                            console.log('Has to be deleted.' + fetchedBookings[i].bookings.unique_id)
                            /* try {
                                 const { error } = await supabase
                                     .from('bookingData')
                                     .delete()
                                     .eq('bookings->>unique_id', fetchedBookings[i].bookings.unique_id);
 
                                 if (!error) {
                                     console.log('Rows with unique_id:', fetchedBookings[i].bookings.unique_id, 'deleted successfully!');
                                     // Update your UI
                                 } else {
                                     console.error('Error deleting rows:', error);
                                     // Handle errors
                                 }
                             } catch (error) {
                                 console.error('Unexpected error:', error);
                                 // Handle unexpected errors
                             }*/
                        }
                    } else {
                        console.log('Check out date not yet breached.')
                    }
                }


            } catch (error) {
                console.error('Error fetching bookings:', error.message);
                // Handle errors (display message, retry logic)
            }
        };

        const updateState = async () => {
            const bookings = await fetchData();

            if (bookings) {
                setData(bookings);
            }
        };

        updateState();
    }, []);

    window.scrollTo(0, 0);
    return (
        <div>
            <Hero />
            <Gallery />
            <PropertyInfo />
            <TestimonialSlider />
            <BookNowSection />
            <Map />
            <Footer />
        </div>
    );
}

export default Home;