import { create } from 'zustand'

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
        { id: 0, room_name: 'Deluxe Room ', type: 'd', room_price: 1000, isBreakfast: false },
        { id: 1, room_name: 'Deluxe Room ', type: 'd', room_price: 1500, isBreakfast: true },
        { id: 11, room_name: 'Family Room ', type: 'f', room_price: 2000, isBreakfast: false },
        { id: 12, room_name: 'Family Room ', type: 'f', room_price: 2500, isBreakfast: true },
    ],

    deluxeCount: 4,
    familyCount: 2,
    incDC: () => set((state) => ({ deluxeCount: state.deluxeCount + 1 })),
    decDC: () => set((state) => ({ deluxeCount: state.deluxeCount - 1 })),
    incFC: () => set((state) => ({ familyCount: state.familyCount + 1 })),
    decFC: () => set((state) => ({ familyCount: state.familyCount - 1 })),

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