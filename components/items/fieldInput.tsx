import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type FieldInputProps = {
  fieldName: string;
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => string | null;
  sercurity?: boolean;
  style?: React.CSSProperties;
};
export default function FieldInput({
  fieldName,
  value,
  placeholder,
  onChangeText,
  onBlur,
  sercurity,
  style
}: FieldInputProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBlur = () => {
    if (onBlur) {
      const error = onBlur();
      setErrorMessage(error);
    }
  };
  return (
    <View style={{ flex: 1, margin: 0, marginBottom: 8 }}>
      <Text style={styles.fieldname}>{fieldName}</Text>
      <TextInput
        style={styles.input||style}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={handleBlur}
        secureTextEntry={sercurity ? sercurity : false}
        underlineColorAndroid={"transparent"}
      />
      {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  fieldname: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 36,
    fontSize: 16,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});
