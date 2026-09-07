import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Coffee = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const coffees: Coffee[] = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Strong and rich espresso made from premium coffee beans.',
    price: 3.5,
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Rich espresso with creamy milk foam.',
    price: 4.5,
  },
  {
    id: 3,
    name: 'Caffè Latte',
    description: 'Smooth espresso blended with warm steamed milk.',
    price: 5.0,
  },
  {
    id: 4,
    name: 'Mocha',
    description: 'Delicious espresso combined with chocolate and milk.',
    price: 5.5,
  },
];

const reviews = [
  {
    id: 1,
    name: 'Sarah',
    rating: 5,
    text: 'Amazing coffee and a beautiful experience!',
  },
  {
    id: 2,
    name: 'Ahmed',
    rating: 5,
    text: 'The cappuccino is one of the best I have ever tried.',
  },
  {
    id: 3,
    name: 'Maya',
    rating: 4,
    text: 'Great taste, friendly service and lovely atmosphere.',
  },
];

function App() {
  const [cart, setCart] = useState<Coffee[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const addToCart = (coffee: Coffee) => {
    setCart([...cart, coffee]);

    Alert.alert(
      'Added to Cart',
      `${coffee.name} has been added to your cart.`,
    );
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const cartTotal = cart.reduce((total, coffee) => {
    return total + coffee.price;
  }, 0);

  const submitFeedback = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    Alert.alert(
      'Thank You!',
      'Your feedback has been submitted successfully.',
    );

    setName('');
    setEmail('');
    setMessage('');
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
          contentContainerStyle={styles.scrollContent}
        >

          {/* ================= HEADER ================= */}

          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>B&B</Text>
              <Text style={styles.logoSubtitle}>COFFEE SHOP</Text>
            </View>

            <View style={styles.cartBadgeContainer}>
              <Text style={styles.cartIcon}>🛒</Text>

              {cart.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cart.length}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* ================= HERO ================= */}

          <View style={styles.hero}>

            <View style={styles.heroTextContainer}>
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
                  Alert.alert(
                    'B&B Coffee',
                    'Scroll down to explore our menu!',
                  )
                }
              >
                <Text style={styles.primaryButtonText}>
                  Explore Menu
                </Text>
              </Pressable>
            </View>

            <Image
              source={require('./hero.png')}
              style={styles.heroImage}
            />

          </View>

          {/* ================= MENU ================= */}

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Our Coffee Menu
            </Text>

            <Text style={styles.sectionSubtitle}>
              Discover your favorite cup
            </Text>

            <View style={styles.cardsContainer}>

              {coffees.map(coffee => (
                <View
                  key={coffee.id}
                  style={styles.coffeeCard}
                >

                  <View style={styles.coffeeImage}>
                    <Text style={styles.coffeeEmoji}>
                      ☕
                    </Text>
                  </View>

                  <Text style={styles.cardTitle}>
                    {coffee.name}
                  </Text>

                  <Text style={styles.cardDescription}>
                    {coffee.description}
                  </Text>

                  <View style={styles.cardBottom}>

                    <Text style={styles.price}>
                      ${coffee.price.toFixed(2)}
                    </Text>

                    <Pressable
                      style={styles.addButton}
                      onPress={() => addToCart(coffee)}
                    >
                      <Text style={styles.addButtonText}>
                        +
                      </Text>
                    </Pressable>

                  </View>

                </View>
              ))}

            </View>
          </View>

          {/* ================= CART ================= */}

          <View style={styles.section}>

            <View style={styles.titleRow}>
              <Text style={styles.sectionTitle}>
                Shopping Cart
              </Text>

              <Text style={styles.cartCount}>
                {cart.length} item(s)
              </Text>
            </View>

            {cart.length === 0 ? (
              <View style={styles.emptyCart}>
                <Text style={styles.emptyCartIcon}>
                  🛒
                </Text>

                <Text style={styles.emptyCartTitle}>
                  Your cart is empty
                </Text>

                <Text style={styles.emptyCartText}>
                  Add your favorite coffee from the menu.
                </Text>
              </View>
            ) : (
              <View style={styles.cartBox}>

                {cart.map((coffee, index) => (
                  <View
                    key={`${coffee.id}-${index}`}
                    style={styles.cartItem}
                  >

                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemName}>
                        {coffee.name}
                      </Text>

                      <Text style={styles.cartItemPrice}>
                        ${coffee.price.toFixed(2)}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => removeFromCart(index)}
                    >
                      <Text style={styles.removeText}>
                        Remove
                      </Text>
                    </Pressable>

                  </View>
                ))}

                <View style={styles.totalRow}>

                  <Text style={styles.totalText}>
                    Total
                  </Text>

                  <Text style={styles.totalPrice}>
                    ${cartTotal.toFixed(2)}
                  </Text>

                </View>

                <Pressable
                  style={styles.checkoutButton}
                  onPress={() =>
                    Alert.alert(
                      'Order',
                      'Your order has been placed successfully!',
                    )
                  }
                >
                  <Text style={styles.checkoutText}>
                    Checkout
                  </Text>
                </Pressable>

              </View>
            )}
          </View>

          {/* ================= ABOUT ================= */}

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

              <Text style={styles.founderIcon}>
                👨‍🍳
              </Text>

              <View style={styles.founderContent}>
                <Text style={styles.founderTitle}>
                  Our Founder
                </Text>

                <Text style={styles.founderText}>
                  Building better coffee moments, one cup
                  at a time.
                </Text>
              </View>

            </View>

          </View>

          {/* ================= WHY B&B ================= */}

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Why B&B Coffee?
            </Text>

            <View style={styles.feature}>

              <Text style={styles.featureIcon}>
                🌱
              </Text>

              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  Quality Beans
                </Text>

                <Text style={styles.featureText}>
                  Carefully selected coffee beans for a rich
                  and delicious taste.
                </Text>
              </View>

            </View>

            <View style={styles.feature}>

              <Text style={styles.featureIcon}>
                ❤️
              </Text>

              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  Made With Love
                </Text>

                <Text style={styles.featureText}>
                  Every cup is prepared with care and passion.
                </Text>
              </View>

            </View>

            <View style={styles.feature}>

              <Text style={styles.featureIcon}>
                ⚡
              </Text>

              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  Fresh Every Day
                </Text>

                <Text style={styles.featureText}>
                  Freshly prepared coffee whenever you need it.
                </Text>
              </View>

            </View>

          </View>

          {/* ================= REVIEWS ================= */}

          <View style={styles.section}>

            <Text style={styles.sectionTitle}>
              Customer Reviews
            </Text>

            <Text style={styles.sectionSubtitle}>
              What our customers say
            </Text>

            {reviews.map(review => (
              <View
                key={review.id}
                style={styles.reviewCard}
              >

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

                    <Text style={styles.stars}>
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </Text>
                  </View>

                </View>

                <Text style={styles.reviewText}>
                  "{review.text}"
                </Text>

              </View>
            ))}

          </View>

          {/* ================= FEEDBACK ================= */}

          <View style={styles.feedbackSection}>

            <Text style={styles.smallTitle}>
              WE VALUE YOUR OPINION
            </Text>

            <Text style={styles.sectionTitle}>
              Share Your Feedback
            </Text>

            <Text style={styles.sectionSubtitle}>
              Tell us about your B&B Coffee experience.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="#A09690"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor="#A09690"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={[
                styles.input,
                styles.messageInput,
              ]}
              placeholder="Your Message"
              placeholderTextColor="#A09690"
              multiline
              textAlignVertical="top"
              value={message}
              onChangeText={setMessage}
            />

            <Pressable
              style={styles.primaryButtonFull}
              onPress={submitFeedback}
            >
              <Text style={styles.primaryButtonText}>
                Submit Feedback
              </Text>
            </Pressable>

          </View>

          {/* ================= CTA ================= */}

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
                Alert.alert(
                  'B&B Coffee',
                  'Thank you for choosing B&B Coffee!',
                )
              }
            >
              <Text style={styles.secondaryButtonText}>
                Order Now
              </Text>
            </Pressable>

          </View>

          {/* ================= FOOTER ================= */}

          <View style={styles.footer}>

            <Text style={styles.footerLogo}>
              B&B Coffee
            </Text>

            <Text style={styles.footerText}>
              Fresh Coffee • Better Moments
            </Text>

            <Text style={styles.footerText}>
              ☕ Quality Coffee
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

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#F8F3ED',
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* ================= HEADER ================= */

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
    fontWeight: '700',
    letterSpacing: 2,
    color: '#9A6B4F',
  },

  cartBadgeContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8D8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartIcon: {
    fontSize: 23,
  },

  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9A6B4F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  /* ================= HERO ================= */

  hero: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 35,
  },

  heroTextContainer: {
    marginBottom: 25,
  },

  smallTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#9A6B4F',
    marginBottom: 9,
  },

  heroTitle: {
    fontSize: 44,
    fontWeight: '900',
    color: '#3A2118',
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 27,
    lineHeight: 36,
    fontWeight: '700',
    color: '#7A4E38',
    marginBottom: 17,
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
    color: '#6E625B',
    marginBottom: 23,
  },

  heroImage: {
    width: '100%',
    height: 240,
    borderRadius: 28,
    resizeMode: 'cover',
  },

  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#4A2C20',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 25,
  },

  primaryButtonFull: {
    backgroundColor: '#4A2C20',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  /* ================= SECTION ================= */

  section: {
    paddingHorizontal: 24,
    marginBottom: 42,
  },

  sectionTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#3A2118',
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 15,
    color: '#7B7069',
    marginBottom: 20,
  },

  /* ================= COFFEE CARDS ================= */

  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  coffeeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },

  coffeeImage: {
    height: 100,
    borderRadius: 15,
    backgroundColor: '#E8D8C8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  coffeeEmoji: {
    fontSize: 50,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 7,
  },

  cardDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#77706B',
    marginBottom: 12,
  },

  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 17,
    fontWeight: '900',
    color: '#9A6B4F',
  },

  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#4A2C20',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 24,
  },

  /* ================= CART ================= */

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  cartCount: {
    fontSize: 13,
    color: '#9A6B4F',
    fontWeight: '700',
  },

  emptyCart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },

  emptyCartIcon: {
    fontSize: 45,
    marginBottom: 10,
  },

  emptyCartTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4A2C20',
    marginBottom: 5,
  },

  emptyCartText: {
    fontSize: 13,
    color: '#77706B',
    textAlign: 'center',
  },

  cartBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
  },

  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE6DF',
  },

  cartItemInfo: {
    flex: 1,
  },

  cartItemName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4A2C20',
    marginBottom: 4,
  },

  cartItemPrice: {
    fontSize: 14,
    color: '#9A6B4F',
  },

  removeText: {
    color: '#A05245',
    fontSize: 13,
    fontWeight: '700',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingBottom: 15,
  },

  totalText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4A2C20',
  },

  totalPrice: {
    fontSize: 19,
    fontWeight: '900',
    color: '#9A6B4F',
  },

  checkoutButton: {
    backgroundColor: '#4A2C20',
    paddingVertical: 14,
    borderRadius: 23,
    alignItems: 'center',
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  /* ================= ABOUT ================= */

  aboutSection: {
    marginHorizontal: 24,
    marginBottom: 45,
    backgroundColor: '#E8D8C8',
    borderRadius: 28,
    padding: 25,
  },

  aboutTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    color: '#3A2118',
    marginBottom: 15,
  },

  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6E5142',
    marginBottom: 12,
  },

  founderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F3ED',
    borderRadius: 18,
    padding: 15,
    marginTop: 10,
  },

  founderIcon: {
    fontSize: 38,
    marginRight: 14,
  },

  founderContent: {
    flex: 1,
  },

  founderTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4A2C20',
    marginBottom: 3,
  },

  founderText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#77706B',
  },

  /* ================= FEATURES ================= */

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
  },

  featureIcon: {
    fontSize: 30,
    marginRight: 15,
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

  /* ================= REVIEWS ================= */

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
    fontWeight: '800',
    color: '#4A2C20',
    marginBottom: 2,
  },

  stars: {
    fontSize: 13,
    color: '#9A6B4F',
  },

  reviewText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6E625B',
    fontStyle: 'italic',
  },

  /* ================= FEEDBACK ================= */

  feedbackSection: {
    marginHorizontal: 24,
    marginBottom: 45,
    backgroundColor: '#E8D8C8',
    borderRadius: 28,
    padding: 24,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#3A2118',
    marginBottom: 12,
  },

  messageInput: {
    height: 120,
  },

  /* ================= CTA ================= */

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
  },

  secondaryButtonText: {
    color: '#4A2C20',
    fontSize: 16,
    fontWeight: '800',
  },

  /* ================= FOOTER ================= */

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

});

export default App;