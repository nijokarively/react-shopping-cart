// Cart reducer implementation

// Storing cart data into local storage. For more info: [localStorage] https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const storeItems = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}

// Calculating total cart information
export const sumItems = (cartItems) => {
    storeItems(cartItems);
    let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
    let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    return { itemCount, total }
}

// Cart reducer for cart state changes
export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (!state.cartItems.find(item => item.id === action.payload.id)) {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1
                })
            } 

            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "REMOVE_ITEM":
            return {
                ...state,
                ...sumItems(state.cartItems.filter(item => item.id !== action.payload.id)),
                cartItems: [...state.cartItems.filter(item => item.id !== action.payload.id)]
            }
        case "INCREASE":
            state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity++
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "DECREASE":
            state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity--
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems]
            }
        case "CHECKOUT":
            return {
                cartItems: [],
                checkout: true,
                ...sumItems([]),
            }
        case "CLEAR":
                return {
                    cartItems: [],
                    ...sumItems([]),
                }
        default:
            return state

    }
}