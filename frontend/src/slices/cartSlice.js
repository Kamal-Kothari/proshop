import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            //under action we want item to be added with qty
            const item = action.payload;
            console.log(item);

            // Check if the item is already in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                // If exists, update quantity
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                // If not exists, add new item to cartItems
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
            /*
            const existItem = state.cartItems.find(x => x._id === item._id);
            console.log(existItem);
            if(existItem){
                state.cartItems = state.cartItems.map(i => i._id === existItem._id ? item : i);
            }else{
                state.cartItems= [...state.cartItems,item];
                //state.cartItems.push(item); // This is fine in a Redux Toolkit slice
                //Safe, as Immer.js ensures immutability

            }

            console.log(state.cartItems);


            //all prices calculation
            // const result = Math.round(123.456 * 100) / 100; // 123.46

            //items price calculation
            state.itemsPrice = Number((state.cartItems.reduce((acc, curItem)=>{
                return acc + curItem.price * curItem.qty;
            },0)).toFixed(2));

            //shipping price calculation
            state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

            //tax price calculation
            state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
            //always use Number with toFixed as toFixed returns a string

            //total price calculation
            state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
            

            localStorage.setItem('cart', JSON.stringify(state));
            */

        },
        removeFromCart: (state, action) => {
            //under action we want id of the item to be removed
            const id = action.payload;
            state.cartItems = state.cartItems.filter(x => x._id !== id);
            return updateCart(state);
        },
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;