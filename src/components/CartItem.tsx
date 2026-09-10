import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';

import type {CartItem as CartItemType} from '../types';
import {QuantityControl} from './QuantityControl';

type CartItemProps = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartItem({item, onIncrease, onDecrease, onRemove}: CartItemProps) {
  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartImage} />

      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
        <QuantityControl quantity={item.quantity} onIncrease={onIncrease} onDecrease={onDecrease} />
      </View>

      <View style={styles.cartItemActions}>
        <Text style={styles.cartLineTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
        <Pressable accessibilityLabel={`Remove ${item.name}`} onPress={onRemove}>
          <MaterialIcons name="delete-outline" size={25} color="#9A6B4F" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
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
    height: 78,
  },
  cartLineTotal: {
    color: '#4A2C20',
    fontSize: 15,
    fontWeight: '900',
  },
});
