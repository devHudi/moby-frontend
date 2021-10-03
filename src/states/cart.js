import { atom } from 'recoil';

export const cartState = atom({
  key: 'cart',
  default: {
    itemId: null,
    quantity: 0,
    totalPrice: 0,
  },
});
