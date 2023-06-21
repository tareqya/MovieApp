import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import React from "react";
import { COLORS } from "../../assets/styles";

const EditText = (props: TextInputProps) => {
  return (
    <TextInput
      mode="outlined"
      activeOutlineColor={COLORS.tomato}
      textColor={COLORS.text}
      placeholderTextColor={COLORS.lightGray}
      {...props}
      style={[styles.defualtStyle, props.style]}
    />
  );
};

export default EditText;

const styles = StyleSheet.create({
  defualtStyle: {
    backgroundColor: "rgb(45,45,45)",
  },
});
