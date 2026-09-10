import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type CustomInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'decimal-pad' | 'numeric' | 'email-address';
  multiline?: boolean;
};

export function CustomInput({
  label,
  placeholder = 'Enter value',
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
}: CustomInputProps) {
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.messageInput]}
        placeholder={placeholder}
        placeholderTextColor="#A09690"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: '#4A2C20',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 18,
  },
  input: {
    backgroundColor: '#F7F1EC',
    borderWidth: 1,
    borderColor: '#E2D7CE',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#4A2C20',
    fontSize: 15,
  },
  messageInput: {
    minHeight: 110,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
});
