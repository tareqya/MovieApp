import { StyleSheet } from "react-native";
import { Text, TextProps } from "react-native-paper";
import React from "react";
import { COLORS } from "../../assets/styles";

const TextView = (props: TextProps<Text>) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

export default TextView;

const styles = StyleSheet.create({
  text: {
    color: COLORS.text,
  },
});
