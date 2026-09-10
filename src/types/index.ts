export type Category = 'Hot Coffee' | 'Cold Coffee' | 'Special Coffee';

export type Coffee = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: any;
  quantity?: number;
};

export type CartItem = Coffee & {
  quantity: number;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
};
