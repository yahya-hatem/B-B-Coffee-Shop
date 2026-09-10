import type {Coffee, Review, Category} from '../types';

export const IMAGES = {
  hero: require('../../assets/hero.png'),
  espresso: require('../../assets/espresso.png'),
  cappuccino: require('../../assets/cappuccino.png'),
  latte: require('../../assets/latte.png'),
  americano: require('../../assets/americano.png'),
  icedLatte: require('../../assets/iced-latte.png'),
  icedMocha: require('../../assets/iced-mocha.png'),
  coldBrew: require('../../assets/cold-brew.png'),
  mocha: require('../../assets/mocha.png'),
};

export const CATEGORY_OPTIONS: Category[] = [
  'Hot Coffee',
  'Cold Coffee',
  'Special Coffee',
];

export const INITIAL_COFFEES: Coffee[] = [
  {
    id: '1',
    name: 'Espresso',
    description: 'Strong and rich espresso made from premium coffee beans.',
    price: 3.5,
    category: 'Hot Coffee',
    image: IMAGES.espresso,
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Rich espresso with creamy milk foam.',
    price: 4.5,
    category: 'Hot Coffee',
    image: IMAGES.cappuccino,
  },
  {
    id: '3',
    name: 'Caffè Latte',
    description: 'Smooth espresso blended with warm steamed milk.',
    price: 5,
    category: 'Hot Coffee',
    image: IMAGES.latte,
  },
  {
    id: '4',
    name: 'Americano',
    description: 'Classic espresso with hot water for a smooth taste.',
    price: 3.8,
    category: 'Hot Coffee',
    image: IMAGES.americano,
  },
  {
    id: '5',
    name: 'Iced Latte',
    description: 'Cold espresso with milk and refreshing ice.',
    price: 5.2,
    category: 'Cold Coffee',
    image: IMAGES.icedLatte,
  },
  {
    id: '6',
    name: 'Iced Mocha',
    description: 'Chocolate, espresso and milk served over ice.',
    price: 5.8,
    category: 'Cold Coffee',
    image: IMAGES.icedMocha,
  },
  {
    id: '7',
    name: 'Cold Brew',
    description: 'Slow brewed coffee with a smooth and refreshing taste.',
    price: 5,
    category: 'Cold Coffee',
    image: IMAGES.coldBrew,
  },
  {
    id: '8',
    name: 'Mocha',
    description: 'Delicious espresso combined with chocolate and milk.',
    price: 5.5,
    category: 'Special Coffee',
    image: IMAGES.mocha,
  },
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Sarah',
    rating: 5,
    text: 'Amazing coffee and a beautiful experience!',
  },
  {
    id: '2',
    name: 'Ahmed',
    rating: 5,
    text: 'The cappuccino is one of the best I have ever tried.',
  },
  {
    id: '3',
    name: 'Maya',
    rating: 4,
    text: 'Great taste, friendly service and lovely atmosphere.',
  },
];
