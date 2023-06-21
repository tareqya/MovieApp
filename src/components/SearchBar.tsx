import { StyleSheet, Animated } from "react-native";
import React from "react";
import { Searchbar, SearchbarProps } from "react-native-paper";
import { SIZES } from "../../assets/styles";

interface SearchBarViewProps extends SearchbarProps {
  onPress: VoidFunction;
}

const SearchBarView = (props: SearchBarViewProps) => {
  const animation = React.useRef(new Animated.Value(SIZES.width)).current;

  const hideAnimation = () => {
    Animated.timing(animation, {
      toValue: SIZES.width,
      duration: 250,
      useNativeDriver: false,
    }).start(() => props.onPress());
  };

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateX: animation }] }}>
      <Searchbar
        {...props}
        mode="bar"
        icon={"arrow-left"}
        onIconPress={() => hideAnimation()}
      />
    </Animated.View>
  );
};

export default SearchBarView;

const styles = StyleSheet.create({});
