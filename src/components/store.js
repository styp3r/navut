import { create } from 'zustand'

const useStore = create((set) => ({
    availableRooms: [
        { id: 0, room_name: 'Deluxe Room', count: 1, room_price: 1000 },
        { id: 1, room_name: 'Deluxe Room (Breakfast Included)', count: 1, room_price: 1500 },
        { id: 2, room_name: 'Family Room', count: 1, room_price: 2000 },
        { id: 3, room_name: 'Family Room (Breakfast Included)', count: 1, room_price: 2500 },
    ],

    startDate: new Date(),
    endDate: new Date(),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),

    //bookingCart: [{ id: 0, room_name: 'Deluxe Room', room_price: '1000', checkIn: '2024-04-08', checkOut: '2024-04-09', nights: 1 }],
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

    inc: (roomId, count) => set((state) => ({
        bookingCart: state.bookingCart.map((room) =>
            room.id === roomId && count < 4 ? { ...room, count: count + 1 } : room
        ),
    })),

    dec: (roomId, count) => set((state) => ({
        bookingCart: state.bookingCart.map((room) =>
            room.id === roomId && count > 1 ? { ...room, count: count - 1 } : room
        ),
    })),
}))

export default useStore;