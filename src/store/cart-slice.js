import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },

  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, actions) {
      const newItem = actions.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
    },

    removeItemFromCart(state, actions) {
      const id = actions.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const fetchCartData = () => async (dispatch) => {
  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cart.json`);

    if (!res.ok) {
      throw new Error('There was an error sending cart data');
    }

    const data = await res.json();

    return data;
  };

  try {
    const cartData = await fetchData();
    console.log(cartData);

    dispatch(
      cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      uiActions.showNotifications({
        status: 'error',
        title: 'Error!',
        message: 'Fetching cart data failed!',
      })
    );
  }
};

// Actions creator thunk
export const sendCartData = (cart) => async (dispatch) => {
  dispatch(
    uiActions.showNotifications({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data',
    })
  );

  const sendRequest = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cart.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/jsonm',
      },
      body: JSON.stringify(cart),
    });

    if (!res.ok) {
      throw new Error('There was an error sending cart data');
    }
  };

  try {
    await sendRequest();

    dispatch(
      uiActions.showNotifications({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully',
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      uiActions.showNotifications({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
      })
    );
  }
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
