import { View } from "react-native";
import React from "react";

type Direction = "Horizontal" | "Vertical";
interface StackProps {
  direction?: Direction;
  gap?: number;
  style?: View["props"]["style"];
  children?: View["props"]["children"];
}

const Stack = ({
  direction = "Vertical",
  gap = 0,
  style,
  children,
}: StackProps) => {
  return (
    <View
      style={[
        style,
        {
          gap: gap,
          flexDirection: direction === "Horizontal" ? "row" : "column",
        },
      ]}
    >
      {children}
    </View>
  );
};

export default Stack;
