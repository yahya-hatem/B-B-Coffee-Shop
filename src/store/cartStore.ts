import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import type {CartItem, Coffee} from '../types';

type CartStore = {
  cart: CartItem[];
  hasHydrated: boolean;
  addToCart: (coffee: Coffee) => void;
  increaseQuantity: (coffeeId: string) => void;
  decreaseQuantity: (coffeeId: string) => void;
  removeFromCart: (coffeeId: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getSubtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      hasHydrated: false,
      addToCart: coffee =>
        set(state => {
          const existingItem = state.cart.find(item => item.id === coffee.id);

          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                item.id === coffee.id
                  ? {...item, quantity: item.quantity + 1}
                  : item,
              ),
            };
          }

          return {cart: [...state.cart, {...coffee, quantity: 1}]};
        }),
      increaseQuantity: coffeeId =>
        set(state => ({
          cart: state.cart.map(item =>
            item.id === coffeeId
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        })),
      decreaseQuantity: coffeeId =>
        set(state => ({
          cart: state.cart.flatMap(item => {
            if (item.id !== coffeeId) {
              return [item];
            }

            return item.quantity > 1
              ? [{...item, quantity: item.quantity - 1}]
              : [];
          }),
        })),
      removeFromCart: coffeeId =>
        set(state => ({
          cart: state.cart.filter(item => item.id !== coffeeId),
        })),
      clearCart: () => set({cart: []}),
      getCartCount: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),
      getSubtotal: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: 'brew-and-bean-cart',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({cart: state.cart}),
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.warn('Could not restore cart from storage:', error);
        }

        useCartStore.setState({hasHydrated: true});
      },
    },
  ),
);
