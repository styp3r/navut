import { create } from 'zustand'

const useStore = create((set) => ({
    startDate: null,
    endDate: null,
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),

    bookingCart: [{ id: 0, room_name: 'Deluxe Room', room_price: '1000', checkIn: '2024-04-08', checkOut: '2024-04-09', nights: 1 }],
    //bookingCart: [],

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