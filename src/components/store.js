import { create } from 'zustand'
import supabase from './supabase'

const useStore = create((set) => ({
    
    deluxeIddArray: [0, 1, 2, 3],
    familyIddArray: [4, 5],
    deluxeIdArrayCount: 0,
    incDeluxeIdArrayCount: () => set((state) => ({ deluxeIdArrayCount: state.deluxeIdArrayCount + 1 })),
    decDeluxeIdArrayCount: () => set((state) => ({ deluxeIdArrayCount: state.deluxeIdArrayCount - 1 })),
    familyIdArrayCount: 4,
    incFamilyIdArrayCount: () => set((state) => ({ familyIdArrayCount: state.familyIdArrayCount + 1 })),
    decFamilyIdArrayCount: () => set((state) => ({ familyIdArrayCount: state.familyIdArrayCount - 1 })),

    availableRoomCategory: [
        { id: 0, room_name: 'Deluxe Room', type: 'd', room_price: 0, isBreakfast: false },
        { id: 1, room_name: 'Deluxe Room', type: 'd', room_price: 0, isBreakfast: true },
        { id: 4, room_name: 'Family Room', type: 'f', room_price: 0, isBreakfast: false },
        { id: 5, room_name: 'Family Room', type: 'f', room_price: 0, isBreakfast: true },
    ],

    //This funtion is to retrieve the category prices from supabase table 'pcm' and set the availableRoomCategory prices in Zustand
    //Funtion is called in Booking.js - Line 37
    fetchPCMData: async () => {
        try {
            // Fetch data from Supabase table
            const { data, error } = await supabase.from('pcm').select('*');

            if (error) {
                throw error;
            }

            // Update store with fetched data
            set((state) => ({
                availableRoomCategory: state.availableRoomCategory.map((room, index) => {
                    // Update room_price based on index and data from Supabase
                    switch (index) {
                        case 0: // deluxe_room_only
                            return { ...room, room_price: data[0].deluxe_room_only };
                        case 1: // deluxe_breakfast
                            return { ...room, room_price: data[0].deluxe_breakfast };
                        case 2: // deluxe_breakfast
                            return { ...room, room_price: data[0].family_room_only };
                        case 3: // deluxe_breakfast
                            return { ...room, room_price: data[0].family_breakfast };
                        // Add more cases if needed for other room categories
                        default:
                            return room;
                    }
                })
            }));
        } catch (error) {
            console.error('Error fetching data:', error.message);
            alert('Error: We apologize, but we are currently unable to retrieve the necessary data from our server. This may be due to temporary server issues or network problems. \n What You Can Do: \n > Please try refreshing the page. \n > If the problem persists, try again later.')
            window.location.href = '/';
        }
    },

    startDate: new Date(),
    endDate: new Date(),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),

    //bookingCart: [{ id: 0, room_name: 'Deluxe Room', room_price: '1000', isBreakfast: true, type: 'd', checkIn: '2024-04-08', checkOut: '2024-04-09' }],
    bookingCart: [],

    addRoom: (roomData) => set((state) => ({ bookingCart: [...state.bookingCart, roomData] })),
    deleteRoom: (roomId) => set((state) => ({
        bookingCart: state.bookingCart.filter((product) => product.id !== roomId),
    })),

    updateCheckIn: (roomId, newCheckInDate) => set((state) => ({
        bookingCart: state.bookingCart.map((room) =>
            room.id === roomId ? { ...room, checkIn: newCheckInDate } : room
        ),
    })),

    updateCheckOut: (roomId, newCheckOutDate) => set((state) => ({
        bookingCart: state.bookingCart.map((room) =>
            room.id === roomId ? { ...room, checkOut: newCheckOutDate } : room
        ),
    })),

    updateAdult: (roomId, newAdultCount) => set((state) => ({ //here
        bookingCart: state.bookingCart.map((room) =>
            room.id === roomId ? { ...room, adultCount: newAdultCount } : room
        ),
    })),

    updateChildren: (roomId, newChildCount) => set((state) => ({
        bookingCart: state.bookingCart.map((room) =>
            room.id === roomId ? { ...room, childCount: newChildCount } : room
        ),
    })), //to here

    editIndex: null,
    setEditIndex: (index) => set({ editIndex: index }),

    guestName: null,
    guestEmail: null,
    guestPhone: null,
    setGuestName: (name) => set({ guestName: name }),
    setGuestEmail: (email) => set({ guestEmail: email }),
    setGuestPhone: (phone) => set({ guestPhone: phone }),
}))

export default useStore;