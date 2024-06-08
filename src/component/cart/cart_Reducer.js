const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                // If item already exists, update its quantity
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].quantity += 1;
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                // If item doesn't exist, add it to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
                };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };
        case 'INCREMENT':
            const incrementItemIndex = state.cartItems.findIndex(item => item.id === action.payload);
            if (incrementItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[incrementItemIndex] = {
                    ...updatedCartItems[incrementItemIndex],
                    quantity: updatedCartItems[incrementItemIndex].quantity + 1
                };
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }
            return state;
        case 'DECREMENT':
            const decrementItemIndex = state.cartItems.findIndex(item => item.id === action.payload);
            if (decrementItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                if (updatedCartItems[decrementItemIndex].quantity > 1) {
                    updatedCartItems[decrementItemIndex] = {
                        ...updatedCartItems[decrementItemIndex],
                        quantity: updatedCartItems[decrementItemIndex].quantity - 1
                    };
                } else {
                    // Remove the item if the quantity reaches 1 and the decrement action is triggered
                    updatedCartItems.splice(decrementItemIndex, 1);
                }
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }
            return state;
        default:
            return state;
    }
};

export default cartReducer;
