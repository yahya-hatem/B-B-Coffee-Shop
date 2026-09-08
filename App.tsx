import React, {useEffect, useMemo, useState} from 'react';

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
  TextInput,
  View,
} from 'react-native';

import {MaterialIcons} from '@react-native-vector-icons/material-icons';

import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

type Category =
  | 'Hot Coffee'
  | 'Cold Coffee'
  | 'Special Coffee';

type Coffee = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: any;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

const Tab = createBottomTabNavigator();

/* =====================================================
   LOCAL IMAGES
===================================================== */

const IMAGES = {
  hero: require('./assets/hero.png'),

  espresso: require('./assets/espresso.png'),
  cappuccino: require('./assets/cappuccino.png'),
  latte: require('./assets/latte.png'),
  americano: require('./assets/americano.png'),

  icedLatte: require('./assets/iced-latte.png'),
  icedMocha: require('./assets/iced-mocha.png'),
  coldBrew: require('./assets/cold-brew.png'),

  mocha: require('./assets/mocha.png'),
};

/* =====================================================
   INITIAL COFFEE DATA
===================================================== */

const INITIAL_COFFEES: Coffee[] = [
  {
    id: '1',
    name: 'Espresso',
    description:
      'Strong and rich espresso made from premium coffee beans.',
    price: 3.5,
    category: 'Hot Coffee',
    image: IMAGES.espresso,
  },

  {
    id: '2',
    name: 'Cappuccino',
    description:
      'Rich espresso with creamy milk foam.',
    price: 4.5,
    category: 'Hot Coffee',
    image: IMAGES.cappuccino,
  },

  {
    id: '3',
    name: 'Caffè Latte',
    description:
      'Smooth espresso blended with warm steamed milk.',
    price: 5,
    category: 'Hot Coffee',
    image: IMAGES.latte,
  },

  {
    id: '4',
    name: 'Americano',
    description:
      'Classic espresso with hot water for a smooth taste.',
    price: 3.8,
    category: 'Hot Coffee',
    image: IMAGES.americano,
  },

  {
    id: '5',
    name: 'Iced Latte',
    description:
      'Cold espresso with milk and refreshing ice.',
    price: 5.2,
    category: 'Cold Coffee',
    image: IMAGES.icedLatte,
  },

  {
    id: '6',
    name: 'Iced Mocha',
    description:
      'Chocolate, espresso and milk served over ice.',
    price: 5.8,
    category: 'Cold Coffee',
    image: IMAGES.icedMocha,
  },

  {
    id: '7',
    name: 'Cold Brew',
    description:
      'Slow brewed coffee with a smooth and refreshing taste.',
    price: 5,
    category: 'Cold Coffee',
    image: IMAGES.coldBrew,
  },

  {
    id: '8',
    name: 'Mocha',
    description:
      'Delicious espresso combined with chocolate and milk.',
    price: 5.5,
    category: 'Special Coffee',
    image: IMAGES.mocha,
  },
];

/* =====================================================
   REVIEWS
===================================================== */

const REVIEWS: Review[] = [
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
    text:
      'The cappuccino is one of the best I have ever tried.',
  },

  {
    id: '3',
    name: 'Maya',
    rating: 4,
    text:
      'Great taste, friendly service and lovely atmosphere.',
  },
];

/* =====================================================
   HOME SCREEN
===================================================== */

