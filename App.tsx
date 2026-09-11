import React, {ReactNode, useEffect, useMemo, useState} from 'react';

import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {MaterialIcons} from '@react-native-vector-icons/material-icons';

import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {CartItem as CartListItem} from './src/components/CartItem';
import {CoffeeCard} from './src/components/CoffeeCard';
import {CustomButton} from './src/components/CustomButton';
import {CustomInput} from './src/components/CustomInput';
import {Loading} from './src/components/Loading';
import {ThemeProvider} from './src/context/ThemeContext';
import {IMAGES, INITIAL_COFFEES, REVIEWS} from './src/data/initialData';
import {useTheme} from './src/hooks/useTheme';
import api from './src/services/api';
import {useCartStore} from './src/store/cartStore';
import type {Category, Coffee} from './src/types';

const Tab = createBottomTabNavigator();

/* =====================================================
   REUSABLE SECTION
   children PROP
===================================================== */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.sectionSubtitle}>
          {subtitle}
        </Text>
      )}

      {children}
    </View>
  );
}

function addCoffeeToCart(
  coffee: Coffee,
  addToCart: (coffee: Coffee) => void,
) {
  addToCart(coffee);
  Alert.alert(
    'Added to Cart',
    `${coffee.name} has been added to your cart.`,
  );
}

/* =====================================================
   HOME SCREEN
===================================================== */

