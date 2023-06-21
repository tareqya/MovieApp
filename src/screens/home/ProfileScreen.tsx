import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Images } from "../../../assets/styles";
import { ButtonView, Stack, TextView } from "../../components";
import {
  FACULTY,
  STUDENT_EMAIL,
  STUDENT_NAME,
  USER_KEY,
} from "../../utils/Constant";
import { logout } from "../../utils/DatabaseManager";
import AuthContext from "../../contexts/AuthContext";
import { removeDataFromStorage } from "../../utils/LocalStorage";

const ProfileScreen = ({ navigation }: NativeStackHeaderProps) => {
  const { setUser } = React.useContext(AuthContext);
  const handleContinuePress = () => {
    navigation.navigate("HomeBottomNavigation");
  };

  // function to handle logout user
  const handleLogout = async () => {
    // logout user
    const res = await logout();
    if (!res) {
      alert("Failed to logout");
      return;
    }
    // remove user info from local storage
    await removeDataFromStorage(USER_KEY);
    setUser(undefined);
  };

  return (
    <View style={styles.container}>
      <Image
        source={Images.AVATAR}
        style={styles.profileImage}
        resizeMethod="resize"
        resizeMode="stretch"
      />

      <Stack direction="Vertical" gap={10} style={styles.infoWrapper}>
        <TextView variant="bodyLarge" style={{ fontWeight: "bold" }}>
          {STUDENT_NAME}
        </TextView>
        <TextView variant="bodyLarge">{STUDENT_EMAIL}</TextView>
        <TextView variant="bodyLarge">{FACULTY}</TextView>
      </Stack>
      <Stack gap={20}>
        <ButtonView buttonType="secondary" onPress={handleLogout}>
          Sign-Out
        </ButtonView>
        <ButtonView onPress={handleContinuePress}>Continue To Home</ButtonView>
      </Stack>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  infoWrapper: {
    marginVertical: 10,
    alignItems: "center",
  },
});