function HomeScreen({
  coffees,
  cart,
  addToCart,
}: {
  coffees: Coffee[];
  cart: Coffee[];
  addToCart: (coffee: Coffee) => void;
}) {
  const navigation = useNavigation<any>();

  const popularCoffees = coffees.slice(0, 4);

  const cartTotal = cart.reduce(
    (total, coffee) => total + coffee.price,
    0,
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8F3ED"
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          {/* HEADER */}

          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>B&B</Text>

              <Text style={styles.logoSubtitle}>
                COFFEE SHOP
              </Text>
            </View>

            <Pressable
              style={styles.headerCart}
              onPress={() =>
                Alert.alert(
                  'Shopping Cart',
                  `${cart.length} item(s) • $${cartTotal.toFixed(
                    2,
                  )}`,
                )
              }>

              <MaterialIcons
                name="shopping-cart"
                size={25}
                color="#4A2C20"
              />

              {cart.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cart.length}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* HERO */}

          <View style={styles.hero}>
            <Text style={styles.smallTitle}>
              WELCOME TO
            </Text>

            <Text style={styles.heroTitle}>
              B&B Coffee
            </Text>

            <Text style={styles.heroSubtitle}>
              Fresh Coffee.{'\n'}
              Better Moments.
            </Text>

            <Text style={styles.description}>
              Discover delicious coffee made with carefully
              selected beans and served with passion.
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() =>
                navigation.navigate('Menu')
              }>

              <Text style={styles.primaryButtonText}>
                Explore Menu
              </Text>

              <MaterialIcons
                name="arrow-forward"
                size={19}
                color="#FFFFFF"
                style={styles.buttonIcon}
              />
            </Pressable>
          </View>

          {/* HERO IMAGE */}

          <View style={styles.heroImageContainer}>
            <Image
              source={IMAGES.hero}
              style={styles.heroImage}
            />
          </View>

          {/* POPULAR COFFEE */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Popular Coffee
            </Text>

            <Text style={styles.sectionSubtitle}>
              Our customers' favorite choices
            </Text>

            {/* map() requirement */}

            <View style={styles.popularGrid}>
              {popularCoffees.map(coffee => (
                <View
                  key={coffee.id}
                  style={styles.popularCard}>

                  <Image
                    source={coffee.image}
                    style={styles.popularImage}
                  />

                  <Text style={styles.cardTitle}>
                    {coffee.name}
                  </Text>

                  <Text style={styles.cardPrice}>
                    ${coffee.price.toFixed(2)}
                  </Text>

                  <Pressable
                    style={styles.smallAddButton}
                    onPress={() =>
                      addToCart(coffee)
                    }>

                    <MaterialIcons
                      name="add"
                      size={25}
                      color="#FFFFFF"
                    />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>

          {/* ABOUT */}

          <View style={styles.aboutSection}>
            <Text style={styles.smallTitle}>
              OUR STORY
            </Text>

            <Text style={styles.aboutTitle}>
              More Than Just Coffee
            </Text>

            <Text style={styles.aboutText}>
              At B&B Coffee, we believe that coffee is not
              just a drink. It is a moment to relax, connect
              and enjoy.
            </Text>

            <Text style={styles.aboutText}>
              We carefully select quality coffee beans and
              prepare every cup with passion to give you the
              perfect coffee experience.
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
                  Building better coffee moments, one cup
                  at a time.
                </Text>
              </View>
            </View>
          </View>

          {/* WHY B&B */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Why B&B Coffee?
            </Text>

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

                <View style={styles.featureIconBox}>
                  <MaterialIcons
                    name={feature.icon as any}
                    size={27}
                    color="#4A2C20"
                  />
                </View>

                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>
                    {feature.title}
                  </Text>

                  <Text style={styles.featureText}>
                    {feature.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* REVIEWS */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Customer Reviews
            </Text>

            <Text style={styles.sectionSubtitle}>
              What our customers say
            </Text>

            {REVIEWS.map(review => (
              <View
                key={review.id}
                style={styles.reviewCard}>

                <View style={styles.reviewHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {review.name.charAt(0)}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.reviewName}>
                      {review.name}
                    </Text>

                    <View style={styles.starRow}>
                      {[1, 2, 3, 4, 5].map(star => (
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
                      ))}
                    </View>
                  </View>
                </View>

                <Text style={styles.reviewText}>
                  "{review.text}"
                </Text>
              </View>
            ))}
          </View>

          {/* CTA */}

          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>
              Ready for Your Next Coffee?
            </Text>

            <Text style={styles.ctaText}>
              Make every moment better with B&B Coffee.
            </Text>

            <Pressable
              style={styles.secondaryButton}
              onPress={() =>
                navigation.navigate('Menu')
              }>

              <Text style={styles.secondaryButtonText}>
                Order Now
              </Text>

              <MaterialIcons
                name="shopping-cart"
                size={19}
                color="#4A2C20"
              />
            </Pressable>
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
        barStyle="dark-content"
        backgroundColor="#F8F3ED"
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formScroll}>

          <Text style={styles.smallTitle}>
            B&B COFFEE
          </Text>

          <Text style={styles.bigPageTitle}>
            Add New Coffee
          </Text>

          <Text style={styles.pageSubtitle}>
            Create a new coffee and add it to your menu.
          </Text>

          <View style={styles.formCard}>

            {/* NAME */}

            <Text style={styles.inputLabel}>
              Coffee Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Example: Caramel Latte"
              placeholderTextColor="#A09690"
              value={name}
              onChangeText={setName}
            />

            {/* PRICE */}

            <Text style={styles.inputLabel}>
              Price
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Example: 5.50"
              placeholderTextColor="#A09690"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />

            {/* DESCRIPTION */}

            <Text style={styles.inputLabel}>
              Description
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.messageInput,
              ]}
              placeholder="Describe your coffee"
              placeholderTextColor="#A09690"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />

            {/* CATEGORY */}

            <Text style={styles.inputLabel}>
              Category
            </Text>

            <View style={styles.categoryButtons}>
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

            {/* SUBMIT */}

            <Pressable
              style={styles.submitButton}
              onPress={submitCoffee}>

              <MaterialIcons
                name="add-circle-outline"
                size={22}
                color="#FFFFFF"
              />

              <Text style={styles.submitButtonText}>
                Add Coffee
              </Text>
            </Pressable>
          </View>

          {/* TIP */}

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
  addToCart,
}: {
  coffees: Coffee[];
  addToCart: (coffee: Coffee) => void;
}) {
  /* =====================================================
     SECTION LIST DATA
  ===================================================== */

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

  /* =====================================================
     FLATLIST DATA
  ===================================================== */

  const featured = coffees.slice(0, 5);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8F3ED"
      />

      <SafeAreaView style={styles.safeArea}>

        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuContent}

          /* =================================================
             SECTION HEADER
          ================================================= */

          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>

              <MaterialIcons
                name={
                  section.title === 'Hot Coffee'
                    ? 'local-cafe'
                    : section.title === 'Cold Coffee'
                    ? 'ac-unit'
                    : 'star'
                }
                size={24}
                color="#4A2C20"
              />

              <Text
                style={styles.sectionHeaderText}>
                {section.title}
              </Text>
            </View>
          )}

          /* =================================================
             SECTION ITEM
          ================================================= */

          renderItem={({item}) => (
            <View style={styles.menuCard}>

              <Image
                source={item.image}
                style={styles.menuImage}
              />

              <View style={styles.menuInfo}>

                <Text
                  style={styles.menuItemName}>
                  {item.name}
                </Text>

                <Text
                  style={styles.menuDescription}>
                  {item.description}
                </Text>

                <Text style={styles.menuPrice}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>

              <Pressable
                style={styles.menuAddButton}
                onPress={() =>
                  addToCart(item)
                }>

                <MaterialIcons
                  name="add"
                  size={29}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>
          )}

          /* =================================================
             HEADER
          ================================================= */

          ListHeaderComponent={
            <View>

              <Text style={styles.smallTitle}>
                B&B MENU
              </Text>

              <Text
                style={styles.bigPageTitle}>
                Our Coffee Collection
              </Text>

              <Text
                style={styles.pageSubtitle}>
                Explore our favorite coffee choices.
              </Text>

              <Text
                style={styles.menuSectionTitle}>
                Featured Coffee
              </Text>

              {/* =================================================
                 FLATLIST
              ================================================= */}

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
                      style={styles.featuredImage}
                    />

                    <Text
                      style={styles.featuredName}>
                      {item.name}
                    </Text>

                    <Text
                      style={styles.featuredPrice}>
                      ${item.price.toFixed(2)}
                    </Text>

                    <Pressable
                      style={
                        styles.featuredButton
                      }
                      onPress={() =>
                        addToCart(item)
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
                style={styles.menuSectionTitle}>
                Coffee Categories
              </Text>
            </View>
          }

          /* =================================================
             FOOTER
          ================================================= */

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

  const [cart, setCart] =
    useState<Coffee[]>([]);

  /* =====================================================
     useEffect
  ===================================================== */

  useEffect(() => {
    const loadCoffeeMenu = () => {
      setCoffees(INITIAL_COFFEES);
    };

    loadCoffeeMenu();
  }, []);

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const addToCart = (coffee: Coffee) => {
    setCart(previousCart => [
      ...previousCart,
      coffee,
    ]);

    Alert.alert(
      'Added to Cart',
      `${coffee.name} has been added to your cart.`,
    );
  };

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

      /*
       * Local project image.
       *
       * New coffees use the local mocha image.
       * You can later add a separate upload/image
       * feature if required.
       */
      image: IMAGES.mocha,
    };

    setCoffees(previousCoffees => [
      ...previousCoffees,
      newCoffee,
    ]);
  };

  return (
    <NavigationContainer>

      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: '#4A2C20',

          tabBarInactiveTintColor: '#A09690',

          tabBarStyle: styles.tabBar,

          tabBarLabelStyle: styles.tabLabel,

          tabBarHideOnKeyboard: true,
        }}>

        {/* =================================================
           HOME TAB
        ================================================= */}

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
              cart={cart}
              addToCart={addToCart}
            />
          )}
        </Tab.Screen>

        {/* =================================================
           ADD COFFEE TAB
        ================================================= */}

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

        {/* =================================================
           MENU TAB
        ================================================= */}

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
              addToCart={addToCart}
            />
          )}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
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

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 15,
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

  /* =====================================================
     HERO
  ===================================================== */

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

  /* =====================================================
     GENERAL SECTIONS
  ===================================================== */

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

  /* =====================================================
     POPULAR
  ===================================================== */

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

  /* =====================================================
     ABOUT
  ===================================================== */

  aboutSection: {
    marginHorizontal: 24,
    marginBottom: 45,
    backgroundColor: '#E8D8C8',
    borderRadius: 28,
    padding: 25,
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

  /* =====================================================
     FEATURES
  ===================================================== */

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

  /* =====================================================
     REVIEWS
  ===================================================== */

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

  /* =====================================================
     CTA
  ===================================================== */

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

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 27,
    paddingVertical: 13,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  secondaryButtonText: {
    color: '#4A2C20',
    fontSize: 16,
    fontWeight: '900',
  },

  /* =====================================================
     FOOTER
  ===================================================== */

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

  /* =====================================================
     FORM
  ===================================================== */

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

  submitButton: {
    backgroundColor: '#4A2C20',
    borderRadius: 27,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },

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

  /* =====================================================
     MENU
  ===================================================== */

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

  /* =====================================================
     BOTTOM TABS
  ===================================================== */

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
});

export default App;