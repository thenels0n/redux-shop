import * as actionTypes from './shopping-types'
//import { requestProducts } from '../actions'

const INITIAL_STATE = {
    products: [
        {
            id: 1,
            title: 'This is product one',
            description: 'This is product one description',
            price: '2800'
        },
        {
            id: 2,
            title: 'This is product two',
            description: 'This is product two description',
            price: '2800'
        },
        {
            id: 3,
            title: 'This is product three',
            description: 'This is product three description',
            price: '2800'
        },
    ],  // {id, title, desc, price}
    cart: [], // {id, title, desc, price, qty}
    currentItem: null
}

export const shopReducer = (state = INITIAL_STATE, action) => { 
    switch (action.type) { 
        case actionTypes.ADD_TO_CART:
            // Get the Item data from the products
            const item = state.products.find(product => product.id === action.payload.id)
            // Check if the item is already in the cart
            const inCart = state.cart.find(item => item.id === action.payload.id ? true : false)
            return {
                ...state,
                cart: inCart ? state.cart.map(
                        item => item.id === action.payload.id ? 
                        {...item, qty: item.qty + 1} : 
                    item 
                ) : 
                [...state.cart, {...item, qty: + 1}]
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            }
        case actionTypes.ADJUST_QTY: 
            return {
                ...state,
                cart: state.cart.map(
                    item => item.id === action.payload.id ? 
                    {...item, qty: +action.payload.qty} 
                    : 
                    item
                )
            }
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            }
        default:
            return state
    }
}


export default shopReducer;