import { create } from 'zustand'

const useStore = create((set) => ({
    availableRooms: [
        { id: 0, room_name: 'Deluxe Room', room_price: 1000, isBreakfast: false },
        { id: 1, room_name: 'Deluxe Room', room_price: 1500, isBreakfast: true },
        { id: 2, room_name: 'Family Room', room_price: 2000, isBreakfast: false },
        { id: 3, room_name: 'Family Room', room_price: 2500, isBreakfast: true },
    ],

    startDate: new Date(),
    endDate: new Date(),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),

    //bookingCart: [{ id: 0, room_name: 'Deluxe Room', room_price: '1000', checkIn: '2024-04-08', checkOut: '2024-04-09', nights: 1, isBreakfast: false }],
    bookingCart: [],

    addRoom: (roomData) => set((state) => ({ bookingCart: [...state.bookingCart, roomData] })),

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

    editIndex: null,
    setEditIndex: (index) => set({ editIndex: index }),
}))

export default useStore;