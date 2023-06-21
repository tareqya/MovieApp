import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icons from "../../assets/styles/icons";

export interface ContainerProps {
  children?: React.ReactNode;
  safeAreaBackground?: string;
  scroll?: boolean;
  style?: View["props"]["style"];
  goBack?: VoidFunction;
}

const Container = (props: ContainerProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <SafeAreaView />
      {props.goBack && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backBtn}
          onPress={props.goBack}
        >
          <Icons.LeftArrowIcon color="white" />
        </TouchableOpacity>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[props.children]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <>{item}</>}
      />
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 20,
  },
  backBtn: {
    width: 30,
    height: 30,
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
