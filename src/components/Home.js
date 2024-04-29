import React, { useEffect } from 'react'
import BookNowSection from './BookNowSection'
import Map from './MapComponent'
import Footer from './Footer'
import Hero from './Hero'
import Gallery from './Gallery'
import PropertyInfo from './PropertyInfo'
import TestimonialSlider from './TestimonialSlider'
import supabase from './supabase'

const Home = () => {

    useEffect(() => {
        // Delete all bookings where stay is completed
        const fetchData = async () => {
            try {
                const { data: fetchedBookings, error } = await supabase
                    .from('bookingData')
                    .select('bookings');

                if (error) {
                    throw error;
                }

                for (let i = 0; i < fetchedBookings.length; i++) {

                    const checkOutDate = new Date(fetchedBookings[i].bookings.check_out);
                    const today = new Date();

                    // Check for matching date string (yyyy-mm-dd)
                    if (today >= checkOutDate) {
                        // Check if current time is past 12pm
                        if (today.getDate() === checkOutDate.getDate() && new Date().getHours() >= 12) {

                            try {
                                const { error } = await supabase
                                    .from('bookingData')
                                    .delete()
                                    .eq('bookings->>unique_id', fetchedBookings[i].bookings.unique_id);

                                if (!error) {
                                    console.log('Server successfully refreshed.');
                                    // Update your UI
                                } else {
                                    console.error('Error deleting rows:', error);
                                    // Handle errors
                                }
                            } catch (error) {
                                console.error('Unexpected error:', error);
                                // Handle unexpected errors
                            }

                            //update rcm
                            try {
                                const { data: fetchedrcm, error } = await supabase
                                    .from('rcm')
                                    .select('*');

                                // Iterate over fetchedrcm array to check if any row matches the given criteria

                                for (const row of fetchedrcm) {
                                    if (row.room_type === fetchedBookings[i].bookings.room_name && row.check_in === fetchedBookings[i].bookings.check_in && row.check_out === fetchedBookings[i].bookings.check_out) {

                                        if (row.count > 1) {
                                            const { error } = await supabase
                                                .from('rcm')
                                                .update({ count: row.count - 1 })
                                                .eq('id', row.id);

                                            if (error) {
                                                throw error;
                                            }
                                            break; // Exit the loop once a matching row is found and updated
                                        } else {
                                            const { error } = await supabase
                                                .from('rcm')
                                                .delete()
                                                .eq('id', row.id);

                                            if (error) {
                                                throw error;
                                            }
                                            break; // Exit the loop once a matching row is found and updated
                                        }
                                    }
                                }

                                // Handle any error occurred during the operations
                                if (error) {
                                    throw error;
                                }

                                //return fetchedrcm;
                            } catch (error) {
                                console.error('Error fetching RCM data:', error.message);
                                // Handle errors (display message, retry logic)
                            }

                        } else {
                            try {
                                const { error } = await supabase
                                    .from('bookingData')
                                    .delete()
                                    .eq('bookings->>unique_id', fetchedBookings[i].bookings.unique_id);

                                if (!error) {
                                    console.log('Server successfully refreshed.');
                                    // Update your UI
                                } else {
                                    console.error('Error deleting rows:', error);
                                    // Handle errors
                                }
                            } catch (error) {
                                console.error('Unexpected error:', error);
                                // Handle unexpected errors
                            }

                            //update rcm
                            try {
                                const { data: fetchedrcm, error } = await supabase
                                    .from('rcm')
                                    .select('*');

                                // Iterate over fetchedrcm array to check if any row matches the given criteria

                                for (const row of fetchedrcm) {
                                    if (row.room_type === fetchedBookings[i].bookings.room_name && row.check_in === fetchedBookings[i].bookings.check_in && row.check_out === fetchedBookings[i].bookings.check_out) {

                                        if (row.count > 1) {
                                            const { error } = await supabase
                                                .from('rcm')
                                                .update({ count: row.count - 1 })
                                                .eq('id', row.id);

                                            if (error) {
                                                throw error;
                                            }
                                            break; // Exit the loop once a matching row is found and updated
                                        } else {
                                            const { error } = await supabase
                                                .from('rcm')
                                                .delete()
                                                .eq('id', row.id);

                                            if (error) {
                                                throw error;
                                            }
                                            break; // Exit the loop once a matching row is found and updated
                                        }


                                    }
                                }

                                // Handle any error occurred during the operations
                                if (error) {
                                    throw error;
                                }

                                //return fetchedrcm;
                            } catch (error) {
                                console.error('Error fetching RCM data:', error.message);
                                // Handle errors (display message, retry logic)
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
                // Handle errors (display message, retry logic)
            }
        };

        const updateState = async () => {
            try {
                const booking = await fetchData();
                return booking;
            } catch (error) {
                console.error("Error fetching data:", error);
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
            <div id="map-section">
                <div className="map-information">
                    <p>Nestled amidst the verdant hills of Coorg, </p>
                    <p>Kodagu's captivating landscape, lies our homestay in Kedamalluru.</p>
                    <p> Just beyond the bustle of Virajpet, Kedamalluru unfolds, a tranquil haven where you'll find our home waiting to welcome you.</p>
                    <a target = "_blank" rel="noreferrer" href = "https://maps.app.goo.gl/iKeZKYX7rrkuHwKA8"><button className="take-me-there-btn">Take Me There</button></a>
                </div>
                <Map />
            </div>
            <Footer />
        </div>
    );
}

export default Home;