function HomeScreen({
  coffees,
}: {
  coffees: Coffee[];
}) {
  const navigation = useNavigation<any>();
  const {darkMode, toggleTheme} = useTheme();
  const cart = useCartStore(state => state.cart);
  const addToCart = useCartStore(state => state.addToCart);
  const handleAddToCart = (coffee: Coffee) =>
    addCoffeeToCart(coffee, addToCart);

  const popularCoffees = coffees.slice(0, 4);
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <StatusBar
        barStyle={
          darkMode
            ? 'light-content'
            : 'dark-content'
        }
      />

      <SafeAreaView
        style={[
          styles.safeArea,
          darkMode && styles.darkBackground,
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }>

          {/* HEADER */}

          <View style={styles.header}>
            <View>
              <Text
                style={[
                  styles.logo,
                  darkMode && styles.darkText,
                ]}>
                B&B
              </Text>

              <Text style={styles.logoSubtitle}>
                COFFEE SHOP
              </Text>
            </View>

            <View style={styles.headerActions}>
              <Pressable
                style={styles.themeButton}
                onPress={toggleTheme}>
                <MaterialIcons
                  name={
                    darkMode
                      ? 'light-mode'
                      : 'dark-mode'
                  }
                  size={22}
                  color="#4A2C20"
                />
              </Pressable>

              <Pressable
                style={styles.headerCart}
                onPress={() => navigation.navigate('Cart')}>
                <MaterialIcons
                  name="shopping-cart"
                  size={25}
                  color="#4A2C20"
                />

                {cart.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {cartCount}
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          {/* HERO */}

          <View style={styles.hero}>
            <Text style={styles.smallTitle}>
              WELCOME TO
            </Text>

            <Text
              style={[
                styles.heroTitle,
                darkMode && styles.darkText,
              ]}>
              B&B Coffee
            </Text>

            <Text
              style={[
                styles.heroSubtitle,
                darkMode && styles.darkSecondaryText,
              ]}>
              Fresh Coffee.{'\n'}
              Better Moments.
            </Text>

            <Text
              style={[
                styles.description,
                darkMode && styles.darkMutedText,
              ]}>
              Discover delicious coffee made with
              carefully selected beans and served with
              passion.
            </Text>

            <CustomButton
              title="Explore Menu"
              icon="arrow-forward"
              onPress={() =>
                navigation.navigate('Menu')
              }
            />
          </View>

          {/* HERO IMAGE */}

          <View style={styles.heroImageContainer}>
            <Image
              source={IMAGES.hero}
              style={styles.heroImage}
            />
          </View>

          {/* POPULAR */}

          <Section
            title="Popular Coffee"
            subtitle="Our customers' favorite choices">

            <View style={styles.popularGrid}>
              {popularCoffees.map(coffee => (
                <CoffeeCard
                  key={coffee.id}
                  coffee={coffee}
                  onAdd={handleAddToCart}
                  compact
                />
              ))}
            </View>
          </Section>

          {/* ABOUT */}

          <View
            style={[
              styles.aboutSection,
              darkMode &&
                styles.darkAboutSection,
            ]}>
            <Text style={styles.smallTitle}>
              OUR STORY
            </Text>

            <Text
              style={[
                styles.aboutTitle,
                darkMode && styles.darkText,
              ]}>
              More Than Just Coffee
            </Text>

            <Text
              style={[
                styles.aboutText,
                darkMode && styles.darkMutedText,
              ]}>
              At B&B Coffee, we believe that coffee is
              not just a drink. It is a moment to relax,
              connect and enjoy.
            </Text>

            <Text
              style={[
                styles.aboutText,
                darkMode && styles.darkMutedText,
              ]}>
              We carefully select quality coffee beans
              and prepare every cup with passion to give
              you the perfect coffee experience.
            </Text>

            <View style={styles.founderBox}>
              <MaterialIcons
                name="person"
                size={35}
                color="#4A2C20"
              />

              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  Our Founder
                </Text>

                <Text style={styles.featureText}>
                  Building better coffee moments, one
                  cup at a time.
                </Text>
              </View>
            </View>
          </View>

          {/* WHY B&B */}

          <Section title="Why B&B Coffee?">
            {[
              {
                icon: 'eco',
                title: 'Quality Beans',
                text:
                  'Carefully selected coffee beans for a rich and delicious taste.',
              },

              {
                icon: 'favorite',
                title: 'Made With Love',
                text:
                  'Every cup is prepared with care and passion.',
              },

              {
                icon: 'bolt',
                title: 'Fresh Every Day',
                text:
                  'Freshly prepared coffee whenever you need it.',
              },
            ].map(feature => (
              <View
                key={feature.title}
                style={styles.feature}>

                <View
                  style={styles.featureIconBox}>
                  <MaterialIcons
                    name={feature.icon as any}
                    size={27}
                    color="#4A2C20"
                  />
                </View>

                <View
                  style={styles.featureContent}>
                  <Text
                    style={styles.featureTitle}>
                    {feature.title}
                  </Text>

                  <Text
                    style={styles.featureText}>
                    {feature.text}
                  </Text>
                </View>
              </View>
            ))}
          </Section>

          {/* REVIEWS */}

          <Section
            title="Customer Reviews"
            subtitle="What our customers say">

            {REVIEWS.map(review => (
              <View
                key={review.id}
                style={styles.reviewCard}>

                <View
                  style={styles.reviewHeader}>
                  <View style={styles.avatar}>
                    <Text
                      style={styles.avatarText}>
                      {review.name.charAt(0)}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={styles.reviewName}>
                      {review.name}
                    </Text>

                    <View
                      style={styles.starRow}>
                      {[1, 2, 3, 4, 5].map(
                        star => (
                          <MaterialIcons
                            key={`${review.id}-${star}`}
                            name={
                              star <= review.rating
                                ? 'star'
                                : 'star-border'
                            }
                            size={16}
                            color="#9A6B4F"
                          />
                        ),
                      )}
                    </View>
                  </View>
                </View>

                <Text style={styles.reviewText}>
                  "{review.text}"
                </Text>
              </View>
            ))}
          </Section>

          {/* CTA */}

          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>
              Ready for Your Next Coffee?
            </Text>

            <Text style={styles.ctaText}>
              Make every moment better with B&B Coffee.
            </Text>

            <CustomButton
              title="Order Now"
              icon="shopping-cart"
              onPress={() =>
                navigation.navigate('Menu')
              }
            />
          </View>

          {/* FOOTER */}

          <View style={styles.footer}>
            <Text style={styles.footerLogo}>
              B&B Coffee
            </Text>

            <Text style={styles.footerText}>
              Fresh Coffee • Better Moments
            </Text>

            <Text style={styles.copyright}>
              © 2026 B&B Coffee Shop
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

/* =====================================================
   CART SCREEN
===================================================== */

function CartScreen() {
  const {darkMode} = useTheme();
  const cart = useCartStore(state => state.cart);
  const increaseQuantity = useCartStore(state => state.increaseQuantity);
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={[styles.safeArea, darkMode && styles.darkBackground]}>
        <FlatList
          data={cart}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.cartContent}
          ListHeaderComponent={
            <View style={styles.cartHeader}>
              <Text style={styles.smallTitle}>B&B CHECKOUT</Text>
              <Text style={[styles.bigPageTitle, darkMode && styles.darkText]}>
                Your Cart
              </Text>
              <Text style={[styles.pageSubtitle, darkMode && styles.darkMutedText]}>
                Review your coffee order before paying.
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyCart}>
              <MaterialIcons name="shopping-cart" size={58} color="#9A6B4F" />
              <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
              <Text style={styles.emptyCartText}>
                Add a coffee from the Menu tab to get started.
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <CartListItem
              item={item}
              onIncrease={() => increaseQuantity(item.id)}
              onDecrease={() => decreaseQuantity(item.id)}
              onRemove={() => removeFromCart(item.id)}
            />
          )}
          ListFooterComponent={
            cart.length > 0 ? (
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery</Text>
                  <Text style={styles.freeText}>FREE</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
                </View>
                <CustomButton
                  title="Go to Pay"
                  icon="payment"
                  onPress={() =>
                    Alert.alert('Payment', 'Payment flow is ready for your order.')
                  }
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Clear cart"
                  style={styles.clearCartButton}
                  onPress={clearCart}>
                  <Text style={styles.clearCartText}>Clear Cart</Text>
                </Pressable>
              </View>
            ) : undefined
          }
        />
      </SafeAreaView>
    </>
  );
}

