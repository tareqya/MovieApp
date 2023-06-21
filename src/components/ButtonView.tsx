import { StyleSheet } from "react-native";
import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import { COLORS } from "../../assets/styles";

interface ButtonViewProps extends ButtonProps {
  buttonType?: "primary" | "secondary";
}

const ButtonView = (props: ButtonViewProps) => {
  return (
    <Button
      mode="contained"
      {...props}
      labelStyle={[
        {
          color: props.buttonType === "secondary" ? COLORS.black : COLORS.text,
        },
        styles.label,
        props.labelStyle,
      ]}
      style={[
        {
          backgroundColor:
            props.buttonType === "secondary" ? COLORS.text : COLORS.tomato,
        },
        styles.btn,
        props.style,
      ]}
    >
      {props.children}
    </Button>
  );
};

export default ButtonView;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    marginVertical: 10,
  },
  label: { fontSize: 20, fontWeight: "bold" },
});
