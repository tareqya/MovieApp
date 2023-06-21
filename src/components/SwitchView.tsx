import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../../assets/styles";

export type LabelsType = { value: string; label: string };

interface SwitchProps {
  labels: LabelsType[];
  onChange: (value: string) => void;
  style?: View["props"]["style"];
  labelStyle?: Text["props"]["style"];
  activeLabelColor?: string;
  activeLabelWrapperColor?: string;
  inactiveLabelColor?: string;
  initValue?: string;
}

const SwitchView = ({
  labels,
  onChange,
  style,
  labelStyle,
  activeLabelWrapperColor = COLORS.primary,
  activeLabelColor = COLORS.white,
  inactiveLabelColor = "#000",
  initValue,
}: SwitchProps) => {
  const [select, setSelect] = React.useState(labels[0].value);

  React.useEffect(() => {
    if (initValue) setSelect(initValue);
  }, [initValue]);

  return (
    <View style={[styles.container, style]}>
      {labels.map((item) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={item.value}
          style={[
            styles.labelsWrapper,
            {
              backgroundColor:
                select == item.value ? activeLabelWrapperColor : undefined,
            },
          ]}
          onPress={() => {
            setSelect(item.value);
            onChange(item.value);
          }}
        >
          <Text
            style={[
              FONTS.h3,
              labelStyle,
              {
                color:
                  select == item.value ? activeLabelColor : inactiveLabelColor,
              },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SwitchView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 10,
    height: 60,
  },
  labelsWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    height: "100%",
    borderRadius: 10,
  },
});
