import {createSlice} from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state,action)=>{
            const item = action.payload;
            console.log(item);
            
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
            //items price calculation
            state.itemsPrice = state.cartItems.reduce((acc, curItem)=>{
                return acc + curItem.price * curItem.qty;
            },0);

            //shipping price calculation
            state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

            //tax price calculation
            state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
            //always use Number with toFixed as toFixed returns a string

            //total price calculation
            state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
            

            localStorage.setItem('cart', JSON.stringify(state));
            
        }
    }
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;