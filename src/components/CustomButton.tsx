import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';

type CustomButtonProps = {
  title?: string;
  onPress: () => void;
  icon?: string;
  children?: ReactNode;
  style?: ViewStyle;
};

export function CustomButton({
  title = 'Button',
  onPress,
  icon = 'arrow-forward',
  children,
  style,
}: CustomButtonProps) {
  return (
    <Pressable style={[styles.primaryButton, style]} onPress={onPress}>
      {children ?? (
        <>
          <Text style={styles.primaryButtonText}>{title}</Text>
          <MaterialIcons name={icon as any} size={19} color="#FFFFFF" style={styles.buttonIcon} />
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A2C20',
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 18,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
