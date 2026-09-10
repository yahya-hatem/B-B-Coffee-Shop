import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';

import type {Coffee} from '../types';

type CoffeeCardProps = {
  coffee: Coffee;
  onAdd: (coffee: Coffee) => void;
  compact?: boolean;
};

export function CoffeeCard({coffee, onAdd, compact = false}: CoffeeCardProps) {
  return (
    <View style={compact ? styles.popularCard : styles.menuCard}>
      <Image source={coffee.image} style={compact ? styles.popularImage : styles.menuImage} />

      <View style={compact ? undefined : styles.menuInfo}>
        <Text style={compact ? styles.cardTitle : styles.menuItemName}>{coffee.name}</Text>

        {!compact && <Text style={styles.menuDescription}>{coffee.description}</Text>}

        <Text style={compact ? styles.cardPrice : styles.menuPrice}>${coffee.price.toFixed(2)}</Text>
      </View>

      <Pressable
        style={compact ? styles.smallAddButton : styles.menuAddButton}
        onPress={() => onAdd(coffee)}>
        <MaterialIcons name="add" size={compact ? 25 : 29} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  menuInfo: {
    flex: 1,
    marginRight: 10,
  },
  menuImage: {
    width: 76,
    height: 76,
    borderRadius: 18,
    marginRight: 12,
  },
  menuItemName: {
    color: '#4A2C20',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  menuDescription: {
    color: '#7B5E4E',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  menuPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#9A6B4F',
  },
  menuAddButton: {
    backgroundColor: '#4A2C20',
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularCard: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginRight: 12,
    marginBottom: 6,
    alignItems: 'center',
  },
  popularImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#4A2C20',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardPrice: {
    color: '#9A6B4F',
    fontSize: 13,
    fontWeight: '800',
  },
  smallAddButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#4A2C20',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});
