import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';

type QuantityControlProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function QuantityControl({quantity, onIncrease, onDecrease}: QuantityControlProps) {
  return (
    <View style={styles.quantityRow}>
      <Pressable accessibilityLabel="Decrease quantity" style={styles.quantityButton} onPress={onDecrease}>
        <MaterialIcons name="remove" size={18} color="#FFFFFF" />
      </Pressable>

      <Text style={styles.quantityText}>{quantity}</Text>

      <Pressable accessibilityLabel="Increase quantity" style={styles.quantityButton} onPress={onIncrease}>
        <MaterialIcons name="add" size={18} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: '#4A2C20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    minWidth: 26,
    textAlign: 'center',
    color: '#4A2C20',
    fontSize: 15,
    fontWeight: '800',
    marginHorizontal: 10,
  },
});
