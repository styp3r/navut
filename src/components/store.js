import { create } from 'zustand'

const useStore = create((set) => ({
    availableRooms: [
        { id: 0, room_name: 'Deluxe Room', count: 1, room_price: 1000, isSelected: false },
        { id: 1, room_name: 'Deluxe Room (Breakfast Included)', count: 1, room_price: 1500, isSelected: false },
        { id: 2, room_name: 'Family Room', count: 1, room_price: 2000, isSelected: false },
        { id: 3, room_name: 'Family Room (Breakfast Included)', count: 1, room_price: 2500, isSelected: false },
    ],

    startDate: new Date(),
    endDate: new Date(),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),

    //bookingCart: [{ id: 0, room_name: 'Deluxe Room', room_price: '1000', checkIn: '2024-04-08', checkOut: '2024-04-09', nights: 1 }],
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

    setIsSelected: (roomId) => set((state) => ({
        availableRooms: state.availableRooms.map((room) =>
            room.id === roomId ? { ...room, isSelected: true } : room
        ),
    })),
    setIsNotSelected: (roomId) => set((state) => ({
        availableRooms: state.availableRooms.map((room) =>
            room.id === roomId ? { ...room, isSelected: false } : room
        ),
    })),

    guestName: null,
    guestEmail: null,
    guestPhone: null,
    setGuestName: (name) => set({ guestName: name }),
    setGuestEmail: (email) => set({ guestEmail: email }),
    setGuestPhone: (phone) => set({ guestPhone: phone }),
}))

export default useStore;