/* =====================================================
   ADD COFFEE SCREEN
===================================================== */

function AddCoffeeScreen({
  addCoffee,
}: {
  addCoffee: (
    name: string,
    price: string,
    description: string,
    category: Category,
  ) => void;
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] =
    useState('');

  const [category, setCategory] =
    useState<Category>('Hot Coffee');

  const {darkMode} = useTheme();

  const submitCoffee = () => {
    if (
      !name.trim() ||
      !price.trim() ||
      !description.trim()
    ) {
      Alert.alert(
        'Missing Information',
        'Please complete all fields.',
      );

      return;
    }

    const numericPrice = Number(price);

    if (
      Number.isNaN(numericPrice) ||
      numericPrice <= 0
    ) {
      Alert.alert(
        'Invalid Price',
        'Please enter a valid price.',
      );

      return;
    }

    addCoffee(
      name,
      price,
      description,
      category,
    );

    Alert.alert(
      'Coffee Added',
      `${name} has been added to your Menu.`,
    );

    setName('');
    setPrice('');
    setDescription('');
    setCategory('Hot Coffee');
  };

  return (
    <>
      <StatusBar
        barStyle={
          darkMode
            ? 'light-content'
            : 'dark-content'
        }
      />

      <SafeAreaView
        style={[
          styles.safeArea,
          darkMode && styles.darkBackground,
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formScroll}>

          <Text style={styles.smallTitle}>
            B&B COFFEE
          </Text>

          <Text
            style={[
              styles.bigPageTitle,
              darkMode && styles.darkText,
            ]}>
            Add New Coffee
          </Text>

          <Text
            style={[
              styles.pageSubtitle,
              darkMode && styles.darkMutedText,
            ]}>
            Create a new coffee and add it to your
            menu.
          </Text>

          <View style={styles.formCard}>

            <CustomInput
              label="Coffee Name"
              placeholder="Example: Caramel Latte"
              value={name}
              onChangeText={setName}
            />

            <CustomInput
              label="Price"
              placeholder="Example: 5.50"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />

            <CustomInput
              label="Description"
              placeholder="Describe your coffee"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={styles.inputLabel}>
              Category
            </Text>

            <View
              style={styles.categoryButtons}>
              {(
                [
                  'Hot Coffee',
                  'Cold Coffee',
                  'Special Coffee',
                ] as Category[]
              ).map(item => (
                <Pressable
                  key={item}
                  style={[
                    styles.categoryButton,
                    category === item &&
                      styles.categoryButtonActive,
                  ]}
                  onPress={() =>
                    setCategory(item)
                  }>

                  <View
                    style={
                      styles.categoryButtonContent
                    }>
                    <MaterialIcons
                      name={
                        item === 'Hot Coffee'
                          ? 'local-cafe'
                          : item === 'Cold Coffee'
                          ? 'ac-unit'
                          : 'star'
                      }
                      size={18}
                      color={
                        category === item
                          ? '#FFFFFF'
                          : '#4A2C20'
                      }
                    />

                    <Text
                      style={[
                        styles.categoryButtonText,
                        category === item &&
                          styles.categoryButtonTextActive,
                      ]}>
                      {item === 'Hot Coffee'
                        ? 'Hot'
                        : item === 'Cold Coffee'
                        ? 'Cold'
                        : 'Special'}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            <CustomButton
              title="Add Coffee"
              icon="add-circle-outline"
              onPress={submitCoffee}
            />
          </View>

          <View style={styles.tipBox}>
            <MaterialIcons
              name="local-cafe"
              size={42}
              color="#4A2C20"
            />

            <Text style={styles.tipTitle}>
              Make Your Menu Better
            </Text>

            <Text style={styles.tipText}>
              Your new coffee will automatically appear
              in the Menu tab.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

/* =====================================================
   MENU SCREEN
===================================================== */

function MenuScreen({
  coffees,
}: {
  coffees: Coffee[];
}) {
  const {darkMode} = useTheme();
  const addToCart = useCartStore(state => state.addToCart);
  const handleAddToCart = (coffee: Coffee) =>
    addCoffeeToCart(coffee, addToCart);

  const sections = useMemo(() => {
    const categories: Category[] = [
      'Hot Coffee',
      'Cold Coffee',
      'Special Coffee',
    ];

    return categories
      .map(category => ({
        title: category,
        data: coffees.filter(
          coffee => coffee.category === category,
        ),
      }))
      .filter(
        section => section.data.length > 0,
      );
  }, [coffees]);

  const featured = coffees.slice(0, 5);

  return (
    <>
      <StatusBar
        barStyle={
          darkMode
            ? 'light-content'
            : 'dark-content'
        }
      />

      <SafeAreaView
        style={[
          styles.safeArea,
          darkMode && styles.darkBackground,
        ]}>
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.menuContent
          }

          renderSectionHeader={({
            section,
          }) => (
            <View style={styles.sectionHeader}>
              <MaterialIcons
                name={
                  section.title === 'Hot Coffee'
                    ? 'local-cafe'
                    : section.title ===
                      'Cold Coffee'
                    ? 'ac-unit'
                    : 'star'
                }
                size={24}
                color="#4A2C20"
              />

              <Text
                style={
                  styles.sectionHeaderText
                }>
                {section.title}
              </Text>
            </View>
          )}

          renderItem={({item}) => (
            <CoffeeCard
              coffee={item}
              onAdd={handleAddToCart}
            />
          )}

          ListHeaderComponent={
            <View>
              <Text style={styles.smallTitle}>
                B&B MENU
              </Text>

              <Text
                style={[
                  styles.bigPageTitle,
                  darkMode && styles.darkText,
                ]}>
                Our Coffee Collection
              </Text>

              <Text
                style={[
                  styles.pageSubtitle,
                  darkMode &&
                    styles.darkMutedText,
                ]}>
                Explore our favorite coffee choices.
              </Text>

              <Text
                style={[
                  styles.menuSectionTitle,
                  darkMode && styles.darkText,
                ]}>
                Featured Coffee
              </Text>

              <FlatList
                data={featured}
                horizontal
                showsHorizontalScrollIndicator={
                  false
                }
                keyExtractor={item =>
                  `featured-${item.id}`
                }
                renderItem={({item}) => (
                  <View
                    style={styles.featuredCard}>
                    <Image
                      source={item.image}
                      style={
                        styles.featuredImage
                      }
                    />

                    <Text
                      style={
                        styles.featuredName
                      }>
                      {item.name}
                    </Text>

                    <Text
                      style={
                        styles.featuredPrice
                      }>
                      ${item.price.toFixed(2)}
                    </Text>

                    <Pressable
                      style={
                        styles.featuredButton
                      }
                      onPress={() =>
                        handleAddToCart(item)
                      }>
                      <Text
                        style={
                          styles.featuredButtonText
                        }>
                        Add
                      </Text>

                      <MaterialIcons
                        name="add"
                        size={17}
                        color="#FFFFFF"
                      />
                    </Pressable>
                  </View>
                )}
              />

              <Text
                style={[
                  styles.menuSectionTitle,
                  darkMode && styles.darkText,
                ]}>
                Coffee Categories
              </Text>
            </View>
          }

          ListFooterComponent={
            <View style={styles.menuFooter}>
              <MaterialIcons
                name="local-cafe"
                size={42}
                color="#4A2C20"
              />

              <Text
                style={styles.menuFooterTitle}>
                Fresh Coffee, Better Moments
              </Text>

              <Text
                style={styles.menuFooterText}>
                Choose your favorite coffee and add it
                to your cart.
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </>
  );
}

/* =====================================================
   MAIN APP
===================================================== */

function App() {
  const [coffees, setCoffees] =
    useState<Coffee[]>([]);

  const cart = useCartStore(state => state.cart);
  const hasHydrated = useCartStore(state => state.hasHydrated);

  const [loading, setLoading] =
    useState(true);

  const [_apiError, setApiError] =
    useState('');

  /* =====================================================
     useEffect + Axios GET
  ===================================================== */

  useEffect(() => {
    const loadCoffeeMenu = async () => {
      try {
        setLoading(true);
        setApiError('');

        const response =
          await api.get('/hot');

        const apiCoffees =
          response.data;

        const loadedCoffees: Coffee[] =
          apiCoffees
            .slice(0, 8)
            .map(
              (
                item: any,
                index: number,
              ) => ({
                id: `api-${item.id ?? index}`,

                name:
                  item.title ||
                  `Coffee ${index + 1}`,

                description:
                  item.description ||
                  'Delicious coffee prepared with care.',

                price:
                  3.5 + index * 0.5,

                category: 'Hot Coffee',

                image:
                  INITIAL_COFFEES[
                    index %
                      INITIAL_COFFEES.length
                  ].image,
              }),
            );

        if (loadedCoffees.length > 0) {
          setCoffees([
            ...loadedCoffees,
            ...INITIAL_COFFEES.filter(
              coffee => coffee.category !== 'Hot Coffee',
            ),
          ]);
        } else {
          setCoffees(INITIAL_COFFEES);
        }
      } catch (error) {
        console.log(
          'Coffee API Error:',
          error,
        );

        setApiError(
          'Could not load coffee from API. Showing local menu.',
        );

        setCoffees(INITIAL_COFFEES);
      } finally {
        setLoading(false);
      }
    };

    loadCoffeeMenu();
  }, []);

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  /* =====================================================
     ADD NEW COFFEE
  ===================================================== */

  const addCoffee = (
    name: string,
    price: string,
    description: string,
    category: Category,
  ) => {
    const newCoffee: Coffee = {
      id: Date.now().toString(),

      name: name.trim(),

      description: description.trim(),

      price: Number(price),

      category,

      image: IMAGES.mocha,
    };

    setCoffees(previousCoffees => [
      ...previousCoffees,
      newCoffee,
    ]);
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading || !hasHydrated) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,

            tabBarActiveTintColor: '#4A2C20',

            tabBarInactiveTintColor: '#A09690',

            tabBarStyle: styles.tabBar,

            tabBarLabelStyle:
              styles.tabLabel,

            tabBarHideOnKeyboard: true,
          }}>

          {/* HOME */}

          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: ({color}) => (
                <MaterialIcons
                  name="home"
                  size={27}
                  color={color}
                />
              ),
            }}>
            {() => (
              <HomeScreen
                coffees={coffees}
              />
            )}
          </Tab.Screen>

          {/* ADD COFFEE */}

          <Tab.Screen
            name="Add Coffee"
            options={{
              tabBarIcon: ({color}) => (
                <MaterialIcons
                  name="add-circle-outline"
                  size={29}
                  color={color}
                />
              ),
            }}>
            {() => (
              <AddCoffeeScreen
                addCoffee={addCoffee}
              />
            )}
          </Tab.Screen>

          {/* MENU */}

          <Tab.Screen
            name="Menu"
            options={{
              tabBarIcon: ({color}) => (
                <MaterialIcons
                  name="local-cafe"
                  size={27}
                  color={color}
                />
              ),
            }}>
            {() => (
              <MenuScreen
                coffees={coffees}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Cart"
            options={{
              tabBarIcon: ({color}) => (
                <MaterialIcons
                  name="shopping-cart"
                  size={27}
                  color={color}
                />
              ),
              tabBarBadge: cartCount > 0 ? cartCount : undefined,
              tabBarBadgeStyle: styles.tabBadge,
            }}>
            {() => (
              <CartScreen
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F3ED',
  },

  darkBackground: {
    backgroundColor: '#211712',
  },

  darkText: {
    color: '#FFFFFF',
  },

  darkSecondaryText: {
    color: '#D8BBA5',
  },

  darkMutedText: {
    color: '#C0B5AE',
  },

  scrollContent: {
    paddingBottom: 35,
  },

  formScroll: {
    padding: 24,
    paddingBottom: 50,
  },

  menuContent: {
    padding: 24,
    paddingBottom: 50,
  },

  cartContent: {
    padding: 24,
    paddingBottom: 45,
  },

  cartHeader: {
    marginBottom: 12,
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },

  cartImage: {
    width: 78,
    height: 78,
    borderRadius: 15,
    resizeMode: 'cover',
  },

  cartItemInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },

  cartItemName: {
    color: '#4A2C20',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },

  cartItemPrice: {
    color: '#9A6B4F',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },

  cartItemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },

  cartLineTotal: {
    color: '#4A2C20',
    fontSize: 15,
    fontWeight: '900',
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#4A2C20',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityText: {
    minWidth: 27,
    color: '#4A2C20',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },

  emptyCart: {
    alignItems: 'center',
    paddingVertical: 65,
    paddingHorizontal: 25,
  },

  emptyCartTitle: {
    color: '#4A2C20',
    fontSize: 23,
    fontWeight: '900',
    marginTop: 15,
    marginBottom: 8,
  },

  emptyCartText: {
    color: '#77706B',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },

  summaryCard: {
    backgroundColor: '#E8D8C8',
    borderRadius: 22,
    padding: 20,
    marginTop: 10,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  summaryLabel: {
    color: '#6E5142',
    fontSize: 15,
    fontWeight: '700',
  },

  summaryValue: {
    color: '#4A2C20',
    fontSize: 15,
    fontWeight: '800',
  },

  freeText: {
    color: '#6C8B57',
    fontSize: 15,
    fontWeight: '900',
  },

  summaryDivider: {
    borderTopWidth: 1,
    borderTopColor: '#D4BEAB',
    marginBottom: 15,
  },

  totalLabel: {
    color: '#4A2C20',
    fontSize: 19,
    fontWeight: '900',
  },

  totalValue: {
    color: '#4A2C20',
    fontSize: 21,
    fontWeight: '900',
  },

  clearCartButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },

  clearCartText: {
    color: '#9A6B4F',
    fontSize: 14,
    fontWeight: '800',
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 15,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  logo: {
    fontSize: 30,
    fontWeight: '900',
    color: '#4A2C20',
  },

  logoSubtitle: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#9A6B4F',
  },

  themeButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E8D8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerCart: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8D8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badge: {
    position: 'absolute',
    right: -2,
    top: -3,
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: '#9A6B4F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },

  /* HERO */

  hero: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 30,
  },

  heroTitle: {
    fontSize: 45,
    fontWeight: '900',
    color: '#3A2118',
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 27,
    lineHeight: 36,
    fontWeight: '800',
    color: '#7A4E38',
    marginBottom: 17,
  },

  smallTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#9A6B4F',
    marginBottom: 9,
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
    color: '#6E625B',
    marginBottom: 23,
  },

  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#4A2C20',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  buttonIcon: {
    marginLeft: 8,
  },

  heroImageContainer: {
    marginHorizontal: 24,
    marginBottom: 42,
    borderRadius: 28,
    overflow: 'hidden',
  },

  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },

  /* SECTION */

  section: {
    paddingHorizontal: 24,
    marginBottom: 42,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#3A2118',
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 15,
    color: '#7B7069',
    marginBottom: 20,
  },

  /* POPULAR */

  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  popularCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
  },

  popularImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: 'cover',
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 7,
  },

  cardPrice: {
    fontSize: 17,
    fontWeight: '900',
    color: '#9A6B4F',
  },

  smallAddButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#4A2C20',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ABOUT */

  aboutSection: {
    marginHorizontal: 24,
    marginBottom: 45,
    backgroundColor: '#E8D8C8',
    borderRadius: 28,
    padding: 25,
  },

  darkAboutSection: {
    backgroundColor: '#3A2922',
  },

  aboutTitle: {
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '900',
    color: '#3A2118',
    marginBottom: 15,
  },

  aboutText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#6E5142',
    marginBottom: 13,
  },

  founderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F3ED',
    borderRadius: 18,
    padding: 15,
    marginTop: 8,
  },

  /* FEATURES */

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
  },

  featureIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8D8C8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 4,
  },

  featureText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#77706B',
  },

  /* REVIEWS */

  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 13,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8D8C8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#4A2C20',
  },

  reviewName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 2,
  },

  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviewText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6E625B',
    fontStyle: 'italic',
  },

  /* CTA */

  cta: {
    marginHorizontal: 24,
    marginBottom: 40,
    padding: 28,
    borderRadius: 26,
    backgroundColor: '#4A2C20',
    alignItems: 'center',
  },

  ctaTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 9,
  },

  ctaText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#E8D8C8',
    textAlign: 'center',
    marginBottom: 20,
  },

  /* FOOTER */

  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  footerLogo: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 6,
  },

  footerText: {
    fontSize: 13,
    color: '#7B7069',
    marginBottom: 6,
  },

  copyright: {
    fontSize: 12,
    color: '#A09690',
    marginTop: 4,
  },

  /* FORM */

  bigPageTitle: {
    fontSize: 36,
    lineHeight: 43,
    fontWeight: '900',
    color: '#3A2118',
    marginBottom: 8,
  },

  pageSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#77706B',
    marginBottom: 25,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
  },

  inputLabel: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 9,
    marginTop: 4,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8D8C8',
    borderRadius: 17,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: '#3A2118',
    marginBottom: 18,
  },

  messageInput: {
    height: 125,
    paddingTop: 15,
  },

  categoryButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  categoryButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E8D8C8',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },

  categoryButtonActive: {
    backgroundColor: '#4A2C20',
    borderColor: '#4A2C20',
  },

  categoryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  categoryButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4A2C20',
  },

  categoryButtonTextActive: {
    color: '#FFFFFF',
  },

  /* TIP */

  tipBox: {
    marginTop: 25,
    backgroundColor: '#E8D8C8',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
  },

  tipTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#4A2C20',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },

  tipText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6E5142',
    textAlign: 'center',
  },

  /* MENU */

  menuSectionTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#3A2118',
    marginTop: 30,
    marginBottom: 16,
  },

  featuredCard: {
    width: 185,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    marginRight: 14,
  },

  featuredImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    marginBottom: 10,
    resizeMode: 'cover',
  },

  featuredName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 5,
  },

  featuredPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#9A6B4F',
    marginBottom: 10,
  },

  featuredButton: {
    backgroundColor: '#4A2C20',
    borderRadius: 20,
    paddingVertical: 9,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },

  featuredButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8D8C8',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginTop: 16,
    marginBottom: 12,
  },

  sectionHeaderText: {
    fontSize: 21,
    fontWeight: '900',
    color: '#4A2C20',
    marginLeft: 12,
  },

  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    marginBottom: 12,
  },

  menuImage: {
    width: 92,
    height: 92,
    borderRadius: 17,
    resizeMode: 'cover',
  },

  menuInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },

  menuItemName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 5,
  },

  menuDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#77706B',
    marginBottom: 6,
  },

  menuPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#9A6B4F',
  },

  menuAddButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#4A2C20',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuFooter: {
    backgroundColor: '#E8D8C8',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    marginTop: 25,
  },

  menuFooterTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4A2C20',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 7,
  },

  menuFooterText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6E5142',
    textAlign: 'center',
  },

  /* LOADING */

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  loadingTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4A2C20',
    marginTop: 18,
    marginBottom: 8,
  },

  loadingText: {
    fontSize: 14,
    color: '#77706B',
    textAlign: 'center',
  },

  /* TABS */

  tabBar: {
    height: 82,
    paddingBottom: 8,
    paddingTop: 7,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE6DF',
  },

  tabLabel: {
    fontSize: 12,
    fontWeight: '800',
  },

  tabBadge: {
    backgroundColor: '#9A6B4F',
    color: '#FFFFFF',
  },
});

export default App;